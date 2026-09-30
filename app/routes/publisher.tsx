import { appPath } from "@agent-native/core/client/api-path";
import {
  IconAd,
  IconArrowRight,
  IconBell,
  IconBuildingStore,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCalendar,
  IconChartBar,
  IconChartLine,
  IconChevronDown,
  IconClick,
  IconCoins,
  IconDeviceAnalytics,
  IconDeviceLaptop,
  IconFileAnalytics,
  IconGift,
  IconHelp,
  IconHome,
  IconLink,
  IconSearch,
  IconSettings,
  IconSpeakerphone,
  IconTargetArrow,
  IconTrendingUp,
  IconUser,
  IconWallet,
  IconWorld,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";

import {
  RoleNavigation,
  type RoleNavigationSection,
} from "@/components/RoleNavigation";

import "../components/publisher.css";

export function meta() {
  return [
    { title: "Dashboard Publisher — Nevora" },
    {
      name: "description",
      content: "Panel publisher Nevora untuk campaign, performa, dan komisi.",
    },
  ];
}

const categories = [
  "Semua",
  "Game",
  "Shopping",
  "Video",
  "Novel",
  "Website",
  "Survey",
  "Lainnya",
];

const campaigns = [
  {
    brand: "Game Legend",
    name: "Royal Quest",
    category: "Game",
    type: "CPI",
    goal: "Install + Register",
    commission: "Rp 12.000",
    fill: "game",
  },
  {
    brand: "Shopee",
    name: "Belanja Online",
    category: "Shopping",
    type: "CPS",
    goal: "Pembelian",
    commission: "8%",
    fill: "shopping",
  },
  {
    brand: "NovelPlus",
    name: "Baca Novel",
    category: "Novel",
    type: "CPL",
    goal: "Lead / Registrasi",
    commission: "Rp 1.000",
    fill: "novel",
  },
  {
    brand: "Video Brand",
    name: "View 30 Detik",
    category: "Video",
    type: "CPV",
    goal: "Video 30 detik",
    commission: "Rp 500",
    fill: "video",
  },
  {
    brand: "Website Travel",
    name: "Booking Hotel",
    category: "Website",
    type: "CPC",
    goal: "Klik",
    commission: "Rp 300",
    fill: "website",
  },
  {
    brand: "Survey Berhadiah",
    name: "Isi Survey",
    category: "Survey",
    type: "CPA",
    goal: "Lengkapi survey",
    commission: "Rp 700",
    fill: "survey",
  },
];

function PublisherMetric({
  label,
  value,
  change,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  change: string;
  icon: TablerIcon;
  tone: string;
}) {
  return (
    <article className="ad-metric-card publisher-metric-card">
      <span className={`ad-metric-icon ${tone}`}>
        <Icon size={17} stroke={1.9} />
      </span>
      <span className="ad-metric-label">{label}</span>
      <strong>{value}</strong>
      <span className="publisher-metric-change">
        <IconTrendingUp size={11} /> {change}
      </span>
    </article>
  );
}

export default function PublisherRoute() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [navigationPreview, setNavigationPreview] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const visibleCampaigns = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id-ID");
    return campaigns.filter((campaign) => {
      const matchesCategory =
        activeCategory === "Semua" || campaign.category === activeCategory;
      const matchesSearch =
        `${campaign.brand} ${campaign.name} ${campaign.goal}`
          .toLocaleLowerCase("id-ID")
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
  };

  const publisherNavigation: RoleNavigationSection[] = [
    {
      id: "marketplace",
      label: "Marketplace",
      icon: IconBuildingStore,
      items: [
        {
          label: "Semua Campaign",
          href: "#publisher-campaigns",
          onSelect: () => chooseCategory("Semua"),
        },
        {
          label: "Recommended",
          href: "#publisher-recommendations",
          onSelect: () => chooseCategory("Semua"),
        },
        {
          label: "Campaign Terbaru",
          href: "#publisher-campaigns",
          onSelect: () => chooseCategory("Semua"),
        },
        {
          label: "Campaign Terpopuler",
          href: "#publisher-campaigns",
          onSelect: () => chooseCategory("Semua"),
        },
        {
          label: "Private Campaign",
          onSelect: () => setNavigationPreview("Private Campaign"),
        },
        {
          label: "Campaign Saya",
          onSelect: () => setNavigationPreview("Campaign Saya"),
        },
      ],
    },
    {
      id: "promotion",
      label: "Promosi",
      icon: IconSpeakerphone,
      items: [
        {
          label: "Campaign Aktif",
          href: "#publisher-campaigns",
          onSelect: () => chooseCategory("Semua"),
        },
        ...[
          "Tracking Link",
          "Creative",
          "Banner",
          "Native Ads",
          "QR Code",
          "Deep Link",
        ].map((label) => ({
          label,
          onSelect: () => setNavigationPreview(label),
        })),
      ],
    },
    {
      id: "monetization",
      label: "Monetisasi",
      icon: IconGift,
      items: [
        {
          label: "Offerwall",
          href: "#publisher-campaigns",
          onSelect: () => chooseCategory("Survey"),
        },
        ...[
          "Rewarded Ads",
          "Performance Offers",
          "Affiliate",
          "Cashback",
          "Direct Sponsorship",
        ].map((label) => ({
          label,
          onSelect: () => setNavigationPreview(label),
        })),
      ],
    },
    {
      id: "traffic",
      label: "Traffic",
      icon: IconWorld,
      items: [
        "Sumber Traffic",
        "Website",
        "Social Media",
        "App",
        "Game",
        "Content / Channel",
      ].map((label) => ({
        label,
        onSelect: () =>
          label === "Website"
            ? chooseCategory("Website")
            : setNavigationPreview(label),
      })),
    },
    {
      id: "tracking",
      label: "Tracking",
      icon: IconLink,
      items: [
        "Click",
        "Conversion",
        "Pending",
        "Approved",
        "Rejected",
        "Reversal",
      ].map((label) => ({
        label,
        onSelect: () => setNavigationPreview(label),
      })),
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: IconChartBar,
      items: [
        "Overview",
        "Click Performance",
        "Conversion",
        "EPC",
        "Revenue",
        "Campaign Performance",
      ].map((label) => ({ label, href: "#publisher-performance" })),
    },
    {
      id: "earnings",
      label: "Pendapatan",
      icon: IconWallet,
      items: [
        "Saldo",
        "Pendapatan",
        "Pending Earnings",
        "Withdrawal",
        "Riwayat Pembayaran",
        "Invoice",
      ].map((label) => ({ label, href: "#publisher-wallet" })),
    },
    {
      id: "integrations",
      label: "Integrasi",
      icon: IconDeviceAnalytics,
      items: ["API", "SDK", "Webhook", "API Key"].map((label) => ({
        label,
        onSelect: () => setNavigationPreview(label),
      })),
    },
    {
      id: "settings",
      label: "Pengaturan",
      icon: IconSettings,
      items: [
        "Profil Publisher",
        "Role & Bisnis",
        "Channel / Property",
        "Verifikasi",
        "Pembayaran",
        "Notifikasi",
        "Keamanan",
      ].map((label) => ({
        label,
        onSelect: () => setNavigationPreview(label),
      })),
    },
  ];

  return (
    <div className="advertiser-app publisher-app">
      <aside className="ad-sidebar publisher-sidebar">
        <a className="ad-brand" href={appPath("/")}>
          <span>N</span> Nevora
        </a>
        <div className="ad-sidebar-role">
          <IconUser size={16} />
          <span>Publisher</span>
        </div>
        <RoleNavigation
          role="publisher"
          dashboardLabel="Dashboard"
          dashboardHref="#publisher-dashboard"
          dashboardIcon={IconHome}
          sections={publisherNavigation}
          onPreview={setNavigationPreview}
        />
        {navigationPreview && (
          <div className="role-navigation-preview" role="status">
            {navigationPreview} · pratinjau
          </div>
        )}
        <div className="publisher-sidebar-promo">
          <IconChartLine size={22} />
          <b>Tingkatkan penghasilan Anda</b>
          <span>Temukan campaign yang paling sesuai untuk audiens Anda.</span>
          <a href="#publisher-campaigns">
            Jelajahi Campaign <IconArrowRight size={13} />
          </a>
        </div>
        <a className="publisher-sidebar-help" href="#publisher-support">
          <IconHelp size={15} />
          <span>
            <b>Butuh bantuan?</b>
            <small>Tim support Nevora siap membantu.</small>
          </span>
        </a>
        <div className="ad-sidebar-footer publisher-sidebar-footer">
          <span>Nevora</span>
          <small>Publisher Bridge for Digital Growth</small>
          <small>v1.0.0</small>
        </div>
      </aside>

      <main className="ad-main publisher-main" id="publisher-dashboard">
        <header className="ad-topbar publisher-topbar">
          <label className="ad-search publisher-search">
            <IconSearch size={16} />
            <input
              aria-label="Cari campaign"
              placeholder="Cari campaign, kategori, atau nama advertiser..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="publisher-topbar-actions">
            <div className="publisher-notification-wrap">
              <button
                aria-expanded={notificationsOpen}
                aria-label="Notifikasi"
                className="ad-icon-button publisher-notification-button"
                onClick={() => setNotificationsOpen((open) => !open)}
                type="button"
              >
                <IconBell size={18} />
                <i />
              </button>
              {notificationsOpen && (
                <div className="publisher-notification-popover" role="status">
                  <b>Notifikasi</b>
                  <span>Tidak ada notifikasi baru.</span>
                </div>
              )}
            </div>
            <span className="publisher-language">
              <IconWorld size={15} /> ID <IconChevronDown size={12} />
            </span>
            <span
              className="ad-user-avatar publisher-avatar"
              id="publisher-profile"
            >
              BS
            </span>
            <span className="ad-user-caption publisher-user-caption">
              <b>Budi Santoso</b>
              <small>Publisher</small>
            </span>
            <IconChevronDown className="publisher-user-chevron" size={13} />
          </div>
        </header>

        <div className="ad-dashboard-layout publisher-dashboard-layout">
          <div className="ad-primary-column">
            <section className="ad-welcome publisher-welcome">
              <div>
                <span className="ad-kicker">Selamat datang kembali,</span>
                <h1>Budi Santoso</h1>
                <p>
                  Temukan campaign terbaik, tingkatkan trafik Anda, dan raih
                  komisi lebih besar bersama Nevora.
                </p>
              </div>
              <div className="publisher-welcome-art" aria-hidden="true">
                <IconDeviceLaptop size={43} stroke={1.45} />
                <IconTrendingUp size={31} stroke={1.7} />
                <span />
              </div>
            </section>

            <section
              className="ad-metric-grid publisher-metric-grid"
              aria-label="Ringkasan publisher"
            >
              <PublisherMetric
                label="Total Klik"
                value="12.450"
                change="18,5%"
                icon={IconClick}
                tone="blue"
              />
              <PublisherMetric
                label="Total Konversi"
                value="1.820"
                change="22,3%"
                icon={IconDeviceAnalytics}
                tone="violet"
              />
              <PublisherMetric
                label="Komisi Tertahan"
                value="Rp 8.760.000"
                change="16,8%"
                icon={IconCoins}
                tone="green"
              />
              <PublisherMetric
                label="Total Pendapatan"
                value="Rp 12.430.000"
                change="20,4%"
                icon={IconChartBar}
                tone="orange"
              />
            </section>

            <section
              className="ad-panel ad-performance-panel publisher-performance"
              id="publisher-performance"
            >
              <div className="ad-panel-heading">
                <h2>Performa Anda</h2>
                <button className="publisher-period" type="button">
                  <IconCalendar size={13} /> 7 hari terakhir
                  <IconChevronDown size={12} />
                </button>
              </div>
              <div className="ad-chart-layout publisher-chart-layout">
                <div className="ad-chart-wrap">
                  <div className="ad-chart-y-labels">
                    <span>12.000</span>
                    <span>9.000</span>
                    <span>6.000</span>
                    <span>3.000</span>
                  </div>
                  <svg
                    className="ad-chart publisher-chart"
                    viewBox="0 0 680 178"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Grafik klik, konversi, dan pendapatan selama tujuh hari"
                  >
                    <line x1="0" y1="8" x2="680" y2="8" />
                    <line x1="0" y1="53" x2="680" y2="53" />
                    <line x1="0" y1="98" x2="680" y2="98" />
                    <line x1="0" y1="143" x2="680" y2="143" />
                    <polyline
                      className="publisher-chart-clicks"
                      points="0,133 54,132 112,117 168,124 225,105 282,110 340,95 397,103 453,84 510,91 566,70 623,76 680,52"
                    />
                    <polyline
                      className="publisher-chart-conversions"
                      points="0,151 54,147 112,143 168,139 225,136 282,128 340,129 397,121 453,117 510,109 566,108 623,97 680,92"
                    />
                    <polyline
                      className="publisher-chart-revenue"
                      points="0,162 54,159 112,158 168,153 225,150 282,148 340,143 397,141 453,136 510,133 566,127 623,123 680,116"
                    />
                  </svg>
                  <div className="ad-chart-x-labels">
                    <span>22 Sep</span>
                    <span>23 Sep</span>
                    <span>24 Sep</span>
                    <span>25 Sep</span>
                    <span>26 Sep</span>
                    <span>27 Sep</span>
                    <span>28 Sep</span>
                  </div>
                </div>
                <div className="ad-chart-legend publisher-chart-legend">
                  <div>
                    <span className="legend-dot clicks" /> <span>Klik</span>
                    <b>
                      12.450 <small>↑ 18,5%</small>
                    </b>
                  </div>
                  <div>
                    <span className="legend-dot conversions" />
                    <span>Konversi</span>
                    <b>
                      1.820 <small>↑ 22,3%</small>
                    </b>
                  </div>
                  <div>
                    <span className="legend-dot spend" />
                    <span>Pendapatan</span>
                    <b>
                      Rp 12.430.000 <small>↑ 20,4%</small>
                    </b>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="ad-panel ad-campaigns-panel publisher-campaigns-panel"
              id="publisher-campaigns"
            >
              <div className="publisher-campaign-heading">
                <h2>Campaign Tersedia Untuk Anda</h2>
                <a href="#publisher-recommendations">
                  Lihat Semua <IconArrowRight size={12} />
                </a>
              </div>
              <div
                className="publisher-category-tabs"
                aria-label="Filter kategori campaign"
              >
                {categories.map((category) => (
                  <button
                    aria-pressed={activeCategory === category}
                    className={activeCategory === category ? "is-active" : ""}
                    key={category}
                    onClick={() => chooseCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="ad-table-wrap publisher-table-wrap">
                <table className="ad-campaign-table publisher-campaign-table">
                  <thead>
                    <tr>
                      <th>Nama Campaign</th>
                      <th>Tipe</th>
                      <th>Tujuan</th>
                      <th>Komisi</th>
                      <th>Ketersediaan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleCampaigns.map((campaign) => (
                      <tr key={campaign.name}>
                        <td>
                          <div className="ad-campaign-name publisher-campaign-name">
                            <span
                              className={`publisher-campaign-mark ${campaign.fill}`}
                            >
                              {campaign.brand.slice(0, 1)}
                            </span>
                            <span>
                              <b>
                                {campaign.brand}: {campaign.name}
                              </b>
                              <small>Advertiser Nevora</small>
                            </span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`publisher-type-pill ${campaign.fill}`}
                          >
                            {campaign.type}
                          </span>
                        </td>
                        <td>{campaign.goal}</td>
                        <td>{campaign.commission}</td>
                        <td>
                          <span className="publisher-available">Tersedia</span>
                        </td>
                        <td>
                          <a
                            className="publisher-promote-button"
                            href="#publisher-campaigns"
                            onClick={() => chooseCategory(campaign.category)}
                          >
                            Promosikan
                          </a>
                        </td>
                      </tr>
                    ))}
                    {visibleCampaigns.length === 0 && (
                      <tr>
                        <td className="publisher-empty-row" colSpan={6}>
                          Campaign tidak ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="ad-secondary-column publisher-secondary-column">
            <section className="publisher-featured-card">
              <div>
                <span>Pilihan Nevora</span>
                <h2>Campaign Pilihan Untuk Anda</h2>
                <p>
                  Dapatkan komisi lebih besar dari campaign eksklusif untuk
                  publisher.
                </p>
                <a href="#publisher-recommendations">
                  Lihat Campaign <IconArrowRight size={13} />
                </a>
              </div>
              <span className="publisher-featured-art" aria-hidden="true">
                <IconTargetArrow size={40} />
                <IconTrendingUp size={25} />
              </span>
            </section>

            <section
              className="ad-panel publisher-recommendations"
              id="publisher-recommendations"
            >
              <div className="ad-panel-heading">
                <h2>Rekomendasi Campaign</h2>
                <a href="#publisher-campaigns">Lihat Semua</a>
              </div>
              {campaigns.slice(0, 4).map((campaign, index) => {
                const CategoryIcon = [
                  IconBrandFacebook,
                  IconBrandInstagram,
                  IconBookIcon,
                  IconBrandYoutube,
                ][index];
                return (
                  <article
                    className="publisher-recommendation"
                    key={campaign.name}
                  >
                    <span
                      className={`publisher-recommendation-mark ${campaign.fill}`}
                    >
                      <CategoryIcon size={17} />
                    </span>
                    <span className="publisher-recommendation-copy">
                      <b>
                        {campaign.brand}: {campaign.name}
                      </b>
                      <small>
                        {campaign.commission} / {campaign.type}
                      </small>
                    </span>
                    <a
                      href="#publisher-campaigns"
                      onClick={() => chooseCategory(campaign.category)}
                    >
                      Promosikan
                    </a>
                  </article>
                );
              })}
            </section>

            <section
              className="ad-panel ad-wallet-card publisher-wallet-card"
              id="publisher-wallet"
            >
              <div className="ad-panel-heading">
                <h2>Saldo dan Penarikan</h2>
                <IconWallet size={16} />
              </div>
              <span className="publisher-balance-label">Saldo Tersedia</span>
              <strong>Rp 8.760.000</strong>
              <div className="publisher-wallet-breakdown">
                <span>
                  Komisi tertahan <b>Rp 2.120.000</b>
                </span>
                <span>
                  Komisi disetujui <b>Rp 7.520.000</b>
                </span>
                <span>
                  Total pendapatan <b>Rp 12.430.000</b>
                </span>
              </div>
              <a
                className="publisher-withdraw-button"
                href="#publisher-withdrawal"
              >
                Tarik Saldo <IconArrowRight size={13} />
              </a>
              <span
                className="publisher-withdrawal-anchor"
                id="publisher-withdrawal"
              />
            </section>

            <section className="publisher-support-card" id="publisher-support">
              <span>
                <IconHelp size={18} />
              </span>
              <div>
                <b>Butuh bantuan?</b>
                <small>Tim support Nevora siap membantu.</small>
                <a href="#publisher-profile">
                  Hubungi Kami <IconArrowRight size={11} />
                </a>
              </div>
            </section>

            <section
              className="publisher-channel-strip"
              aria-label="Channel sosial"
            >
              <IconBrandFacebook size={15} />
              <IconBrandInstagram size={15} />
              <IconBrandTiktok size={15} />
              <IconBrandYoutube size={15} />
              <span>Siap untuk semua channel Anda</span>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function IconBookIcon(props: { size?: number; stroke?: number }) {
  return <IconFileAnalytics {...props} />;
}
