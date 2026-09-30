import { appPath } from "@agent-native/core/client/api-path";
import {
  actionErrorMessage,
  useActionMutation,
  useActionQuery,
  useSession,
} from "@agent-native/core/client/hooks";
import {
  IconArrowRight,
  IconBell,
  IconChevronDown,
  IconChevronRight,
  IconCircleCheck,
  IconClipboardCheck,
  IconClock,
  IconCoins,
  IconGift,
  IconHelpCircle,
  IconHome,
  IconSpeakerphone,
  IconTicket,
  IconUser,
  IconUsers,
  IconWallet,
  IconWorld,
} from "@tabler/icons-react";
import { useState, type FormEvent } from "react";

import "./user-dashboard.css";

type UserDashboardData = {
  profile: { fullName: string; email: string; status: string };
  roles: string[];
  publisher: { status: string } | null;
  advertiser: { businessName: string } | null;
};

const menuGroups = [
  {
    label: "Offers",
    icon: IconTicket,
    links: [
      ["Semua Offer", "#offers"],
      ["Recommended", "#recommended-offers"],
      ["Offer Baru", "#offers"],
      ["Offer Saya", "#active-offers"],
      ["Detail Offer", "#offers"],
    ],
  },
  {
    label: "Aktivitas Saya",
    icon: IconClipboardCheck,
    links: [
      ["Offer Sedang Dikerjakan", "#active-offers"],
      ["Progress Milestone", "#active-offers"],
      ["Offer Selesai", "#activity"],
      ["Conversion", "#activity"],
      ["Riwayat Aktivitas", "#activity"],
    ],
  },
  {
    label: "Reward & Wallet",
    icon: IconWallet,
    links: [
      ["Saldo Reward", "#wallet"],
      ["Reward Pending", "#wallet"],
      ["Riwayat Reward", "#wallet"],
      ["Penarikan", "#wallet"],
      ["Riwayat Penarikan", "#wallet"],
    ],
  },
  {
    label: "Bonus & Referral",
    icon: IconUsers,
    links: [
      ["Referral Saya", "#referral"],
      ["Bonus Referral", "#referral"],
      ["Riwayat Bonus", "#referral"],
    ],
  },
  {
    label: "Become a Publisher",
    icon: IconSpeakerphone,
    links: [
      ["Daftar Publisher", "#publisher-role"],
      ["Status Pengajuan", "#publisher-role"],
      ["Profil Publisher", "#publisher-role"],
      ["Persyaratan Publisher", "#publisher-role"],
    ],
  },
  {
    label: "Become an Advertiser",
    icon: IconWorld,
    links: [
      ["Daftar Advertiser", "#advertiser-role"],
      ["Status Pengajuan", "#advertiser-role"],
      ["Profil Bisnis", "#advertiser-role"],
      ["Persyaratan Advertiser", "#advertiser-role"],
    ],
  },
  {
    label: "Notifikasi",
    icon: IconBell,
    links: [
      ["Semua", "#notifications"],
      ["Reward", "#notifications"],
      ["Offer", "#notifications"],
      ["Pengajuan", "#notifications"],
      ["Sistem", "#notifications"],
    ],
  },
  {
    label: "Profil",
    icon: IconUser,
    links: [
      ["Informasi Pribadi", "#profile"],
      ["Data Pembayaran", "#profile"],
      ["Verifikasi Identitas", "#profile"],
      ["Keamanan", "#profile"],
      ["Preferensi", "#profile"],
    ],
  },
  {
    label: "Bantuan",
    icon: IconHelpCircle,
    links: [
      ["Pusat Bantuan", "#help"],
      ["FAQ", "#help"],
      ["Support Ticket", "#help"],
      ["Laporkan Masalah", "#help"],
    ],
  },
] as const;

function EmptyState({ children }: { children: string }) {
  return <p className="user-feature-disabled">{children}</p>;
}

function UserSidebar() {
  return (
    <aside className="user-sidebar">
      <a className="user-brand" href="#dashboard" aria-label="Nevora Dashboard">
        <span className="user-brand-mark">N</span>
        <span>Nevora</span>
      </a>
      <nav className="user-nav" aria-label="Menu pengguna">
        <a className="active" href="#dashboard" aria-current="page">
          <IconHome size={17} stroke={1.9} />
          <span>Dashboard</span>
        </a>
        {menuGroups.map(({ label, icon: Icon, links }) => (
          <details className="user-menu-group" key={label}>
            <summary>
              <Icon size={17} stroke={1.9} />
              <span>{label}</span>
              <IconChevronDown className="user-menu-chevron" size={13} />
            </summary>
            <div className="user-menu-sublist">
              {links.map(([item, href]) => (
                <a href={href} key={item}>{item}</a>
              ))}
            </div>
          </details>
        ))}
      </nav>
      <div className="user-sidebar-foot">
        <span className="user-brand-mark">N</span>
        <span>Nevora</span>
        <small>© 2025</small>
      </div>
    </aside>
  );
}

function SectionHeading({ title, href }: { title: string; href?: string }) {
  return (
    <div className="user-section-heading">
      <h2>{title}</h2>
      {href && <a href={href}>Lihat Semua <IconChevronRight size={13} /></a>}
    </div>
  );
}

function RoleCard({
  role,
  status,
  href,
  description,
  missingAction,
}: {
  role: string;
  status: string | null;
  href: string;
  description: string;
  missingAction?: { label: string; href: string };
}) {
  const active = status === "Active" || status === "Approved";
  const pending = status !== null && !active;

  return (
    <article className="user-role-card">
      <div className="user-role-card-heading">
        <span className="user-metric-icon sky"><IconCircleCheck size={17} /></span>
        <div><h3>{role}</h3><small>{status ? `Status: ${status}` : "Belum terdaftar"}</small></div>
      </div>
      <p>{description}</p>
      {active ? (
        <a className="user-role-action" href={appPath(href)}>Buka Dashboard <IconChevronRight size={13} /></a>
      ) : pending ? (
        <a className="user-role-action" href={appPath(href)}>Lihat Status Pengajuan <IconChevronRight size={13} /></a>
      ) : missingAction ? (
        <a className="user-role-action" href={appPath(missingAction.href)}>{missingAction.label} <IconChevronRight size={13} /></a>
      ) : (
        <span className="user-role-unavailable">Pengajuan belum tersedia di sistem</span>
      )}
    </article>
  );
}

function PublisherApplication({
  data,
  onRefresh,
}: {
  data: UserDashboardData;
  onRefresh: () => Promise<void>;
}) {
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");
  const apply = useActionMutation("save-advertiser-profile");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("");
    try {
      await apply.mutateAsync({
        fullName: data.profile.fullName,
        phone: phone.trim(),
        role: "Publisher",
      });
      await onRefresh();
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Pengajuan belum dapat disimpan.");
    }
  };

  if (data.publisher) {
    return (
      <RoleCard
        role="Publisher"
        status={data.publisher.status}
        href="/publisher"
        description="Status ditampilkan dari profil Publisher akun ini."
      />
    );
  }

  return (
    <article className="user-role-card">
      <div className="user-role-card-heading">
        <span className="user-metric-icon sky"><IconSpeakerphone size={17} /></span>
        <div><h3>Publisher</h3><small>Tambahkan role ke akun yang sama</small></div>
      </div>
      <p>Pengajuan akan berstatus menunggu persetujuan. Lengkapi channel dan persyaratan lanjutan setelah profil dibuat.</p>
      <form className="user-role-application" onSubmit={submit}>
        <label htmlFor="publisher-application-phone">Nomor telepon</label>
        <input
          id="publisher-application-phone"
          autoComplete="tel"
          minLength={7}
          maxLength={24}
          onChange={(event) => setPhone(event.target.value)}
          required
          type="tel"
          value={phone}
        />
        {notice && <p className="user-role-error" role="alert">{notice}</p>}
        <button disabled={apply.isPending} type="submit">
          {apply.isPending ? "Mengirim…" : "Daftar Publisher"}
          {!apply.isPending && <IconArrowRight size={13} />}
        </button>
      </form>
    </article>
  );
}

function AccountRoleSwitcher({ data }: { data: UserDashboardData }) {
  return (
    <div className="user-role-switcher">
      <div><small>ROLE SAAT INI</small><strong>User</strong></div>
      {data.publisher?.status === "Active" && <a href={appPath("/publisher")}>Switch to Publisher</a>}
      {data.advertiser && <a href={appPath("/advertiser")}>Switch to Advertiser</a>}
      {!data.publisher && !data.advertiser && <span>Role tambahan belum aktif</span>}
    </div>
  );
}

function UserDashboardContent({
  data,
  onRefresh,
}: {
  data: UserDashboardData;
  onRefresh: () => Promise<void>;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="user-dashboard" id="dashboard">
      <UserSidebar />
      <main className="user-main">
        <header className="user-topbar">
          <label className="user-search user-search-disabled">
            <span aria-hidden="true">⌕</span>
            <input aria-label="Pencarian offer belum tersedia" disabled placeholder="Pencarian offer belum tersedia" />
          </label>
          <span className="user-demo-badge">DATA SESUAI KETERSEDIAAN BACKEND</span>
          <div className="user-topbar-actions">
            <div className="user-popover-anchor">
              <button className="user-icon-button" type="button" aria-label="Status notifikasi" aria-expanded={showNotifications} onClick={() => { setShowNotifications((current) => !current); setShowProfile(false); }}>
                <IconBell size={19} />
              </button>
              {showNotifications && <div className="user-quick-popover"><b>Notifikasi</b><span>Sistem notifikasi pengguna belum tersedia.</span></div>}
            </div>
            <div className="user-popover-anchor">
              <button className="user-profile-button" type="button" aria-expanded={showProfile} onClick={() => { setShowProfile((current) => !current); setShowNotifications(false); }}>
                <span className="user-avatar">{data.profile.fullName.slice(0, 1).toUpperCase()}</span>
                <b>{data.profile.fullName}</b>
                <IconChevronDown size={14} />
              </button>
              {showProfile && <div className="user-quick-popover profile-popover"><b>{data.profile.fullName}</b><span>{data.profile.email}</span><AccountRoleSwitcher data={data} /></div>}
            </div>
          </div>
        </header>

        <div className="user-dashboard-grid">
          <div className="user-main-column">
            <section className="user-welcome-card">
              <div className="user-welcome-copy">
                <span className="user-eyebrow">DASHBOARD PENGGUNA</span>
                <h1>Halo, {data.profile.fullName}</h1>
                <p>Ringkasan akun Nevora. Fitur yang belum memiliki sumber data ditandai agar tidak menampilkan informasi simulasi.</p>
              </div>
              <div className="welcome-gift-art" aria-hidden="true"><span className="gift-glow" /><IconCoins className="welcome-coins" size={51} stroke={1.6} /><span className="gift-box"><IconGift size={62} stroke={1.35} /></span></div>
            </section>

            <section className="user-metrics" id="wallet" aria-label="Ringkasan reward">
              <article className="user-metric-card"><span className="user-metric-icon mint"><IconWallet size={17} /></span><span>Saldo tersedia</span><strong>Belum tersedia</strong><small>Ledger User belum tersedia</small></article>
              <article className="user-metric-card"><span className="user-metric-icon amber"><IconClock size={17} /></span><span>Reward pending</span><strong>Belum tersedia</strong><small>Ledger User belum tersedia</small></article>
              <article className="user-metric-card"><span className="user-metric-icon sky"><IconCoins size={17} /></span><span>Total reward</span><strong>Belum tersedia</strong><small>Ledger User belum tersedia</small></article>
            </section>

            <section className="user-popular-panel" id="active-offers">
              <SectionHeading title="Offer Sedang Dikerjakan" />
              <EmptyState>Partisipasi offer dan progress milestone untuk User belum tersedia di backend.</EmptyState>
            </section>

            <section className="user-recommendations" id="recommended-offers">
              <SectionHeading title="Rekomendasi Offer" />
              <div id="offers" className="user-empty-card">
                <IconTicket size={21} />
                <strong>Marketplace offer User belum tersedia</strong>
                <p>Offer Publisher tidak digunakan sebagai offer User karena aturan eligibility dan tracking-nya berbeda.</p>
              </div>
            </section>

            <div className="user-bottom-grid">
              <section className="user-activity-panel" id="activity">
                <SectionHeading title="Aktivitas Terbaru" />
                <EmptyState>Riwayat aktivitas User belum tersedia dari backend.</EmptyState>
              </section>
              <section className="user-referral-panel" id="referral">
                <SectionHeading title="Bonus & Referral" />
                <EmptyState>Fitur referral belum tersedia. Tidak ada angka atau bonus simulasi yang ditampilkan.</EmptyState>
              </section>
            </div>
          </div>

          <aside className="user-right-column">
            <section className="user-notifications-panel" id="notifications">
              <SectionHeading title="Notifikasi" />
              <EmptyState>Sistem notifikasi User belum tersedia.</EmptyState>
            </section>

            <section className="user-role-panel" id="publisher-role">
              <SectionHeading title="Become a Publisher" />
              <PublisherApplication data={data} onRefresh={onRefresh} />
            </section>

            <section className="user-role-panel" id="advertiser-role">
              <SectionHeading title="Become an Advertiser" />
              <RoleCard
                role="Advertiser"
                status={data.advertiser ? "Active" : null}
                href="/advertiser"
                description={data.advertiser ? data.advertiser.businessName : "Lengkapi profil bisnis melalui alur Advertiser yang sudah tersedia."}
                missingAction={data.advertiser ? undefined : { label: "Daftar Advertiser", href: "/advertiser" }}
              />
            </section>

            <section className="user-profile-panel" id="profile">
              <SectionHeading title="Profil Pengguna" />
              <dl><div><dt>Nama</dt><dd>{data.profile.fullName}</dd></div><div><dt>Email</dt><dd>{data.profile.email}</dd></div><div><dt>Status akun</dt><dd>{data.profile.status}</dd></div><div><dt>Role akun</dt><dd>{data.roles.length ? data.roles.join(", ") : "User"}</dd></div></dl>
              <AccountRoleSwitcher data={data} />
            </section>

            <section className="user-help-panel" id="help">
              <SectionHeading title="Bantuan" />
              <EmptyState>Pusat bantuan dan support ticket pengguna belum tersedia.</EmptyState>
            </section>
          </aside>
        </div>
        <footer className="user-footer"><span>© 2025 Nevora. Semua hak dilindungi.</span><span>Data akun mengikuti sistem backend yang tersedia.</span></footer>
      </main>
    </div>
  );
}

export function UserDashboard() {
  const session = useSession();
  const query = useActionQuery("get-user-dashboard", {}, {
    enabled: session.status === "authenticated",
  });

  if (session.status === "loading" || session.status === "signing-out") {
    return <main className="user-state-shell" role="status">Memuat akun…</main>;
  }

  if (session.status === "unauthenticated" || session.status === "unavailable") {
    return (
      <main className="user-state-shell">
        <section className="user-state-card">
          <h1>{session.status === "unavailable" ? "Sesi belum tersedia" : "Masuk ke Nevora"}</h1>
          <p>{session.status === "unavailable" ? "Sesi pengguna belum dapat diperiksa." : "Masuk untuk membuka dashboard pengguna."}</p>
          {session.status === "unavailable" ? (
            <button onClick={session.retry} type="button">Coba lagi</button>
          ) : (
            <a href={appPath("/")}>Kembali ke Nevora</a>
          )}
        </section>
      </main>
    );
  }

  if (query.isLoading) {
    return <main className="user-state-shell" role="status">Memuat dashboard pengguna…</main>;
  }

  if (query.error || !query.data) {
    return (
      <main className="user-state-shell">
        <section className="user-state-card">
          <h1>Dashboard belum dapat dimuat</h1>
          <p>{actionErrorMessage(query.error) ?? "Periksa koneksi database lalu coba lagi."}</p>
          <button onClick={() => void query.refetch()} type="button">Coba lagi</button>
        </section>
      </main>
    );
  }

  return <UserDashboardContent data={query.data} onRefresh={async () => { await query.refetch(); }} />;
}
