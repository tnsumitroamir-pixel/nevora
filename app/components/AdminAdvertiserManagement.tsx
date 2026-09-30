import { actionErrorMessage, useActionMutation, useActionQuery } from "@agent-native/core/client/hooks";
import { useMemo, useState } from "react";

import "./admin.css";

const tabs = [
  ["accounts", "Advertiser"],
  ["applications", "Applications"],
  ["campaigns", "Campaign Activity"],
  ["billing", "Billing"],
  ["restrictions", "Restrictions"],
  ["audit", "Audit Log"],
] as const;

export type AdminAdvertiserTab = (typeof tabs)[number][0];

function Rupiah({ value }: { value: number }) {
  return <>Rp {new Intl.NumberFormat("id-ID").format(value)}</>;
}

function Status({ value }: { value: string }) {
  return <span className={`admin-status ${value === "Active" || value === "active" ? "" : "is-review"}`}>{value}</span>;
}

export function AdminAdvertiserManagement({ onBack, initialTab = "accounts" }: { onBack: () => void; initialTab?: AdminAdvertiserTab }) {
  const [tab, setTab] = useState<AdminAdvertiserTab>(initialTab);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const query = useActionQuery("get-admin-advertiser-operations", { days: "7" });
  const manage = useActionMutation("manage-advertiser-operation");
  const migrate = useActionMutation("apply-publisher-migrations");
  const data = query.data;
  const needle = search.trim().toLocaleLowerCase("id-ID");
  const advertisers = useMemo(
    () => (data?.advertisers ?? []).filter((advertiser) =>
      `${advertiser.businessName} ${advertiser.fullName} ${advertiser.email}`
        .toLocaleLowerCase("id-ID")
        .includes(needle),
    ),
    [data?.advertisers, needle],
  );
  const campaigns = useMemo(
    () => (data?.campaigns ?? []).filter((campaign) =>
      `${campaign.name} ${campaign.businessName ?? ""} ${campaign.ownerEmail} ${campaign.productName ?? ""}`
        .toLocaleLowerCase("id-ID")
        .includes(needle),
    ),
    [data?.campaigns, needle],
  );

  const runMutation = async (input: Parameters<typeof manage.mutateAsync>[0]) => {
    setNotice("");
    try {
      await manage.mutateAsync(input);
      await query.refetch();
      setNotice("Perubahan tersimpan dan tercatat di audit log.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Perubahan belum dapat disimpan.");
    }
  };

  const applyMigrations = async () => {
    setNotice("");
    try {
      await migrate.mutateAsync({});
      await query.refetch();
      setNotice("Pembaruan database berhasil diterapkan.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Pembaruan database belum dapat diterapkan.");
    }
  };

  return (
    <div className="admin-catalog-page">
      <div className="admin-panel-heading admin-catalog-heading">
        <div>
          <h1>Kontrol Advertiser</h1>
          <p>Advertiser memasok produk, offer, dan campaign; status publisher melihat campaign setelah admin menyetujui offer berkomisi.</p>
        </div>
        <button className="admin-catalog-back" onClick={onBack} type="button">Dashboard</button>
      </div>

      <div className="publisher-admin-tabs" role="tablist" aria-label="Data advertiser">
        {tabs.map(([id, label]) => (
          <button
            aria-selected={tab === id}
            className={tab === id ? "is-active" : ""}
            key={id}
            onClick={() => setTab(id)}
            role="tab"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {notice && <p className="admin-catalog-notice" role="status">{notice}</p>}
      {query.isLoading ? (
        <section className="admin-panel"><p>Memuat data advertiser dari database…</p></section>
      ) : query.error ? (
        <section className="admin-panel">
          <p className="admin-catalog-error">{actionErrorMessage(query.error) ?? "Data advertiser belum dapat dimuat. Periksa koneksi database."}</p>
          <button className="admin-table-action" disabled={migrate.isPending} onClick={() => void applyMigrations()} type="button">{migrate.isPending ? "Memperbarui skema…" : "Terapkan pembaruan database"}</button>
          <button className="admin-catalog-back" onClick={() => void query.refetch()} type="button">Coba lagi</button>
        </section>
      ) : data ? (
        <>
          <section className="admin-metric-grid" aria-label="Ringkasan advertiser">
            <article className="admin-metric"><span className="admin-metric-label">Advertiser</span><strong>{data.metrics.advertisers}</strong></article>
            <article className="admin-metric"><span className="admin-metric-label">Campaign</span><strong>{data.metrics.campaigns}</strong></article>
            <article className="admin-metric"><span className="admin-metric-label">Offer</span><strong>{data.metrics.offers}</strong></article>
            <article className="admin-metric"><span className="admin-metric-label">Budget campaign</span><strong><Rupiah value={data.metrics.campaignBudgetIdr} /></strong></article>
          </section>

          {tab !== "applications" && tab !== "audit" && (
            <label className="admin-search admin-advertiser-search">
              <input aria-label="Cari advertiser atau campaign" onChange={(event) => setSearch(event.target.value)} placeholder="Cari advertiser atau campaign…" value={search} />
            </label>
          )}

          {tab === "accounts" && (
            <section className="admin-panel publisher-admin-panel">
              <h2>Advertiser terdaftar ({advertisers.length})</h2>
              {advertisers.length === 0 ? <p>Tidak ada advertiser yang cocok.</p> : advertisers.map((advertiser) => (
                <article className="publisher-admin-row" key={advertiser.email}>
                  <div>
                    <b>{advertiser.businessName}</b>
                    <small>{advertiser.fullName} · {advertiser.email}</small>
                    <small>{advertiser.products} produk · {advertiser.offers} offer · {advertiser.campaigns} campaign</small>
                  </div>
                  <Status value={advertiser.status} />
                  <div className="publisher-admin-actions">
                    {advertiser.status === "active" ? (
                      <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "advertiser", id: advertiser.email, status: "suspended" })} type="button">Tangguhkan</button>
                    ) : advertiser.status === "suspended" ? (
                      <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "advertiser", id: advertiser.email, status: "active" })} type="button">Aktifkan</button>
                    ) : null}
                  </div>
                </article>
              ))}
            </section>
          )}

          {tab === "applications" && (
            <section className="admin-panel publisher-admin-panel">
              <h2>Advertiser Applications</h2>
              <p>Belum ada antrean KYB terpisah. Profil advertiser yang tersedia tercatat di tab Advertiser; campaign dan produk memiliki antrean review tersendiri.</p>
            </section>
          )}

          {tab === "campaigns" && (
            <section className="admin-panel publisher-admin-panel">
              <h2>Campaign & supply advertiser ({campaigns.length})</h2>
              {campaigns.length === 0 ? <p>Tidak ada campaign yang cocok.</p> : campaigns.map((campaign) => (
                <article className="publisher-admin-row" key={campaign.id}>
                  <div>
                    <b>{campaign.name} · {campaign.businessName ?? campaign.ownerEmail}</b>
                    <small>{campaign.objective} · budget <Rupiah value={Number(campaign.budgetIdr)} /></small>
                    <small>{campaign.productName ?? "Produk belum ditautkan"} · {campaign.category ?? "Kategori belum ada"} · payout <Rupiah value={Number(campaign.payoutIdr ?? 0)} /> · offer {campaign.offerStatus ?? "belum ada"}</small>
                  </div>
                  <Status value={campaign.status} />
                  {campaign.status === "Pending Review" && (
                    <div className="publisher-admin-actions">
                      <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "campaign", id: campaign.id, status: "Active" })} type="button">Aktifkan</button>
                      <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "campaign", id: campaign.id, status: "Rejected" })} type="button">Tolak</button>
                    </div>
                  )}
                </article>
              ))}
            </section>
          )}

          {tab === "billing" && (
            <section className="admin-panel publisher-admin-panel">
              <h2>Saldo advertiser</h2>
              <p>Saldo berikut hanya saldo yang tercatat di database. Deposit, transaksi, invoice, dan payment gateway belum terintegrasi; tidak ada transaksi yang diklaim telah diproses.</p>
              {advertisers.map((advertiser) => (
                <article className="publisher-admin-row" key={advertiser.email}>
                  <div><b>{advertiser.businessName}</b><small>{advertiser.email}</small></div>
                  <strong><Rupiah value={advertiser.walletBalanceIdr} /></strong>
                </article>
              ))}
            </section>
          )}

          {tab === "restrictions" && (
            <section className="admin-panel publisher-admin-panel">
              <h2>Akses advertiser</h2>
              {advertisers.map((advertiser) => (
                <article className="publisher-admin-row" key={advertiser.email}>
                  <div><b>{advertiser.businessName}</b><small>{advertiser.email}</small></div>
                  <Status value={advertiser.status} />
                  {advertiser.status === "active" ? (
                    <button className="admin-table-action" disabled={manage.isPending} onClick={() => void runMutation({ recordType: "advertiser", id: advertiser.email, status: "suspended" })} type="button">Tangguhkan</button>
                  ) : advertiser.status === "suspended" ? (
                    <button className="admin-table-action" disabled={manage.isPending} onClick={() => void runMutation({ recordType: "advertiser", id: advertiser.email, status: "active" })} type="button">Aktifkan</button>
                  ) : null}
                </article>
              ))}
            </section>
          )}

          {tab === "audit" && (
            <section className="admin-panel publisher-admin-panel">
              <h2>Audit advertiser ({data.auditLogs.length})</h2>
              {data.auditLogs.length === 0 ? <p>Belum ada tindakan admin pada data advertiser.</p> : data.auditLogs.map((entry) => (
                <article className="publisher-admin-row" key={entry.id}>
                  <div><b>{entry.action}</b><small>{entry.adminEmail} · {entry.targetType} · {entry.targetId} · {entry.details ?? ""}</small></div>
                  <time>{String(entry.createdAt)}</time>
                </article>
              ))}
            </section>
          )}
        </>
      ) : null}
    </div>
  );
}
