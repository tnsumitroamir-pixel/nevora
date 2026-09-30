import { appPath } from "@agent-native/core/client/api-path";
import {
  actionErrorMessage,
  useActionMutation,
  useActionQuery,
  useSession,
} from "@agent-native/core/client/hooks";
import {
  IconArrowRight,
  IconBuildingStore,
  IconChartBar,
  IconChartLine,
  IconGift,
  IconHome,
  IconLink,
  IconUser,
  IconWallet,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import { useMemo, useState, type FormEvent } from "react";

import {
  RoleNavigation,
  type RoleNavigationSection,
} from "@/components/RoleNavigation";

import "./publisher.css";

const numberFormat = new Intl.NumberFormat("id-ID");
const moneyFormat = new Intl.NumberFormat("id-ID");

function formatMoney(value: number) {
  return `Rp ${moneyFormat.format(value)}`;
}

function formatDate(value: string) {
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function PublisherMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: TablerIcon;
}) {
  return (
    <article className="ad-metric-card publisher-metric-card">
      <span className="ad-metric-icon blue"><Icon size={17} /></span>
      <span className="ad-metric-label">{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function Empty({ children }: { children: string }) {
  return <p className="publisher-data-empty">{children}</p>;
}

function PublisherLoading() {
  return (
    <main className="ad-error-shell" role="status">
      Memuat data Publisher…
    </main>
  );
}

export function PublisherDashboard() {
  const session = useSession();
  const query = useActionQuery(
    "get-publisher-dashboard",
    {},
    { enabled: session.status === "authenticated" },
  );
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<Record<string, string>>({});
  const applyOffer = useActionMutation("apply-publisher-offer");
  const saveProfile = useActionMutation("save-publisher-profile");
  const saveChannel = useActionMutation("save-publisher-channel");
  const deleteChannel = useActionMutation("delete-publisher-channel");
  const requestWithdrawal = useActionMutation("request-publisher-withdrawal");
  const createTicket = useActionMutation("create-publisher-support-ticket");

  const navigation: RoleNavigationSection[] = [
    {
      id: "marketplace",
      label: "Marketplace Campaign",
      icon: IconBuildingStore,
      items: [
        { label: "Offer Aktif", href: "#publisher-marketplace" },
        { label: "Offer Terbaru", href: "#publisher-marketplace" },
        { label: "Detail & Komisi", href: "#publisher-marketplace" },
      ],
    },
    {
      id: "my-offers",
      label: "Campaign Saya",
      icon: IconGift,
      items: [
        { label: "Pengajuan Offer", href: "#publisher-applications" },
        { label: "Status Pengajuan", href: "#publisher-applications" },
      ],
    },
    {
      id: "tracking",
      label: "Promosi & Tracking",
      icon: IconLink,
      items: [
        { label: "Tautan Tracking", href: "#publisher-tracking" },
        { label: "Klik Tercatat", href: "#publisher-tracking" },
      ],
    },
    {
      id: "performance",
      label: "Performa",
      icon: IconChartBar,
      items: [
        { label: "Ringkasan 7 Hari", href: "#publisher-performance" },
        { label: "Conversion", href: "#publisher-conversions" },
      ],
    },
    {
      id: "earnings",
      label: "Komisi & Penarikan",
      icon: IconWallet,
      items: [
        { label: "Saldo", href: "#publisher-earnings" },
        { label: "Riwayat Komisi", href: "#publisher-earnings" },
        { label: "Permintaan Penarikan", href: "#publisher-withdrawals" },
      ],
    },
    {
      id: "channels",
      label: "Channel Saya",
      icon: IconChartLine,
      items: [
        { label: "Daftar Channel", href: "#publisher-channels" },
        { label: "Status Verifikasi", href: "#publisher-channels" },
      ],
    },
    {
      id: "profile",
      label: "Profil & Bantuan",
      icon: IconUser,
      items: [
        { label: "Profil Publisher", href: "#publisher-profile" },
        { label: "Tiket Bantuan", href: "#publisher-support" },
      ],
    },
  ];

  const visibleOffers = useMemo(() => {
    const needle = search.trim().toLocaleLowerCase("id-ID");
    return (query.data?.marketplace ?? []).filter((offer) =>
      `${offer.name} ${offer.category} ${offer.advertiserName ?? ""}`
        .toLocaleLowerCase("id-ID")
        .includes(needle),
    );
  }, [query.data?.marketplace, search]);

  const run = async (task: () => Promise<unknown>, success: string) => {
    setNotice("");
    try {
      await task();
      await query.refetch();
      setNotice(success);
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Permintaan belum dapat disimpan.");
    }
  };

  if (session.status === "loading" || session.status === "signing-out") {
    return <PublisherLoading />;
  }
  if (session.status === "unauthenticated" || session.status === "unavailable") {
    return (
      <main className="ad-setup-shell">
        <section className="ad-setup-card">
          <h1>{session.status === "unavailable" ? "Sesi belum tersedia" : "Masuk ke Nevora"}</h1>
          <p>{session.status === "unavailable" ? "Sesi login belum dapat diperiksa." : "Masuk untuk membuka dashboard Publisher."}</p>
          {session.status === "unavailable" ? (
            <button className="ad-button ad-button-primary" onClick={session.retry} type="button">Coba lagi</button>
          ) : <a className="ad-button ad-button-primary" href={appPath("/")}>Masuk ke Nevora</a>}
        </section>
      </main>
    );
  }
  if (query.isLoading) return <PublisherLoading />;
  if (query.error || !query.data) {
    return (
      <main className="ad-error-shell">
        <h1>Dashboard Publisher belum dapat dimuat</h1>
        <p>{actionErrorMessage(query.error) ?? "Periksa koneksi database dan coba lagi."}</p>
        <button className="ad-button ad-button-primary" onClick={() => void query.refetch()} type="button">Coba lagi</button>
      </main>
    );
  }

  const data = query.data;
  if (!data.profile) {
    return (
      <main className="ad-setup-shell">
        <section className="ad-setup-card">
          <h1>Profil Publisher belum terdaftar</h1>
          <p>Daftar sebagai Publisher dari halaman Nevora untuk membuat profil yang tercatat di database.</p>
          <a className="ad-button ad-button-primary" href={appPath("/")}>Kembali ke Nevora</a>
        </section>
      </main>
    );
  }
  if (data.profile.status !== "Active") {
    return (
      <main className="ad-setup-shell">
        <section className="ad-setup-card">
          <h1>Akun Publisher menunggu persetujuan</h1>
          <p>Status akun saat ini: {data.profile.status}. Dashboard operasional akan terbuka setelah Admin menyetujui akun.</p>
          <a className="ad-button ad-button-primary" href={appPath("/")}>Kembali ke Nevora</a>
        </section>
      </main>
    );
  }

  const applicationsByOffer = new Map(data.applications.map((application) => [application.offerId, application]));
  const activeChannels = data.channels.filter((channel) => channel.status === "Active");
  const pendingEarningsIdr = data.summary?.pendingEarningsIdr ?? 0;

  const submitForm =
    (handler: (values: FormData) => Promise<unknown>, success: string) =>
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void run(() => handler(new FormData(event.currentTarget)), success);
    };

  return (
    <div className="advertiser-app publisher-app">
      <aside className="ad-sidebar publisher-sidebar">
        <a className="ad-brand" href={appPath("/")}><span>N</span> Nevora</a>
        <div className="ad-sidebar-role"><IconUser size={16} /><span>Publisher</span></div>
        <RoleNavigation role="publisher" dashboardLabel="Ringkasan" dashboardHref="#publisher-dashboard" dashboardIcon={IconHome} sections={navigation} />
        <div className="ad-sidebar-footer publisher-sidebar-footer"><span>Nevora</span><small>Publisher</small></div>
      </aside>

      <main className="ad-main publisher-main" id="publisher-dashboard">
        <header className="ad-topbar publisher-topbar">
          <label className="ad-search publisher-search">
            <IconBuildingStore size={16} />
            <input aria-label="Cari offer" onChange={(event) => setSearch(event.target.value)} placeholder="Cari offer dari database…" value={search} />
          </label>
          <span className="ad-user-caption publisher-user-caption"><b>{data.profile.fullName}</b><small>Publisher · {data.profile.status}</small></span>
        </header>

        <div className="ad-dashboard-layout publisher-dashboard-layout">
          <div className="ad-primary-column">
            <section className="ad-welcome publisher-welcome">
              <div><span className="ad-kicker">Dashboard Publisher</span><h1>{data.profile.fullName}</h1><p>Data campaign, klik, komisi, dan penarikan ditampilkan dari database.</p></div>
            </section>
            {notice && <p className="publisher-action-notice" role="status">{notice}</p>}

            <section className="ad-metric-grid publisher-metric-grid" aria-label="Ringkasan publisher">
              <PublisherMetric label="Klik tercatat" value={numberFormat.format(data.summary?.clicks ?? 0)} icon={IconLink} />
              <PublisherMetric label="Conversion disetujui" value={numberFormat.format(data.summary?.approvedConversions ?? 0)} icon={IconChartBar} />
              <PublisherMetric label="Komisi pending" value={formatMoney(pendingEarningsIdr)} icon={IconChartLine} />
              <PublisherMetric label="Saldo tersedia" value={formatMoney(data.summary?.availableIdr ?? 0)} icon={IconWallet} />
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-marketplace">
              <div className="ad-panel-heading"><h2>Marketplace Campaign &amp; Offer Aktif</h2><span>Supply advertiser dengan komisi per conversion</span></div>
              {visibleOffers.length === 0 ? <Empty>{search ? "Tidak ada offer yang cocok dengan pencarian." : "Belum ada offer aktif dari advertiser."}</Empty> : visibleOffers.map((offer) => {
                const application = applicationsByOffer.get(offer.id);
                return (
                  <article className="publisher-data-row" key={offer.id}>
                    <div><b>{offer.campaignName ?? offer.name}</b><small>{offer.category || "Kategori belum ditentukan"} · {offer.advertiserName ?? "Advertiser"}{offer.campaignName ? ` · Offer: ${offer.name}` : ""}</small></div>
                    <strong>{formatMoney(offer.payoutIdr)} / conversion</strong>
                    <a href={offer.websiteUrl} rel="noreferrer" target="_blank">Detail offer</a>
                    {application && application.status !== "Rejected" ? <span className="publisher-data-status">{application.status}</span> : activeChannels.length > 0 ? (
                      <div className="publisher-apply-controls">
                        <select
                          aria-label={`Channel promosi untuk ${offer.name}`}
                          onChange={(event) => setSelectedChannels((current) => ({ ...current, [offer.id]: event.target.value }))}
                          value={selectedChannels[offer.id] ?? ""}
                        >
                          <option value="" disabled>Pilih channel</option>
                          {activeChannels.map((channel) => <option key={channel.id} value={channel.id}>{channel.name}</option>)}
                        </select>
                        <button
                          disabled={applyOffer.isPending || !selectedChannels[offer.id]}
                          onClick={() => void run(() => applyOffer.mutateAsync({ offerId: offer.id, channelId: selectedChannels[offer.id] }), "Pengajuan dicatat untuk channel terverifikasi. Tautan tracking aktif setelah persetujuan admin.")}
                          type="button"
                        >{application ? "Ajukan ulang" : "Ajukan"}</button>
                      </div>
                    ) : <a href="#publisher-channels">Verifikasi channel untuk mendaftar</a>}
                  </article>
                );
              })}
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-applications">
              <div className="ad-panel-heading"><h2>Campaign Saya · Pengajuan Offer</h2></div>
              {data.applications.length === 0 ? <Empty>Belum ada pengajuan offer.</Empty> : data.applications.map((application) => {
                const tracking = data.trackingLinks.find((link) => link.offerId === application.offerId);
                return <article className="publisher-data-row" key={application.id}><div><b>{application.offerName ?? "Offer"}</b><small>{application.channelName ?? "Channel tidak tersedia"} · diajukan {formatDate(application.createdAt)}</small></div><span className="publisher-data-status">{application.status}</span>{tracking && application.status === "Approved" && <a href={`${appPath(`/api/track/${tracking.token}`)}`} rel="noreferrer" target="_blank">Buka tautan tracking</a>}</article>;
              })}
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-tracking">
              <div className="ad-panel-heading"><h2>Tautan Tracking & Klik</h2></div>
              {data.trackingLinks.length === 0 ? <Empty>Tautan tracking dibuat saat mengajukan offer dan aktif setelah disetujui Admin.</Empty> : data.trackingLinks.map((link) => <article className="publisher-data-row" key={link.id}><div><b>{link.offerName ?? "Offer"}</b><small>{link.channelName ?? "Channel aktif"} · {appPath(`/api/track/${link.token}`)}</small></div><span>{numberFormat.format(link.clicks)} klik</span><button onClick={() => void navigator.clipboard.writeText(`${window.location.origin}${appPath(`/api/track/${link.token}`)}`).then(() => setNotice("Tautan tracking disalin."))} type="button">Salin tautan</button></article>)}
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-performance">
              <div className="ad-panel-heading"><h2>Performa 7 Hari</h2><span>Mulai {data.periodStart ? formatDate(data.periodStart) : "—"}</span></div>
              {data.dailyPerformance.length === 0 ? <Empty>Belum ada klik atau conversion yang tercatat.</Empty> : <div className="publisher-data-table-wrap"><table className="ad-campaign-table publisher-data-table"><thead><tr><th>Tanggal</th><th>Klik</th><th>Conversion disetujui</th><th>Pending</th><th>Komisi</th></tr></thead><tbody>{data.dailyPerformance.map((row) => <tr key={row.date}><td>{formatDate(row.date)}</td><td>{numberFormat.format(row.clicks)}</td><td>{numberFormat.format(row.conversions)}</td><td>{numberFormat.format(row.pendingConversions)}</td><td>{formatMoney(row.earnedIdr)}</td></tr>)}</tbody></table></div>}
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-conversions">
              <div className="ad-panel-heading"><h2>Conversion</h2><span>Sumber: advertiser terautentikasi · persetujuan Admin Root</span></div>
              {data.conversions.length === 0 ? <Empty>Belum ada conversion yang dikirim advertiser.</Empty> : data.conversions.map((conversion) => <article className="publisher-data-row" key={conversion.id}><div><b>{conversion.offerName ?? "Offer"}</b><small>Event {conversion.externalEventId} · {formatDate(conversion.createdAt)}</small></div><span className="publisher-data-status">{conversion.status}</span></article>)}
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-earnings">
              <div className="ad-panel-heading"><h2>Komisi & Saldo</h2></div>
              <div className="publisher-balance-grid"><div><small>Komisi disetujui</small><b>{formatMoney(data.summary?.earnedIdr ?? 0)}</b></div><div><small>Penarikan terpesan</small><b>{formatMoney(data.summary?.reservedIdr ?? 0)}</b></div><div><small>Saldo tersedia</small><b>{formatMoney(data.summary?.availableIdr ?? 0)}</b></div></div>
              {data.earnings.length === 0 ? <Empty>Belum ada komisi yang disetujui.</Empty> : data.earnings.map((earning) => <article className="publisher-data-row" key={earning.id}><div><b>{earning.offerName ?? "Offer"}</b><small>Conversion {earning.conversionId} · {formatDate(earning.createdAt)}</small></div><strong>{formatMoney(earning.amountIdr)}</strong></article>)}
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-withdrawals">
              <div className="ad-panel-heading"><h2>Permintaan Penarikan</h2></div>
              <p>Transfer dilakukan di luar aplikasi. Admin akan memperbarui status setelah transfer nyata.</p>
              <form className="publisher-inline-form" onSubmit={submitForm(async (values) => requestWithdrawal.mutateAsync({ amountIdr: Number(values.get("amountIdr")) }), "Permintaan penarikan tersimpan dan menahan saldo tersebut.")}>
                <label>Jumlah (IDR)<input name="amountIdr" type="number" min="1" max={data.summary?.availableIdr ?? 0} step="1" required /></label>
                <button disabled={requestWithdrawal.isPending || (data.summary?.availableIdr ?? 0) < 1} type="submit">{requestWithdrawal.isPending ? "Menyimpan…" : "Ajukan penarikan"}</button>
              </form>
              {data.withdrawals.length === 0 ? <Empty>Belum ada permintaan penarikan.</Empty> : data.withdrawals.map((withdrawal) => <article className="publisher-data-row" key={withdrawal.id}><div><b>{formatMoney(withdrawal.amountIdr)}</b><small>{formatDate(withdrawal.createdAt)}{withdrawal.transferReference ? ` · Referensi ${withdrawal.transferReference}` : ""}</small></div><span className="publisher-data-status">{withdrawal.status}</span></article>)}
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-channels">
              <div className="ad-panel-heading"><h2>Channel Saya</h2></div>
              <form className="publisher-inline-form" onSubmit={submitForm(async (values) => saveChannel.mutateAsync({ name: String(values.get("name")), type: String(values.get("type")) as "Website" | "Social Media" | "App" | "Game" | "Other", url: String(values.get("url")) }), "Channel berhasil didaftarkan untuk verifikasi Admin.")}>
                <label>Nama channel<input name="name" maxLength={160} required /></label>
                <label>Jenis<select name="type"><option>Website</option><option>Social Media</option><option>App</option><option>Game</option><option>Other</option></select></label>
                <label>URL<input name="url" type="url" maxLength={2048} required /></label>
                <button disabled={saveChannel.isPending} type="submit">Daftarkan channel</button>
              </form>
              {data.channels.length === 0 ? <Empty>Belum ada channel yang didaftarkan.</Empty> : data.channels.map((channel) => <article className="publisher-data-row" key={channel.id}><div><b>{channel.name} · {channel.type}</b><small><a href={channel.url} rel="noreferrer" target="_blank">{channel.url}</a></small></div><span className="publisher-data-status">{channel.status}</span>{channel.status !== "Active" && <button disabled={deleteChannel.isPending} onClick={() => void run(() => deleteChannel.mutateAsync({ id: channel.id }), "Channel dihapus.")} type="button">Hapus</button>}</article>)}
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-profile">
              <div className="ad-panel-heading"><h2>Profil Publisher</h2><span>{data.profile.ownerEmail}</span></div>
              <form className="publisher-inline-form" onSubmit={submitForm(async (values) => saveProfile.mutateAsync({ fullName: String(values.get("fullName")), phone: String(values.get("phone")) }), "Profil berhasil disimpan.")}>
                <label>Nama lengkap<input name="fullName" defaultValue={data.profile.fullName} maxLength={120} required /></label>
                <label>Nomor telepon<input name="phone" defaultValue={data.profile.phone} type="tel" minLength={7} maxLength={24} required /></label>
                <button disabled={saveProfile.isPending} type="submit">Simpan profil</button>
              </form>
            </section>

            <section className="ad-panel publisher-data-panel" id="publisher-support">
              <div className="ad-panel-heading"><h2>Bantuan Publisher</h2></div>
              <form className="publisher-support-form" onSubmit={submitForm(async (values) => createTicket.mutateAsync({ subject: String(values.get("subject")), message: String(values.get("message")) }), "Tiket bantuan berhasil dikirim.")}>
                <label>Topik<input name="subject" maxLength={160} required /></label>
                <label>Pesan<textarea name="message" maxLength={4000} required /></label>
                <button disabled={createTicket.isPending} type="submit">Kirim tiket bantuan</button>
              </form>
              {data.supportTickets.length === 0 ? <Empty>Belum ada tiket bantuan.</Empty> : data.supportTickets.map((ticket) => <article className="publisher-data-row" key={ticket.id}><div><b>{ticket.subject}</b><small>{ticket.message}{ticket.adminResponse ? ` · Balasan Admin: ${ticket.adminResponse}` : ""}</small></div><span className="publisher-data-status">{ticket.status}</span></article>)}
            </section>
          </div>
          <aside className="ad-secondary-column publisher-secondary-column">
            <section className="ad-panel publisher-data-panel"><div className="ad-panel-heading"><h2>Status Akun</h2></div><p>{data.profile.status} · {data.channels.filter((channel) => channel.status === "Active").length} channel disetujui</p><a href="#publisher-profile">Kelola profil <IconArrowRight size={12} /></a></section>
            <section className="ad-panel publisher-data-panel"><div className="ad-panel-heading"><h2>Catatan Data</h2></div><p>Komisi masuk hanya setelah conversion dari advertiser disetujui Admin Root. Tidak ada data contoh pada dashboard ini.</p></section>
          </aside>
        </div>
      </main>
    </div>
  );
}
