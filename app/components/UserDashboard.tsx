import {
  IconBell,
  IconBolt,
  IconBrandTiktok,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconCircleCheck,
  IconClipboardCheck,
  IconClock,
  IconCoins,
  IconDeviceGamepad2,
  IconGift,
  IconHelpCircle,
  IconHome,
  IconSearch,
  IconShoppingBag,
  IconSpeakerphone,
  IconStar,
  IconTicket,
  IconUser,
  IconUsers,
  IconWallet,
  IconWorld,
  type Icon,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";

import "./user-dashboard.css";

type Offer = {
  brand: string;
  category: string;
  title: string;
  reward: string;
  icon: Icon;
  tone: string;
  tag: string;
};

const offers: Offer[] = [
  {
    brand: "Royal Match",
    category: "Game",
    title: "Install & mainkan hingga Level 10",
    reward: "Rp 6.000",
    icon: IconStar,
    tone: "coral",
    tag: "Mudah",
  },
  {
    brand: "TikTok",
    category: "Social",
    title: "Daftar & tonton video 10 menit",
    reward: "Rp 3.000",
    icon: IconBrandTiktok,
    tone: "ink",
    tag: "Cepat",
  },
  {
    brand: "Traveloka",
    category: "Travel",
    title: "Pesan tiket pertama",
    reward: "Rp 8.000",
    icon: IconWorld,
    tone: "blue",
    tag: "Popular",
  },
  {
    brand: "Shopee",
    category: "Shopping",
    title: "Belanja minimum Rp 50.000",
    reward: "Rp 5.000",
    icon: IconShoppingBag,
    tone: "orange",
    tag: "Terbatas",
  },
  {
    brand: "State of Survival",
    category: "Game",
    title: "Install & mainkan hingga Level 15",
    reward: "Rp 12.000",
    icon: IconDeviceGamepad2,
    tone: "olive",
    tag: "Mudah",
  },
  {
    brand: "Mobile Legends",
    category: "Game",
    title: "Mainkan hingga Rank Epic",
    reward: "Rp 15.000",
    icon: IconBolt,
    tone: "purple",
    tag: "Populer",
  },
];

const categories = ["Semua", "Game", "Aplikasi", "Shopping", "Survey", "Lainnya"];

const notices = [
  { icon: IconCoins, tone: "gold", title: "Reward telah dikreditkan", detail: "Rp 6.000 dari Coin Master", time: "2 jam yang lalu" },
  { icon: IconGift, tone: "pink", title: "Offer baru tersedia!", detail: "Galaxy Empire kini tersedia di Nevora", time: "5 jam yang lalu" },
  { icon: IconCheck, tone: "green", title: "Pengajuan Publisher disetujui", detail: "Selamat! Pengajuanmu sebagai Publisher telah disetujui.", time: "1 hari yang lalu" },
  { icon: IconWorld, tone: "slate", title: "Sistem", detail: "Maintenance selesai. Terima kasih atas kesabarannya.", time: "1 hari yang lalu" },
];

function OfferMark({ offer }: { offer: Offer }) {
  const Icon = offer.icon;
  return (
    <span className={`user-offer-mark ${offer.tone}`} aria-hidden="true">
      <Icon size={23} stroke={2.1} />
    </span>
  );
}

function UserSidebar({ onSelect }: { onSelect: (label: string) => void }) {
  const primaryLinks = [
    { label: "Dashboard", icon: IconHome, href: "#dashboard", active: true },
    { label: "Offers", icon: IconTicket, href: "#offers" },
    { label: "Aktivitas Saya", icon: IconClipboardCheck, href: "#activity" },
    { label: "Reward & Wallet", icon: IconWallet, href: "#rewards" },
    { label: "Bonus & Referral", icon: IconUsers, href: "#referral" },
  ];

  return (
    <aside className="user-sidebar">
      <a className="user-brand" href="#dashboard" aria-label="Nevora Dashboard">
        <span className="user-brand-mark">N</span>
        <span>Nevora</span>
      </a>
      <nav className="user-nav" aria-label="Menu pengguna">
        {primaryLinks.map(({ label, icon: Icon, href, active }) => (
          <a className={active ? "active" : ""} href={href} key={label}>
            <Icon size={17} stroke={1.9} />
            <span>{label}</span>
          </a>
        ))}
        <div className="user-nav-divider" />
        <button className="user-nav-link" onClick={() => onSelect("Pendaftaran Publisher")} type="button">
          <IconSpeakerphone size={17} stroke={1.9} /><span>Become a Publisher</span><i>New</i>
        </button>
        <button className="user-nav-link" onClick={() => onSelect("Pendaftaran Advertiser")} type="button">
          <IconWorld size={17} stroke={1.9} /><span>Become an Advertiser</span><i>New</i>
        </button>
        <a href="#notifications"><IconBell size={17} stroke={1.9} /><span>Notifikasi</span><b className="user-nav-count">3</b></a>
        <button className="user-nav-link" onClick={() => onSelect("Profil saya")} type="button"><IconUser size={17} stroke={1.9} /><span>Profil</span></button>
        <button className="user-nav-link" onClick={() => onSelect("Pusat bantuan")} type="button"><IconHelpCircle size={17} stroke={1.9} /><span>Bantuan</span></button>
      </nav>
      <section className="user-sidebar-promo">
        <div className="promo-heading"><span className="promo-rocket">↗</span><b>Ingin mendapatkan penghasilan lebih?</b></div>
        <p>Jadilah Publisher atau Advertiser dan mulai monetisasi aktivitas online kamu!</p>
        <button onClick={() => onSelect("Informasi pendaftaran Publisher")} type="button">Pelajari Lebih Lanjut</button>
      </section>
      <div className="user-sidebar-foot"><span className="user-brand-mark">N</span><span>Nevora</span><small>© 2025</small></div>
    </aside>
  );
}

function SectionHeading({ title, href, children }: { title: string; href?: string; children?: React.ReactNode }) {
  return (
    <div className="user-section-heading">
      <div><h2>{title}</h2>{children}</div>
      {href && <a href={href}>Lihat Semua <IconChevronRight size={13} /></a>}
    </div>
  );
}

export function UserDashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [notice, setNotice] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const filteredOffers = useMemo(() => {
    const searchValue = search.trim().toLocaleLowerCase("id-ID");
    return offers.filter((offer) => {
      const matchesCategory = category === "Semua" || offer.category === category;
      const matchesSearch = `${offer.brand} ${offer.title} ${offer.category}`.toLocaleLowerCase("id-ID").includes(searchValue);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const showPreviewNotice = (message: string) => setNotice(`${message} tersedia sebagai pratinjau UI. Data belum terhubung ke backend.`);

  return (
    <div className="user-dashboard" id="dashboard">
      <UserSidebar onSelect={showPreviewNotice} />
      <main className="user-main">
        <header className="user-topbar">
          <label className="user-search">
            <IconSearch size={17} />
            <input aria-label="Cari offer, game, atau brand" onChange={(event) => setSearch(event.target.value)} placeholder="Cari offer, game, atau brand..." value={search} />
            <kbd>⌘ K</kbd>
          </label>
          <span className="user-demo-badge">MODE DEMO · DATA SIMULASI</span>
          <div className="user-topbar-actions">
            <div className="user-popover-anchor">
              <button className="user-icon-button" type="button" aria-label="Notifikasi" aria-expanded={showNotifications} onClick={() => { setShowNotifications((current) => !current); setShowProfile(false); }}>
                <IconBell size={19} /><i />
              </button>
              {showNotifications && <div className="user-quick-popover"><b>Notifikasi terbaru</b><span>Reward Rp 6.000 telah dikreditkan.</span><a href="#notifications" onClick={() => setShowNotifications(false)}>Buka semua notifikasi</a></div>}
            </div>
            <div className="user-popover-anchor">
              <button className="user-profile-button" type="button" aria-expanded={showProfile} onClick={() => { setShowProfile((current) => !current); setShowNotifications(false); }}>
                <span className="user-avatar">A</span><b>Andi Pratama</b><IconChevronDown size={14} />
              </button>
              {showProfile && <div className="user-quick-popover profile-popover"><b>Andi Pratama</b><span>Akun pengguna Nevora</span><button type="button" onClick={() => showPreviewNotice("Pengaturan profil")}>Lihat Profil</button></div>}
            </div>
          </div>
        </header>

        {notice && <div className="user-preview-notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Tutup pemberitahuan" type="button">×</button></div>}

        <div className="user-dashboard-grid">
          <div className="user-main-column">
            <section className="user-welcome-card">
              <div className="user-welcome-copy"><span className="user-eyebrow">DASHBOARD PENGGUNA</span><h1>Halo, Andi! <span aria-hidden="true">✦</span></h1><p>Selamat datang kembali di Nevora. Temukan berbagai offer menarik dan dapatkan reward untuk setiap aktivitasmu!</p></div>
              <div className="welcome-gift-art" aria-hidden="true"><span className="gift-glow" /><IconCoins className="welcome-coins" size={51} stroke={1.6} /><span className="gift-box"><IconGift size={62} stroke={1.35} /></span><span className="gift-sparkle">✦</span></div>
            </section>

            <section className="user-metrics" id="rewards" aria-label="Ringkasan reward">
              <article className="user-metric-card"><span className="user-metric-icon mint"><IconWallet size={17} /></span><span>Saldo Reward</span><strong>Rp 125.000</strong><button onClick={() => showPreviewNotice("Detail saldo reward")} type="button">Lihat Detail</button></article>
              <article className="user-metric-card"><span className="user-metric-icon amber"><IconClock size={17} /></span><span>Reward Pending</span><strong>Rp 35.000</strong><button onClick={() => showPreviewNotice("Detail reward pending")} type="button">Lihat Detail</button></article>
              <article className="user-metric-card"><span className="user-metric-icon sky"><IconCoins size={17} /></span><span>Total Reward</span><strong>Rp 560.000</strong><button onClick={() => showPreviewNotice("Riwayat reward")} type="button">Lihat Riwayat</button></article>
            </section>

            <section className="user-game-card">
              <div className="game-art"><IconDeviceGamepad2 size={32} /><span>CM</span></div>
              <div className="game-progress-copy"><div className="game-title-row"><div><h2>Coin Master</h2><p>Install &amp; mainkan hingga Level 10</p></div><span className="game-badge">MILESTONE</span></div><div className="game-progress-track"><span /></div><small>Progress 3/5 milestone</small></div>
              <div className="game-reward"><span>Reward Saat Ini</span><strong>Rp 9.000</strong><button onClick={() => showPreviewNotice("Offer Coin Master")} type="button">Lanjutkan</button></div>
            </section>

            <section className="user-recommendations" id="offers">
              <SectionHeading title="Rekomendasi Offer" href="#popular-offers" />
              <div className="user-offer-grid">
                {offers.slice(0, 4).map((offer) => (
                  <article className="user-offer-card" key={offer.brand}>
                    <div className="offer-card-top"><OfferMark offer={offer} /><button aria-label={`Lihat ${offer.brand}`} onClick={() => showPreviewNotice(`Detail ${offer.brand}`)} type="button"><IconChevronRight size={14} /></button></div>
                    <h3>{offer.brand}</h3><div className="offer-tags"><span>{offer.category}</span><i>{offer.tag}</i></div><p>{offer.title}</p><strong>{offer.reward}</strong><button className="user-primary-button" onClick={() => showPreviewNotice(`Offer ${offer.brand}`)} type="button">Mulai Offer</button>
                  </article>
                ))}
              </div>
            </section>

            <section className="user-popular-panel" id="popular-offers">
              <SectionHeading title="Offer Populer" href="#offers"><span className="user-result-count">{filteredOffers.length} offer</span></SectionHeading>
              <div className="user-category-tabs" role="tablist" aria-label="Kategori offer">
                {categories.map((item) => <button aria-selected={category === item} className={category === item ? "selected" : ""} key={item} onClick={() => setCategory(item)} role="tab" type="button">{item}</button>)}
              </div>
              <div className="user-offer-list">
                {filteredOffers.length ? filteredOffers.map((offer) => (
                  <article className="user-offer-row" key={offer.brand}>
                    <OfferMark offer={offer} /><div className="offer-row-title"><strong>{offer.brand}</strong><span>{offer.title}</span></div><div className="offer-row-tags"><span>{offer.category}</span><i>{offer.tag}</i></div><strong className="offer-row-reward">{offer.reward}</strong><button onClick={() => showPreviewNotice(`Offer ${offer.brand}`)} type="button">Mulai</button>
                  </article>
                )) : <p className="user-empty-state">Tidak ada offer yang cocok. Coba kata kunci atau kategori lain.</p>}
              </div>
            </section>

            <div className="user-bottom-grid">
              <section className="user-activity-panel" id="activity">
                <SectionHeading title="Aktivitas Terbaru" href="#activity" />
                <div className="user-activity-list">
                  <article><span className="activity-dot purple"><IconCoins size={14} /></span><div><strong>Reward dari Coin Master</strong><small>2 jam yang lalu</small></div><b>+ Rp 6.000</b></article>
                  <article><span className="activity-dot ink"><IconBrandTiktok size={14} /></span><div><strong>Offer selesai · TikTok</strong><small>5 jam yang lalu</small></div><b>+ Rp 3.500</b></article>
                  <article><span className="activity-dot orange"><IconShoppingBag size={14} /></span><div><strong>Penarikan dana berhasil</strong><small>1 hari yang lalu</small></div><b className="activity-negative">− Rp 50.000</b></article>
                  <article><span className="activity-dot blue"><IconUser size={14} /></span><div><strong>Mendaftar sebagai User</strong><small>2 hari yang lalu</small></div><b>+ Rp 0</b></article>
                </div>
              </section>
              <section className="user-referral-panel" id="referral">
                <SectionHeading title="Bonus Referral" href="#referral" />
                <p>Bagikan link referral kamu dan dapatkan bonus untuk setiap teman yang bergabung.</p>
                <div className="referral-stats"><div><small>Total Referral</small><strong>12 orang</strong></div><div><small>Bonus Referral</small><strong>Rp 120.000</strong></div></div>
                <button onClick={() => showPreviewNotice("Program referral")} type="button">Lihat Detail</button><div className="referral-art" aria-hidden="true"><IconUsers size={35} /><IconGift size={22} /></div>
              </section>
            </div>
          </div>

          <aside className="user-right-column">
            <section className="user-notifications-panel" id="notifications">
              <SectionHeading title="Notifikasi" href="#notifications" />
              <div className="user-notification-list">{notices.map(({ icon: Icon, tone, title, detail, time }) => <article key={title}><span className={`notification-icon ${tone}`}><Icon size={16} /></span><div><strong>{title}</strong><p>{detail}</p><small>{time}</small></div><IconChevronRight className="notification-chevron" size={13} /></article>)}</div>
            </section>

            <section className="user-publisher-progress">
              <SectionHeading title="Progress Menjadi Publisher" />
              <p>Langkah 2 dari 4</p><div className="publisher-progress-track"><span /></div>
              <ul><li className="done"><span><IconCircleCheck size={15} /></span><b>Informasi Akun</b><small>Selesai</small></li><li className="done"><span><IconCircleCheck size={15} /></span><b>Data Channel</b><small>Selesai</small></li><li className="current"><span>3</span><b>Verifikasi Dokumen</b><small>Dalam Proses</small></li><li><span>4</span><b>Peninjauan Admin</b><small>Menunggu</small></li></ul>
            </section>

            <section className="user-publisher-banner"><span className="user-eyebrow">KEMBANGKAN PENGHASILAN</span><h2>Dapatkan Penghasilan dengan Menjadi Publisher!</h2><p>Bagikan link atau promosi offer dari Nevora dan dapatkan komisi menarik.</p><button onClick={() => showPreviewNotice("Pendaftaran Publisher")} type="button">Daftar Sekarang</button><div className="publisher-banner-art" aria-hidden="true"><span className="art-laptop" /><span className="art-person"><i /><b /></span><span className="art-coin">N</span></div></section>
          </aside>
        </div>
        <footer className="user-footer"><span>© 2025 Nevora. Semua hak dilindungi.</span><nav aria-label="Tautan legal"><a href="#terms">Syarat &amp; Ketentuan</a><a href="#privacy">Kebijakan Privasi</a><a href="#help">Hubungi Kami</a></nav></footer>
      </main>
    </div>
  );
}
