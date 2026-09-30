import { appPath } from "@agent-native/core/client/api-path";
import {
  IconActivity,
  IconAd,
  IconArrowRight,
  IconBell,
  IconCalendar,
  IconChartBar,
  IconChartLine,
  IconChevronDown,
  IconChevronRight,
  IconCircleCheck,
  IconClick,
  IconCoins,
  IconCreditCard,
  IconDatabase,
  IconDeviceAnalytics,
  IconFingerprint,
  IconFlag,
  IconGauge,
  IconGift,
  IconHome,
  IconLock,
  IconMoneybag,
  IconReportAnalytics,
  IconSearch,
  IconSettings,
  IconShieldCheck,
  IconShoppingBag,
  IconSpeakerphone,
  IconTargetArrow,
  IconUser,
  IconUserCheck,
  IconUsers,
  IconWallet,
  IconWorld,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { AdminCatalogReview } from "@/components/AdminCatalogReview";
import {
  AdminAdvertiserManagement,
  type AdminAdvertiserTab,
} from "@/components/AdminAdvertiserManagement";
import {
  AdminPublisherManagement,
  type AdminPublisherTab,
} from "@/components/AdminPublisherManagement";

import "../components/admin.css";

export function meta() {
  return [
    { title: "Dashboard Administrator — Nevora" },
    {
      name: "description",
      content: "Dashboard kontrol Administrator Nevora.",
    },
  ];
}

const metrics = [
  {
    label: "Total Pengguna",
    value: "12.483",
    change: "12,5%",
    icon: IconUsers,
    tone: "blue",
  },
  {
    label: "Total Advertiser",
    value: "248",
    change: "8,3%",
    icon: IconSpeakerphone,
    tone: "cyan",
  },
  {
    label: "Total Campaign",
    value: "3.421",
    change: "21,4%",
    icon: IconTargetArrow,
    tone: "violet",
  },
  {
    label: "Total Transaksi",
    value: "Rp 2.847.650.000",
    change: "18,9%",
    icon: IconMoneybag,
    tone: "orange",
  },
];

const systemStatus = [
  { label: "Website", detail: "Online", icon: IconActivity },
  { label: "Database MySQL", detail: "Online", icon: IconDatabase },
  { label: "Tracking Server", detail: "Online", icon: IconFingerprint },
  { label: "Payment Gateway", detail: "Online", icon: IconCreditCard },
  { label: "Email Service", detail: "Online", icon: IconFlag },
  { label: "Redis Cache", detail: "Online", icon: IconGauge },
];

const campaigns = [
  {
    name: "Game XYZ - Install & Register",
    advertiser: "GameStudio",
    type: "CPI",
    budget: "Rp 20.000.000",
    performance: "1.240 / 3.000",
    progress: 41,
    status: "Aktif",
  },
  {
    name: "Shopee - Pembelian Produk",
    advertiser: "Shopee Indonesia",
    type: "CPS",
    budget: "Rp 15.000.000",
    performance: "860 / 1.000",
    progress: 86,
    status: "Aktif",
  },
  {
    name: "Video Brand - View 30s",
    advertiser: "BrandXYZ",
    type: "CPV",
    budget: "Rp 10.000.000",
    performance: "4.210 / 5.000",
    progress: 84,
    status: "Aktif",
  },
  {
    name: "Novel Seri - Baca 5 Chapter",
    advertiser: "NovelPlus",
    type: "CPL",
    budget: "Rp 8.000.000",
    performance: "620 / 1.000",
    progress: 62,
    status: "Aktif",
  },
  {
    name: "Website - Kunjungan Qualified",
    advertiser: "Traveloka",
    type: "CPC",
    budget: "Rp 5.000.000",
    performance: "8.740 / 10.000",
    progress: 87,
    status: "Pause",
  },
];

const advertisers = [
  {
    name: "PT Maju Bersama",
    email: "marketing@majubersama.id",
    segment: "Retail",
    status: "Aktif",
    campaigns: "12 campaign",
  },
  {
    name: "GameStudio",
    email: "growth@gamestudio.id",
    segment: "Game",
    status: "Aktif",
    campaigns: "8 campaign",
  },
  {
    name: "Shopee Indonesia",
    email: "ads@shopee.co.id",
    segment: "E-commerce",
    status: "Aktif",
    campaigns: "16 campaign",
  },
  {
    name: "BrandXYZ",
    email: "team@brandxyz.id",
    segment: "FMCG",
    status: "Review",
    campaigns: "3 campaign",
  },
  {
    name: "Traveloka",
    email: "partner@traveloka.id",
    segment: "Travel",
    status: "Aktif",
    campaigns: "6 campaign",
  },
];

const recentActivity = [
  {
    title: "Campaign baru dibuat",
    detail: "Game XYZ - Install & Register",
    time: "14:32",
    tone: "green",
    icon: IconCircleCheck,
  },
  {
    title: "Konversi masuk",
    detail: "Shopee - Pembelian Produk",
    time: "12:30",
    tone: "orange",
    icon: IconShoppingBag,
  },
  {
    title: "Deposit diterima",
    detail: "Rp 5.000.000 · PT Maju Bersama",
    time: "11:10",
    tone: "green",
    icon: IconWallet,
  },
];

type AdminList = "campaigns" | "advertisers" | "publishers";
type AdminAccountRow = {
  name: string;
  email: string;
  segment?: string;
  channel?: string;
  status: string;
  campaigns: string;
};

function AdminMetric({
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
    <article className="admin-metric">
      <span className={`admin-metric-icon ${tone}`}>
        <Icon size={17} />
      </span>
      <span className="admin-metric-label">{label}</span>
      <strong>{value}</strong>
      <small>
        <IconChartLine size={11} /> {change} <span>vs bulan lalu</span>
      </small>
    </article>
  );
}

function AdminNavGroup({
  icon: Icon,
  label,
  open,
  active,
  onToggle,
  children,
}: {
  icon: TablerIcon;
  label: string;
  open: boolean;
  active?: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="admin-nav-group">
      <button
        aria-expanded={open}
        aria-label={label}
        className={`admin-nav-trigger${active ? " is-active" : ""}`}
        onClick={onToggle}
        type="button"
      >
        <Icon size={16} />
        <span>{label}</span>
        <IconChevronDown className={open ? "is-open" : ""} size={12} />
      </button>
      {open && <div className="admin-subnav">{children}</div>}
    </div>
  );
}

function AdminAccountTable({
  list,
  search,
  onManage,
}: {
  list: Exclude<AdminList, "campaigns">;
  search: string;
  onManage: (name: string) => void;
}) {
  const rows: AdminAccountRow[] = list === "advertisers" ? advertisers : [];
  const query = search.trim().toLocaleLowerCase("id-ID");
  const filteredRows = rows.filter((row) =>
    `${row.name} ${row.email} ${row.segment ?? row.channel}`
      .toLocaleLowerCase("id-ID")
      .includes(query),
  );

  return (
    <div className="admin-table-scroll">
      <table className="admin-table admin-account-table">
        <thead>
          <tr>
            <th>{list === "advertisers" ? "Nama Advertiser" : "Nama Publisher"}</th>
            <th>{list === "advertisers" ? "Industri" : "Channel"}</th>
            <th>Campaign</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.email}>
              <td>
                <span className="admin-account-name">
                  <i>{row.name.slice(0, 1)}</i>
                  <span>
                    <b>{row.name}</b>
                    <small>{row.email}</small>
                  </span>
                </span>
              </td>
              <td>{row.segment ?? row.channel}</td>
              <td>{row.campaigns}</td>
              <td>
                <span
                  className={`admin-status ${row.status === "Aktif" ? "is-active" : "is-review"}`}
                >
                  {row.status}
                </span>
              </td>
              <td>
                <button
                  className="admin-table-action"
                  onClick={() => onManage(row.name)}
                  type="button"
                >
                  Kelola
                </button>
              </td>
            </tr>
          ))}
          {filteredRows.length === 0 && (
            <tr>
              <td className="admin-empty-row" colSpan={5}>
                Tidak ada akun yang sesuai.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminRoute() {
  const [access, setAccess] = useState<"checking" | "allowed" | "denied" | "unavailable">(
    "checking",
  );
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    fetch(appPath("/api/installer/admin-session"))
      .then(async (response) => {
        const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
        if (!active) return;
        if (response.ok && result?.ok) setAccess("allowed");
        else if (response.status === 401 || response.status === 403) setAccess("denied");
        else setAccess("unavailable");
      })
      .catch(() => {
        if (active) setAccess("unavailable");
      });
    return () => {
      active = false;
    };
  }, [retry]);

  if (access !== "allowed") {
    return (
      <main className="admin-login-page">
        <section className="admin-login-card" role="status">
          <span className="admin-login-mark">
            <IconShieldCheck size={22} />
          </span>
          <h1>
            {access === "checking"
              ? "Memeriksa akses"
              : access === "denied"
                ? "Akses administrator diperlukan"
                : "Dashboard belum tersedia"}
          </h1>
          <p>
            {access === "checking"
              ? "Sesi Administrator sedang diverifikasi."
              : access === "denied"
                ? "Masuk menggunakan akun Administrator Nevora."
                : "Koneksi ke database belum tersedia. Pastikan MySQL AMPPS berjalan."}
          </p>
          {access === "unavailable" && (
            <button
              onClick={() => {
                setAccess("checking");
                setRetry((value) => value + 1);
              }}
              type="button"
            >
              Coba lagi
            </button>
          )}
          {access === "denied" && (
            <a className="installer-primary-button" href={appPath("/admin-login")}>
              Login Admin <IconArrowRight size={16} />
            </a>
          )}
        </section>
      </main>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [activeList, setActiveList] = useState<AdminList>("campaigns");
  const [openMenu, setOpenMenu] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("7 Hari");
  const [managedAccount, setManagedAccount] = useState("");
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [catalogReviewOpen, setCatalogReviewOpen] = useState(false);
  const [advertiserManagementTab, setAdvertiserManagementTab] =
    useState<AdminAdvertiserTab | null>("accounts");
  const [publisherManagementTab, setPublisherManagementTab] =
    useState<AdminPublisherTab | null>(null);

  const visibleCampaigns = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id-ID");
    return campaigns.filter((campaign) =>
      `${campaign.name} ${campaign.advertiser} ${campaign.type}`
        .toLocaleLowerCase("id-ID")
        .includes(query),
    );
  }, [search]);

  const toggleMenu = (key: string) => {
    setOpenMenu((current) => (current === key ? "" : key));
  };

  const showList = (list: AdminList) => {
    setActiveList(list);
    setAdvertiserManagementTab(null);
    setPublisherManagementTab(null);
    setCatalogReviewOpen(false);
    setManagedAccount("");
  };

  const openPublisherManagement = (label: string) => {
    const lowerLabel = label.toLocaleLowerCase("id-ID");
    const tab: AdminPublisherTab = lowerLabel.includes("channel")
      ? "channels"
      : lowerLabel.includes("application") || lowerLabel.includes("pengajuan")
        ? "applications"
        : lowerLabel.includes("performance") || lowerLabel.includes("performa")
          ? "performance"
          : lowerLabel.includes("payout") || lowerLabel.includes("penarikan")
            ? "withdrawals"
            : lowerLabel.includes("conversion") || lowerLabel.includes("tracking")
              ? "conversions"
              : "publishers";
    setPublisherManagementTab(tab);
    setAdvertiserManagementTab(null);
    setCatalogReviewOpen(false);
    setManagedAccount("");
  };

  const openAdvertiserManagement = (label: string) => {
    const lowerLabel = label.toLocaleLowerCase("id-ID");
    const tab: AdminAdvertiserTab = lowerLabel.includes("application") || lowerLabel.includes("verification")
      ? "applications"
      : lowerLabel.includes("campaign")
        ? "campaigns"
        : lowerLabel.includes("billing")
          ? "billing"
          : lowerLabel.includes("restriction") || lowerLabel.includes("suspend")
            ? "restrictions"
            : lowerLabel.includes("audit")
              ? "audit"
              : "accounts";
    setAdvertiserManagementTab(tab);
    setPublisherManagementTab(null);
    setCatalogReviewOpen(false);
  };

  const activities = showAllActivities ? recentActivity : recentActivity.slice(0, 4);

  const listTitle =
    activeList === "campaigns"
      ? "Campaign Terbaru"
      : activeList === "advertisers"
        ? "Kontrol Advertiser"
        : "Kontrol Publisher";

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <a className="admin-brand" href={appPath("/")} aria-label="Nevora Admin Panel">
          <span>N</span>
          <span className="admin-brand-copy">
            <b>Nevora</b>
            <small>Admin Panel</small>
          </span>
        </a>
        <nav className="admin-nav" aria-label="Navigasi admin">
          <a
            aria-label="Dashboard"
            className="is-active"
            href="#admin-dashboard"
            aria-current="page"
          >
            <IconHome size={16} />
            <span>Dashboard</span>
          </a>
          <AdminNavGroup
            icon={IconUsers}
            label="Users"
            open={openMenu === "users"}
            onToggle={() => toggleMenu("users")}
          >
            {[
              "Semua User",
              "Consumer",
              "Publisher",
              "Advertiser",
              "Partner",
              "Multi-Role",
              "Suspended",
              "Banned",
            ].map((label) => (
              <a
                href={label === "Publisher" ? "#publisher-control" : "#admin-accounts"}
                key={label}
                onClick={(event) => {
                  if (label === "Publisher") {
                    event.preventDefault();
                    openPublisherManagement("publishers");
                  } else if (label === "Advertiser") {
                    event.preventDefault();
                    openAdvertiserManagement("Advertiser");
                  } else {
                    showList("publishers");
                  }
                }}
              >
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconShieldCheck}
            label="Verification"
            open={openMenu === "verification"}
            onToggle={() => toggleMenu("verification")}
          >
            {[
              "KYC / KYB",
              "Publisher Verification",
              "Advertiser Verification",
              "Partner Verification",
              "Verification Queue",
            ].map((label) => (
              <a
                href={label.includes("Publisher") ? "#publisher-control" : "#admin-accounts"}
                key={label}
                onClick={(event) => {
                  if (label.includes("Publisher")) {
                    event.preventDefault();
                    openPublisherManagement("publishers");
                  } else if (label.includes("Advertiser")) {
                    event.preventDefault();
                    openAdvertiserManagement(label);
                  } else {
                    showList("publishers");
                  }
                }}
              >
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconTargetArrow}
            label="Campaign Management"
            open={openMenu === "campaignManagement"}
            onToggle={() => toggleMenu("campaignManagement")}
          >
            {[
              "Semua Campaign",
              "Pending Review",
              "Active",
              "Paused",
              "Completed",
              "Rejected",
              "Campaign Rules",
            ].map((label) => (
              <a href="#admin-accounts" key={label} onClick={(event) => { event.preventDefault(); openAdvertiserManagement(label); }}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconGift}
            label="Products & Offers"
            open={openMenu === "products"}
            onToggle={() => toggleMenu("products")}
          >
            {["Produk", "Offers", "Offerwall", "Creative", "Categories"].map((label) => (
              <a
                href="#admin-quick-actions"
                key={label}
                onClick={(event) => {
                  if (label === "Produk" || label === "Offers") {
                    event.preventDefault();
                    setAdvertiserManagementTab(null);
                    setPublisherManagementTab(null);
                    setCatalogReviewOpen(true);
                    setOpenMenu("");
                  }
                }}
              >
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconUserCheck}
            label="Publisher Network"
            active={activeList === "publishers" || publisherManagementTab !== null}
            open={openMenu === "publisherNetwork"}
            onToggle={() => toggleMenu("publisherNetwork")}
          >
            {[
              "Semua Publisher",
              "Publisher Applications",
              "Publisher Channels",
              "Publisher Performance",
              "Publisher Payout",
              "Publisher Restrictions",
            ].map((label) => (
              <a href="#publisher-control" key={label} onClick={(event) => { event.preventDefault(); openPublisherManagement(label); }}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconSpeakerphone}
            label="Advertiser Network"
            active={activeList === "advertisers" || advertiserManagementTab !== null}
            open={openMenu === "advertiserNetwork"}
            onToggle={() => toggleMenu("advertiserNetwork")}
          >
            {[
              "Semua Advertiser",
              "Advertiser Applications",
              "Campaign Activity",
              "Advertiser Billing",
              "Advertiser Restrictions",
            ].map((label) => (
              <a href="#admin-accounts" key={label} onClick={(event) => { event.preventDefault(); openAdvertiserManagement(label); }}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconActivity}
            label="Tracking & Attribution"
            open={openMenu === "tracking"}
            onToggle={() => toggleMenu("tracking")}
          >
            {[
              "Click Logs",
              "Conversion Logs",
              "Attribution",
              "Postback",
              "Webhook",
              "Tracking Errors",
            ].map((label) => (
              <a href="#admin-performance" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconShieldCheck}
            label="Fraud & Risk"
            open={openMenu === "security"}
            onToggle={() => toggleMenu("security")}
          >
            {[
              "Fraud Detection",
              "Suspicious Traffic",
              "Duplicate Conversion",
              "Device / IP Risk",
              "Chargeback",
              "Reversal",
              "Blacklist / Whitelist",
            ].map((label) => (
              <a href="#admin-system-status" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconWallet}
            label="Keuangan"
            open={openMenu === "finance"}
            onToggle={() => toggleMenu("finance")}
          >
            {[
              "Financial Dashboard",
              "Advertiser Funding",
              "Publisher Payable",
              "Transactions",
              "Ledger",
              "Settlement",
              "Withdrawal",
              "Invoice",
              "Reconciliation",
            ].map((label) => (
              <a href="#admin-quick-actions" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconGauge}
            label="Economic Protection"
            open={openMenu === "economic"}
            onToggle={() => toggleMenu("economic")}
          >
            {[
              "Policy Dashboard",
              "Funding Rules",
              "Exposure Limits",
              "Margin Rules",
              "Kill Switch",
              "Campaign Risk",
              "Provider Risk",
            ].map((label) => (
              <a href="#admin-system-status" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconDatabase}
            label="Providers"
            open={openMenu === "providers"}
            onToggle={() => toggleMenu("providers")}
          >
            {[
              "Provider List",
              "Provider Accounts",
              "Provider Offers",
              "Provider API",
              "Provider Postback",
              "Provider Settlement",
              "Provider Health",
            ].map((label) => (
              <a href="#admin-system-status" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconDeviceAnalytics}
            label="Integrations"
            open={openMenu === "integrations"}
            onToggle={() => toggleMenu("integrations")}
          >
            {["API", "Webhook", "OAuth", "SDK", "Integration Logs"].map((label) => (
              <a href="#admin-system-status" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconReportAnalytics}
            label="Reports"
            open={openMenu === "reports"}
            onToggle={() => toggleMenu("reports")}
          >
            {[
              "Revenue",
              "Campaign",
              "Publisher",
              "Advertiser",
              "Conversion",
              "Fraud",
              "Financial",
            ].map((label) => (
              <a href="#admin-performance" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconBell}
            label="Support"
            open={openMenu === "support"}
            onToggle={() => toggleMenu("support")}
          >
            {["Tickets", "Disputes", "Complaints", "System Announcements"].map((label) => (
              <a href="#admin-activity" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconGauge}
            label="System"
            open={openMenu === "systemTools"}
            onToggle={() => toggleMenu("systemTools")}
          >
            {[
              "System Health",
              "Job Queue",
              "Error Logs",
              "Audit Logs",
              "API Logs",
              "Cron / Scheduler",
            ].map((label) => (
              <a href="#admin-system-status" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconSettings}
            label="Configuration"
            open={openMenu === "configuration"}
            onToggle={() => toggleMenu("configuration")}
          >
            {[
              "General",
              "Localization",
              "Currency",
              "Tax",
              "Commission Rules",
              "Reward Rules",
              "Notification Rules",
            ].map((label) => (
              <a href="#admin-settings" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
          <AdminNavGroup
            icon={IconLock}
            label="Security"
            open={openMenu === "securitySettings"}
            onToggle={() => toggleMenu("securitySettings")}
          >
            {[
              "Admin Users",
              "Roles & Permissions",
              "2FA",
              "Sessions",
              "Access Logs",
              "Security Policies",
            ].map((label) => (
              <a href="#admin-settings" key={label}>
                {label}
              </a>
            ))}
          </AdminNavGroup>
        </nav>
        <section className="admin-sidebar-system" id="admin-settings">
          <span>
            <IconShieldCheck size={16} />
          </span>
          <div>
            <b>Sistem Berjalan Normal</b>
            <small>Semua layanan aktif dan aman.</small>
          </div>
          <a href="#admin-system-status">
            Lihat Status Sistem <IconArrowRight size={11} />
          </a>
        </section>
        <div className="admin-sidebar-footer">
          Nevora v1.0.0 <small>© 2026 Nevora. All rights reserved.</small>
        </div>
      </aside>

      <main className="admin-main" id="admin-dashboard">
        <header className="admin-topbar">
          <label className="admin-search">
            <IconSearch size={15} />
            <input
              aria-label="Cari pengguna, campaign, advertiser, publisher"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari pengguna, campaign, advertiser, publisher..."
              value={search}
            />
            <kbd>Ctrl + K</kbd>
          </label>
          <div className="admin-topbar-actions">
            <div className="admin-notification-wrap">
              <button
                aria-expanded={notificationsOpen}
                aria-label="Notifikasi"
                className="admin-icon-button"
                onClick={() => setNotificationsOpen((open) => !open)}
                type="button"
              >
                <IconBell size={17} />
                <i />
              </button>
              {notificationsOpen && (
                <div className="admin-notification-popover" role="status">
                  Tidak ada notifikasi baru.
                </div>
              )}
            </div>
            <span className="admin-language">
              <IconWorld size={13} /> ID <IconChevronDown size={11} />
            </span>
            <span className="admin-avatar">AD</span>
            <span className="admin-account-caption">
              <b>Admin Nevora</b>
              <small>Administrator</small>
            </span>
            <IconChevronDown size={12} />
            <a className="admin-login-link" href={appPath("/admin-login")}>
              Login Admin
            </a>
          </div>
        </header>

        {advertiserManagementTab ? (
          <AdminAdvertiserManagement
            key={advertiserManagementTab}
            initialTab={advertiserManagementTab}
            onBack={() => setAdvertiserManagementTab("accounts")}
          />
        ) : publisherManagementTab ? (
          <AdminPublisherManagement
            key={publisherManagementTab}
            initialTab={publisherManagementTab}
            onBack={() => setAdvertiserManagementTab("accounts")}
          />
        ) : catalogReviewOpen ? (
          <AdminCatalogReview onBack={() => setAdvertiserManagementTab("accounts")} />
        ) : (
          <div className="admin-content-grid">
          <div className="admin-primary-column">
            <section className="admin-welcome">
              <span className="admin-welcome-icon">
                <IconShieldCheck size={18} />
              </span>
              <div>
                <h1>Selamat datang, Admin Nevora</h1>
                <b>Dashboard Administrator</b>
                <p>Pantau aktivitas utama platform Nevora.</p>
              </div>
              <div className="admin-welcome-art" aria-hidden="true">
                <IconDeviceAnalytics size={45} />
                <span>
                  <IconShieldCheck size={17} />
                </span>
              </div>
            </section>

            <section className="admin-metric-grid" aria-label="Ringkasan platform">
              {metrics.map((metric) => (
                <AdminMetric key={metric.label} {...metric} />
              ))}
            </section>

            <section className="admin-performance-layout" id="admin-performance">
              <article className="admin-panel admin-trend-panel">
                <div className="admin-panel-heading">
                  <h2>Tren Performa Platform</h2>
                  <div className="admin-periods">
                    {["7 Hari", "30 Hari", "90 Hari"].map((range) => (
                      <button
                        aria-pressed={selectedRange === range}
                        className={selectedRange === range ? "is-active" : ""}
                        key={range}
                        onClick={() => setSelectedRange(range)}
                        type="button"
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="admin-chart-legend">
                  <span>
                    <i className="click" />
                    Klik
                  </span>
                  <span>
                    <i className="conversion" />
                    Konversi
                  </span>
                  <span>
                    <i className="revenue" />
                    Pendapatan
                  </span>
                </div>
                <div className="admin-chart-wrap">
                  <div className="admin-chart-y">
                    <span>40.000</span>
                    <span>30.000</span>
                    <span>20.000</span>
                    <span>10.000</span>
                    <span>0</span>
                  </div>
                  <svg
                    className="admin-chart"
                    viewBox="0 0 660 180"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Tren klik, konversi, dan pendapatan platform"
                  >
                    <line x1="0" y1="8" x2="660" y2="8" />
                    <line x1="0" y1="48" x2="660" y2="48" />
                    <line x1="0" y1="88" x2="660" y2="88" />
                    <line x1="0" y1="128" x2="660" y2="128" />
                    <line x1="0" y1="168" x2="660" y2="168" />
                    <polyline
                      className="admin-line-click"
                      points="0,135 55,129 110,112 165,120 220,101 275,109 330,92 385,98 440,83 495,86 550,68 605,71 660,52"
                    />
                    <polyline
                      className="admin-line-conversion"
                      points="0,150 55,146 110,138 165,142 220,131 275,133 330,124 385,127 440,116 495,119 550,104 605,106 660,94"
                    />
                    <polyline
                      className="admin-line-revenue"
                      points="0,162 55,158 110,155 165,150 220,147 275,144 330,139 385,136 440,131 495,128 550,123 605,119 660,112"
                    />
                  </svg>
                  <div className="admin-chart-x">
                    <span>22 Sep</span>
                    <span>23 Sep</span>
                    <span>24 Sep</span>
                    <span>25 Sep</span>
                    <span>26 Sep</span>
                    <span>27 Sep</span>
                    <span>28 Sep</span>
                  </div>
                </div>
              </article>
              <article className="admin-panel admin-daily-panel">
                <div className="admin-panel-heading">
                  <h2>Ringkasan Hari Ini</h2>
                </div>
                <div className="admin-daily-stat">
                  <span className="blue">
                    <IconClick size={16} />
                  </span>
                  <div>
                    <small>Klik</small>
                    <b>24.852</b>
                    <em>↑ 12,5%</em>
                  </div>
                </div>
                <div className="admin-daily-stat">
                  <span className="green">
                    <IconUsers size={16} />
                  </span>
                  <div>
                    <small>Konversi</small>
                    <b>3.421</b>
                    <em>↑ 18,7%</em>
                  </div>
                </div>
                <div className="admin-daily-stat">
                  <span className="violet">
                    <IconCoins size={16} />
                  </span>
                  <div>
                    <small>Pendapatan</small>
                    <b>Rp 37.650.000</b>
                    <em>↑ 6,3%</em>
                  </div>
                </div>
              </article>
            </section>

            <section className="admin-panel admin-list-panel" id="admin-accounts">
              <div className="admin-panel-heading admin-list-heading">
                <h2>{listTitle}</h2>
                {activeList === "campaigns" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      showList("campaigns");
                    }}
                  >
                    Lihat Semua <IconArrowRight size={11} />
                  </button>
                ) : (
                  <button type="button" onClick={() => showList("campaigns")}>
                    Kembali ke Campaign <IconArrowRight size={11} />
                  </button>
                )}
              </div>
              {managedAccount && (
                <div className="admin-selection-note" role="status">
                  Pratinjau lokal: {managedAccount}. Perubahan tidak disimpan.
                </div>
              )}
              {activeList === "campaigns" ? (
                <div className="admin-table-scroll">
                  <table className="admin-table admin-campaign-table">
                    <thead>
                      <tr>
                        <th>Nama Campaign</th>
                        <th>Tipe</th>
                        <th>Advertiser</th>
                        <th>Budget</th>
                        <th>Performa</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleCampaigns.map((campaign, index) => (
                        <tr key={campaign.name}>
                          <td>
                            <span className={`admin-campaign-mark color-${index}`}>
                              {index === 1 ? <IconShoppingBag size={14} /> : <IconAd size={14} />}
                            </span>
                            <span className="admin-campaign-title">
                              <b>{campaign.name}</b>
                              <small>#CMP-00{index + 1}</small>
                            </span>
                          </td>
                          <td>
                            <span className={`admin-type-pill ${campaign.type.toLowerCase()}`}>
                              {campaign.type}
                            </span>
                          </td>
                          <td>{campaign.advertiser}</td>
                          <td>{campaign.budget}</td>
                          <td>
                            <span className="admin-progress-label">{campaign.performance}</span>
                            <span className="admin-progress">
                              <i style={{ width: `${campaign.progress}%` }} />
                            </span>
                          </td>
                          <td>
                            <span
                              className={`admin-status ${campaign.status === "Aktif" ? "is-active" : "is-paused"}`}
                            >
                              {campaign.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="admin-table-action"
                              onClick={() => {
                                showList("advertisers");
                                setSearch(campaign.advertiser);
                                setManagedAccount(campaign.name);
                              }}
                              type="button"
                            >
                              Kelola
                            </button>
                          </td>
                        </tr>
                      ))}
                      {visibleCampaigns.length === 0 && (
                        <tr>
                          <td className="admin-empty-row" colSpan={7}>
                            Campaign tidak ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <AdminAccountTable list={activeList} search={search} onManage={setManagedAccount} />
              )}
            </section>
          </div>

          <aside className="admin-secondary-column">
            <section className="admin-date-card">
              <span>
                <IconCalendar size={14} />
              </span>
              <div>
                <b>28 Sep 2026</b>
                <small>Terakhir diperbarui 15:42</small>
              </div>
            </section>
            <section className="admin-panel admin-status-panel" id="admin-system-status">
              <div className="admin-panel-heading">
                <h2>Status Sistem</h2>
                <span className="admin-system-pill">
                  <i /> Semua Sistem Normal
                </span>
              </div>
              {systemStatus.map(({ label, detail, icon: Icon }) => (
                <div className="admin-system-row" key={label}>
                  <span>
                    <i />
                    <Icon size={12} />
                  </span>
                  <b>{label}</b>
                  <small>{detail}</small>
                </div>
              ))}
            </section>
            <section className="admin-panel admin-quick-panel" id="admin-quick-actions">
              <div className="admin-panel-heading">
                <h2>Quick Actions</h2>
              </div>
              <button
                onClick={() => {
                  openAdvertiserManagement("advertisers");
                }}
                type="button"
              >
                <span>
                  <IconSpeakerphone size={15} />
                </span>
                <b>
                  Kelola Advertiser<small>Akun, campaign, supply, dan review</small>
                </b>
                <IconChevronRight size={13} />
              </button>
              <button
                onClick={() => openPublisherManagement("publishers")}
                type="button"
              >
                <span>
                  <IconUserCheck size={15} />
                </span>
                <b>
                  Kelola Publisher<small>Review akun, offer, dan penarikan</small>
                </b>
                <IconChevronRight size={13} />
              </button>
              <button onClick={() => openAdvertiserManagement("campaigns")} type="button">
                <span>
                  <IconTargetArrow size={15} />
                </span>
                <b>
                  Buat Campaign<small>Buat campaign baru</small>
                </b>
                <IconChevronRight size={13} />
              </button>
              <button onClick={() => showList("campaigns")} type="button">
                <span>
                  <IconGift size={15} />
                </span>
                <b>
                  Kelola Offerwall<small>Atur offerwall &amp; provider</small>
                </b>
                <IconChevronRight size={13} />
              </button>
            </section>
            <section className="admin-panel admin-activity-panel" id="admin-activity">
              <div className="admin-panel-heading">
                <h2>Aktivitas Terbaru</h2>
                <button onClick={() => setShowAllActivities((current) => !current)} type="button">
                  {showAllActivities ? "Ringkas" : "Lihat Semua"} <IconArrowRight size={11} />
                </button>
              </div>
              {activities.map(({ title, detail, time, tone, icon: Icon }) => (
                <article className="admin-activity-row" key={title}>
                  <span className={tone}>
                    <Icon size={14} />
                  </span>
                  <div>
                    <b>{title}</b>
                    <small>{detail}</small>
                  </div>
                  <time>{time}</time>
                </article>
              ))}
            </section>
          </aside>
          </div>
        )}
        <footer className="admin-footer">
          <span>Nevora — Business Bridge for Digital Growth</span>
          <span>
            <a href="#admin-settings">Bantuan</a>
            <a href="#admin-settings">Kebijakan Privasi</a>
            <a href="#admin-settings">Syarat &amp; Ketentuan</a>
          </span>
        </footer>
      </main>
    </div>
  );
}
