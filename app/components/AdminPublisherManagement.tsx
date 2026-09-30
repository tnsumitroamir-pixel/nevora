import {
  actionErrorMessage,
  useActionMutation,
  useActionQuery,
} from "@agent-native/core/client/hooks";
import { useState } from "react";

const tabs = [
  ["publishers", "Publisher"],
  ["channels", "Channel"],
  ["applications", "Pengajuan Offer"],
  ["conversions", "Conversion"],
  ["performance", "Performa"],
  ["withdrawals", "Penarikan"],
  ["audit", "Audit Log"],
  ["support", "Bantuan"],
] as const;

export type AdminPublisherTab = (typeof tabs)[number][0];

function Rupiah({ value }: { value: number }) {
  return <>Rp {new Intl.NumberFormat("id-ID").format(value)}</>;
}

function Status({ value }: { value: string }) {
  return <span className="admin-status is-review">{value}</span>;
}

export function AdminPublisherManagement({ onBack, initialTab = "publishers" }: { onBack: () => void; initialTab?: AdminPublisherTab }) {
  const [tab, setTab] = useState<AdminPublisherTab>(initialTab);
  const [notice, setNotice] = useState("");
  const [transferReferences, setTransferReferences] = useState<Record<string, string>>({});
  const [responses, setResponses] = useState<Record<string, string>>({});
  const query = useActionQuery("get-admin-publisher-operations", {});
  const manage = useActionMutation("manage-publisher-operation");
  const migrate = useActionMutation("apply-publisher-migrations");

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
      setNotice("Pembaruan skema database berhasil diterapkan.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Skema database belum dapat diperbarui.");
    }
  };

  const data = query.data;

  return (
    <div className="admin-catalog-page">
      <div className="admin-panel-heading admin-catalog-heading">
        <div>
          <h1>Kontrol Publisher</h1>
          <p>Data berasal dari database. Perubahan Admin dicatat di audit log.</p>
        </div>
        <button className="admin-catalog-back" onClick={onBack} type="button">Dashboard</button>
      </div>

      <div className="publisher-admin-tabs" role="tablist" aria-label="Data publisher">
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
        <section className="admin-panel"><p>Memuat data Publisher dari database…</p></section>
      ) : query.error ? (
        <section className="admin-panel">
          <p className="admin-catalog-error">
            {actionErrorMessage(query.error) ?? "Data Publisher belum dapat dimuat. Periksa koneksi database atau jalankan pembaruan skema."}
          </p>
          <button className="admin-table-action" disabled={migrate.isPending} onClick={() => void applyMigrations()} type="button">
            {migrate.isPending ? "Memperbarui skema…" : "Terapkan pembaruan database"}
          </button>
          <button className="admin-catalog-back" onClick={() => void query.refetch()} type="button">Coba lagi</button>
        </section>
      ) : data ? (
        <section className="admin-panel publisher-admin-panel" role="tabpanel">
          {tab === "publishers" && (
            <>
              <h2>Publisher terdaftar ({data.publishers.length})</h2>
              {data.publishers.length === 0 ? <p>Belum ada data Publisher.</p> : data.publishers.map((publisher) => (
                <article className="publisher-admin-row" key={publisher.ownerEmail}>
                  <div><b>{publisher.fullName}</b><small>{publisher.ownerEmail} · {publisher.phone || "nomor belum diisi"}</small></div>
                  <Status value={publisher.status} />
                  <div className="publisher-admin-actions">
                    {["Pending", "Rejected"].includes(publisher.status) && <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "publisher", id: publisher.ownerEmail, status: "Active" })} type="button">Aktifkan</button>}
                    {publisher.status !== "Rejected" && <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "publisher", id: publisher.ownerEmail, status: "Rejected" })} type="button">Tolak</button>}
                    {publisher.status !== "Suspended" && <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "publisher", id: publisher.ownerEmail, status: "Suspended" })} type="button">Tangguhkan</button>}
                  </div>
                </article>
              ))}
            </>
          )}
          {tab === "channels" && (
            <>
              <h2>Channel Publisher ({data.channels.length})</h2>
              {data.channels.length === 0 ? <p>Belum ada channel yang didaftarkan.</p> : data.channels.map((channel) => (
                <article className="publisher-admin-row" key={channel.id}>
                  <div><b>{channel.name} · {channel.type}</b><small>{channel.publisherName ?? channel.ownerEmail} · <a href={channel.url} target="_blank" rel="noreferrer">{channel.url}</a></small></div>
                  <Status value={channel.status} />
                  {channel.status === "Pending" && <div className="publisher-admin-actions">
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "channel", id: channel.id, status: "Active" })} type="button">Setujui</button>
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "channel", id: channel.id, status: "Rejected" })} type="button">Tolak</button>
                  </div>}
                </article>
              ))}
            </>
          )}
          {tab === "applications" && (
            <>
              <h2>Pengajuan Offer ({data.applications.length})</h2>
              {data.applications.length === 0 ? <p>Belum ada pengajuan offer.</p> : data.applications.map((application) => (
                <article className="publisher-admin-row" key={application.id}>
                  <div><b>{application.offerName ?? "Offer sudah tidak tersedia"}</b><small>{application.publisherName ?? application.publisherEmail} · {application.publisherEmail}</small><small>{application.channelName ?? "Channel belum tercatat"} · {application.channelStatus ?? "belum diverifikasi"}</small></div>
                  <Status value={application.status} />
                  {application.status === "Pending" && <div className="publisher-admin-actions">
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "application", id: application.id, status: "Approved" })} type="button">Setujui</button>
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "application", id: application.id, status: "Rejected" })} type="button">Tolak</button>
                  </div>}
                </article>
              ))}
            </>
          )}
          {tab === "conversions" && (
            <>
              <h2>Conversion ({data.conversions.length})</h2>
              {data.conversions.length === 0 ? <p>Belum ada conversion dari advertiser.</p> : data.conversions.map((conversion) => (
                <article className="publisher-admin-row" key={conversion.id}>
                  <div><b>{conversion.offerName ?? "Offer"} · <Rupiah value={Number(conversion.payoutIdr)} /></b><small>{conversion.publisherName ?? conversion.publisherEmail} · event {conversion.externalEventId} · click {conversion.clickId}</small></div>
                  <Status value={conversion.status} />
                  {conversion.status === "Pending" && <div className="publisher-admin-actions">
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "conversion", id: conversion.id, status: "Approved" })} type="button">Setujui komisi</button>
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "conversion", id: conversion.id, status: "Rejected" })} type="button">Tolak</button>
                  </div>}
                </article>
              ))}
            </>
          )}
          {tab === "performance" && (
            <>
              <h2>Performa Publisher</h2>
              <div className="publisher-admin-performance">
                <article><small>Total klik tercatat</small><b>{Number(data.performance.clicks).toLocaleString("id-ID")}</b></article>
                <article><small>Conversion disetujui</small><b>{Number(data.performance.approvedConversions).toLocaleString("id-ID")}</b></article>
                <article><small>Conversion pending</small><b>{Number(data.performance.pendingConversions).toLocaleString("id-ID")}</b></article>
                <article><small>Komisi disetujui</small><b><Rupiah value={Number(data.performance.earnedIdr)} /></b></article>
                <article><small>Penarikan ditandai dibayar</small><b><Rupiah value={Number(data.performance.paidIdr)} /></b></article>
              </div>
            </>
          )}
          {tab === "withdrawals" && (
            <>
              <h2>Penarikan ({data.withdrawals.length})</h2>
              <p>Admin hanya menandai status Dibayar setelah transfer dilakukan di luar aplikasi.</p>
              {data.withdrawals.length === 0 ? <p>Belum ada permintaan penarikan.</p> : data.withdrawals.map((withdrawal) => (
                <article className="publisher-admin-row" key={withdrawal.id}>
                  <div><b>{withdrawal.publisherName ?? withdrawal.publisherEmail} · <Rupiah value={withdrawal.amountIdr} /></b><small>{withdrawal.publisherEmail} · {withdrawal.transferReference || "belum dibayar"}</small></div>
                  <Status value={withdrawal.status} />
                  {withdrawal.status === "Pending" && <div className="publisher-admin-actions">
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "withdrawal", id: withdrawal.id, status: "Approved" })} type="button">Setujui</button>
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "withdrawal", id: withdrawal.id, status: "Rejected" })} type="button">Tolak</button>
                  </div>}
                  {withdrawal.status === "Approved" && <div className="publisher-admin-actions">
                    <input aria-label="Nomor referensi transfer" placeholder="Referensi transfer" value={transferReferences[withdrawal.id] ?? ""} onChange={(event) => setTransferReferences((current) => ({ ...current, [withdrawal.id]: event.target.value }))} />
                    <button disabled={manage.isPending || !transferReferences[withdrawal.id]?.trim()} onClick={() => void runMutation({ recordType: "withdrawal", id: withdrawal.id, status: "Paid", transferReference: transferReferences[withdrawal.id] })} type="button">Sudah ditransfer</button>
                  </div>}
                </article>
              ))}
            </>
          )}
          {tab === "audit" && (
            <>
              <h2>Audit Log Publisher ({data.auditLogs.length})</h2>
              {data.auditLogs.length === 0 ? <p>Belum ada tindakan Admin pada data Publisher.</p> : data.auditLogs.map((entry) => <article className="publisher-admin-row" key={entry.id}><div><b>{entry.action}</b><small>{entry.adminEmail} · {entry.targetType} {entry.targetId} · {entry.details ?? ""}</small></div><time>{String(entry.createdAt)}</time></article>)}
            </>
          )}
          {tab === "support" && (
            <>
              <h2>Tiket bantuan ({data.supportTickets.length})</h2>
              {data.supportTickets.length === 0 ? <p>Belum ada tiket bantuan.</p> : data.supportTickets.map((ticket) => (
                <article className="publisher-admin-row publisher-admin-ticket" key={ticket.id}>
                  <div><b>{ticket.subject} · {ticket.publisherName ?? ticket.publisherEmail}</b><small>{ticket.publisherEmail}</small><p>{ticket.message}</p>{ticket.adminResponse && <p><b>Balasan:</b> {ticket.adminResponse}</p>}</div>
                  <Status value={ticket.status} />
                  {ticket.status !== "Closed" && <div className="publisher-admin-actions">
                    <textarea aria-label={`Balasan untuk ${ticket.subject}`} maxLength={4000} value={responses[ticket.id] ?? ""} onChange={(event) => setResponses((current) => ({ ...current, [ticket.id]: event.target.value }))} />
                    <button disabled={manage.isPending || !responses[ticket.id]?.trim()} onClick={() => void runMutation({ recordType: "support", id: ticket.id, status: "Answered", adminResponse: responses[ticket.id] })} type="button">Kirim balasan</button>
                    <button disabled={manage.isPending} onClick={() => void runMutation({ recordType: "support", id: ticket.id, status: "Closed" })} type="button">Tutup tiket</button>
                  </div>}
                </article>
              ))}
            </>
          )}
        </section>
      ) : null}
    </div>
  );
}
