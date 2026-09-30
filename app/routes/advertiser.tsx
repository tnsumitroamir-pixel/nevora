import { signOut } from "@agent-native/core/client";
import { appPath } from "@agent-native/core/client/api-path";
import {
  actionErrorMessage,
  useActionMutation,
  useActionQuery,
  useSession,
} from "@agent-native/core/client/hooks";
import {
  IconAd,
  IconArrowRight,
  IconBell,
  IconBuildingStore,
  IconCalendar,
  IconChartBar,
  IconChartLine,
  IconChevronDown,
  IconCircleCheck,
  IconClick,
  IconCoins,
  IconDeviceAnalytics,
  IconGauge,
  IconHome,
  IconPlus,
  IconSearch,
  IconSettings,
  IconSpeakerphone,
  IconTargetArrow,
  IconWallet,
} from "@tabler/icons-react";
import { useState, type FormEvent } from "react";

import { AdvertiserCatalog } from "@/components/AdvertiserCatalog";
import {
  RoleNavigation,
  type RoleNavigationSection,
} from "@/components/RoleNavigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function meta() {
  return [
    { title: "Dashboard Advertiser — Nevora" },
    {
      name: "description",
      content:
        "Pantau campaign, anggaran, dan performa akun advertiser Nevora.",
    },
  ];
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatRupiah(value: number | null) {
  if (value === null) return "—";
  return `Rp ${formatNumber(value)}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

function buildPoints(values: number[]) {
  if (values.length === 0) return "";
  const max = Math.max(...values, 1);
  const width = 680;
  const height = 178;
  const step = values.length > 1 ? width / (values.length - 1) : 0;
  return values
    .map((value, index) => {
      const x = values.length === 1 ? width / 2 : index * step;
      const y = height - (value / max) * (height - 16) - 8;
      return `${x},${y}`;
    })
    .join(" ");
}

function MetricCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof IconCoins;
  tone: string;
}) {
  return (
    <article className="ad-metric-card">
      <div className={`ad-metric-icon ${tone}`}>
        <Icon size={18} stroke={2} />
      </div>
      <span className="ad-metric-label">{label}</span>
      <strong>{value}</strong>
      <span className="ad-metric-period">7 hari terakhir</span>
    </article>
  );
}

function DashboardLoading() {
  return (
    <div className="advertiser-app">
      <div className="ad-sidebar ad-sidebar-loading" />
      <main className="ad-main">
        <div className="ad-topbar ad-skeleton" />
        <div className="ad-loading-heading ad-skeleton" />
        <div className="ad-metric-grid">
          {[0, 1, 2, 3].map((item) => (
            <div className="ad-loading-card ad-skeleton" key={item} />
          ))}
        </div>
        <div className="ad-loading-chart ad-skeleton" />
      </main>
    </div>
  );
}

function CreateCampaignDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [notice, setNotice] = useState("");
  const createCampaign = useActionMutation("create-campaign");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setNotice("");
    try {
      await createCampaign.mutateAsync({
        name: String(values.get("name") || "").trim(),
        objective: String(values.get("objective") || "Install") as
          | "Install"
          | "Purchase"
          | "View"
          | "Lead",
        budgetIdr: Number(values.get("budgetIdr")),
      });
      onOpenChange(false);
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Campaign belum dapat dibuat.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="ad-dialog-content">
        <div className="ad-dialog-heading">
          <DialogTitle>Buat Campaign</DialogTitle>
          <DialogDescription>
            Campaign akan disimpan sebagai draft.
          </DialogDescription>
        </div>
        <form className="ad-campaign-form" onSubmit={handleSubmit}>
          <label>
            Nama campaign
            <input name="name" maxLength={120} required />
          </label>
          <label>
            Tujuan
            <select name="objective" defaultValue="Install">
              <option value="Install">Install</option>
              <option value="Purchase">Purchase</option>
              <option value="View">View</option>
              <option value="Lead">Lead</option>
            </select>
          </label>
          <label>
            Anggaran (IDR)
            <input name="budgetIdr" type="number" min="1" step="1" required />
          </label>
          {notice && (
            <p className="ad-form-error" role="alert">
              {notice}
            </p>
          )}
          <button
            className="ad-button ad-button-primary"
            disabled={createCampaign.isPending}
            type="submit"
          >
            {createCampaign.isPending ? "Menyimpan…" : "Simpan Draft"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CampaignDetailsDialog({
  campaign,
  onClose,
}: {
  campaign: Record<string, unknown> | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={campaign !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="ad-dialog-content">
        {campaign && (
          <>
            <div className="ad-dialog-heading">
              <DialogTitle>{String(campaign.name)}</DialogTitle>
              <DialogDescription>
                Ringkasan campaign dari database.
              </DialogDescription>
            </div>
            <dl className="ad-detail-list">
              <div>
                <dt>Tujuan</dt>
                <dd>{String(campaign.objective)}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{String(campaign.status)}</dd>
              </div>
              <div>
                <dt>Anggaran</dt>
                <dd>{formatRupiah(Number(campaign.budgetIdr))}</dd>
              </div>
              <div>
                <dt>Biaya tersalurkan</dt>
                <dd>{formatRupiah(Number(campaign.spentIdr))}</dd>
              </div>
              <div>
                <dt>Klik (7 hari)</dt>
                <dd>{formatNumber(Number(campaign.clicks))}</dd>
              </div>
              <div>
                <dt>Konversi (7 hari)</dt>
                <dd>{formatNumber(Number(campaign.conversions))}</dd>
              </div>
            </dl>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AdvertiserProfileSetup({
  initialName,
  onSaved,
}: {
  initialName: string;
  onSaved: () => void;
}) {
  const [notice, setNotice] = useState("");
  const saveProfile = useActionMutation("save-advertiser-profile");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setNotice("");
    try {
      await saveProfile.mutateAsync({
        fullName: String(values.get("fullName") || "").trim(),
        businessName: String(values.get("businessName") || "").trim(),
        phone: String(values.get("phone") || "").trim(),
        role: "Advertiser",
      });
      onSaved();
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Profil belum dapat disimpan.");
    }
  };

  return (
    <main className="ad-setup-shell">
      <form className="ad-setup-card" onSubmit={handleSubmit}>
        <span className="ad-setup-icon">
          <IconBuildingStore size={23} />
        </span>
        <h1>Siapkan akun Advertiser</h1>
        <p>Lengkapi profil bisnis sebelum melihat dashboard campaign.</p>
        <label>
          Nama lengkap
          <input
            name="fullName"
            defaultValue={initialName}
            maxLength={120}
            required
          />
        </label>
        <label>
          Nama perusahaan
          <input name="businessName" maxLength={160} required />
        </label>
        <label>
          Nomor telepon
          <input
            name="phone"
            type="tel"
            minLength={7}
            maxLength={24}
            required
          />
        </label>
        {notice && (
          <p className="ad-form-error" role="alert">
            {notice}
          </p>
        )}
        <button
          className="ad-button ad-button-primary"
          type="submit"
          disabled={saveProfile.isPending}
        >
          {saveProfile.isPending ? "Menyimpan…" : "Lanjut ke dashboard"}
          {!saveProfile.isPending && <IconArrowRight size={16} />}
        </button>
      </form>
    </main>
  );
}

function AdvertiserSignInPrompt({
  unavailable,
  onRetry,
}: {
  unavailable: boolean;
  onRetry: () => void;
}) {
  return (
    <main className="ad-setup-shell">
      <section className="ad-setup-card">
        <span className="ad-setup-icon">
          <IconAd size={23} />
        </span>
        <h1>
          {unavailable ? "Sesi belum dapat diverifikasi" : "Masuk ke Nevora"}
        </h1>
        <p>
          {unavailable
            ? "Coba periksa koneksi dan verifikasi sesi kembali."
            : "Dashboard campaign hanya tersedia untuk advertiser yang masuk."}
        </p>
        {unavailable ? (
          <button
            className="ad-button ad-button-primary"
            onClick={onRetry}
            type="button"
          >
            Coba lagi
          </button>
        ) : (
          <a className="ad-button ad-button-primary" href={appPath("/")}>
            Kembali ke login Nevora
          </a>
        )}
      </section>
    </main>
  );
}

export default function AdvertiserDashboardRoute() {
  const session = useSession();
  const { data, isLoading, error, refetch } = useActionQuery(
    "get-advertiser-dashboard",
    {},
    { enabled: session.status === "authenticated" },
  );
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [search, setSearch] = useState("");
  const [navigationPreview, setNavigationPreview] = useState("");
  const [catalogTab, setCatalogTab] = useState<"products" | "offers" | null>(null);
  const [catalogCreate, setCatalogCreate] = useState<"product" | null>(null);
  const [campaignStatusFilter, setCampaignStatusFilter] = useState("all");

  if (session.status === "loading" || session.status === "signing-out") {
    return <DashboardLoading />;
  }

  if (
    session.status === "unauthenticated" ||
    session.status === "unavailable"
  ) {
    return (
      <AdvertiserSignInPrompt
        unavailable={session.status === "unavailable"}
        onRetry={session.retry}
      />
    );
  }

  if (isLoading) return <DashboardLoading />;

  if (error || !data) {
    return (
      <main className="ad-error-shell">
        <h1>Dashboard belum dapat dimuat</h1>
        <p>{actionErrorMessage(error) ?? "Periksa koneksi lalu coba lagi."}</p>
        <button
          className="ad-button ad-button-primary"
          onClick={() => refetch()}
          type="button"
        >
          Coba lagi
        </button>
      </main>
    );
  }

  if (data.profile?.role !== "Advertiser") {
    return (
      <AdvertiserProfileSetup
        initialName={data.profile?.fullName ?? ""}
        onSaved={() => void refetch()}
      />
    );
  }

  if (data.summary === null) {
    return (
      <main className="ad-error-shell">
        <h1>Ringkasan belum tersedia</h1>
        <button
          className="ad-button ad-button-primary"
          onClick={() => refetch()}
          type="button"
        >
          Coba lagi
        </button>
      </main>
    );
  }

  const visibleCampaigns = data.campaigns.filter((campaign) => {
    const status = campaign.status.toLocaleLowerCase("id-ID");
    const query = search.trim().toLocaleLowerCase("id-ID");
    const matchesSearch = campaign.name
      .toLocaleLowerCase("id-ID")
      .includes(query);
    const matchesStatus =
      campaignStatusFilter === "all" ||
      (campaignStatusFilter === "draft" && status.includes("draft")) ||
      (campaignStatusFilter === "active" &&
        (status.includes("aktif") || status.includes("active"))) ||
      (campaignStatusFilter === "pending" &&
        (status.includes("pending") || status.includes("review"))) ||
      (campaignStatusFilter === "completed" &&
        (status.includes("selesai") || status.includes("complete"))) ||
      (campaignStatusFilter === "rejected" &&
        (status.includes("tolak") ||
          status.includes("reject") ||
          status.includes("nonaktif") ||
          status.includes("inactive") ||
          status.includes("disabled")));
    return matchesSearch && matchesStatus;
  });
  const daily = data.dailyPerformance;
  const totals = daily.reduce(
    (total, row) => ({
      clicks: total.clicks + row.clicks,
      conversions: total.conversions + row.conversions,
      spendIdr: total.spendIdr + row.spendIdr,
    }),
    { clicks: 0, conversions: 0, spendIdr: 0 },
  );
  const advertiserNavigation: RoleNavigationSection[] = [
    {
      id: "campaigns",
      label: "Campaign",
      icon: IconSpeakerphone,
      items: [
        {
          label: "Semua Campaign",
          href: "#campaigns",
          onSelect: () => setCampaignStatusFilter("all"),
        },
        {
          label: "Buat Campaign",
          onSelect: () => setCampaignDialogOpen(true),
        },
        {
          label: "Draft",
          href: "#campaigns",
          onSelect: () => setCampaignStatusFilter("draft"),
        },
        {
          label: "Aktif",
          href: "#campaigns",
          onSelect: () => setCampaignStatusFilter("active"),
        },
        {
          label: "Pending Review",
          href: "#campaigns",
          onSelect: () => setCampaignStatusFilter("pending"),
        },
        {
          label: "Selesai",
          href: "#campaigns",
          onSelect: () => setCampaignStatusFilter("completed"),
        },
        {
          label: "Ditolak / Dinonaktifkan",
          href: "#campaigns",
          onSelect: () => setCampaignStatusFilter("rejected"),
        },
      ],
    },
    {
      id: "products",
      label: "Produk & Offer",
      icon: IconAd,
      items: [
        {
          label: "Semua Produk",
          onSelect: () => {
            setCatalogTab("products");
            setCatalogCreate(null);
            setNavigationPreview("");
          },
        },
        {
          label: "Tambah Produk",
          onSelect: () => {
            setCatalogTab("products");
            setCatalogCreate("product");
            setNavigationPreview("");
          },
        },
        {
          label: "Offer",
          onSelect: () => {
            setCatalogTab("offers");
            setCatalogCreate(null);
            setNavigationPreview("");
          },
        },
        {
          label: "Landing Page / Link",
          onSelect: () => setNavigationPreview("Landing Page / Link"),
        },
        { label: "Creative", onSelect: () => setNavigationPreview("Creative") },
      ],
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: IconBuildingStore,
      items: [
        {
          label: "Publisher",
          onSelect: () => setNavigationPreview("Publisher Marketplace"),
        },
        {
          label: "Publisher yang Dipilih",
          onSelect: () => setNavigationPreview("Publisher yang Dipilih"),
        },
        {
          label: "Campaign Terbuka",
          href: "#campaigns",
          onSelect: () => setCampaignStatusFilter("active"),
        },
        {
          label: "Private Campaign",
          onSelect: () => setNavigationPreview("Private Campaign"),
        },
        {
          label: "Direct Deal",
          onSelect: () => setNavigationPreview("Direct Deal"),
        },
      ],
    },
    {
      id: "tracking",
      label: "Tracking",
      icon: IconTargetArrow,
      items: [
        "Click",
        "Conversion",
        "Attribution",
        "Postback",
        "Tracking Test",
      ].map((label) => ({ label, href: "#performance" })),
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: IconChartLine,
      items: [
        "Overview",
        "Traffic",
        "Conversion",
        "Cost",
        "ROI / ROAS",
        "Publisher Performance",
      ].map((label) => ({ label, href: "#performance" })),
    },
    {
      id: "finance",
      label: "Keuangan",
      icon: IconWallet,
      items: [
        "Saldo Campaign",
        "Deposit",
        "Transaksi",
        "Invoice",
        "Billing",
      ].map((label) => ({ label, href: "#wallet" })),
    },
    {
      id: "integrations",
      label: "Integrasi",
      icon: IconDeviceAnalytics,
      items: ["API", "Webhook / Postback", "SDK", "Integrasi Provider"].map(
        (label) => ({ label, onSelect: () => setNavigationPreview(label) }),
      ),
    },
    {
      id: "settings",
      label: "Pengaturan",
      icon: IconSettings,
      items: [
        "Profil Bisnis",
        "Role & Bisnis",
        "Tim & Akses",
        "Verifikasi",
        "Notifikasi",
        "Keamanan",
      ].map((label) => ({
        label,
        onSelect: () => setNavigationPreview(label),
      })),
    },
  ];

  return (
    <div className="advertiser-app">
      <aside className="ad-sidebar">
        <a className="ad-brand" href={appPath("/")}>
          <span>N</span> Nevora
        </a>
        <div className="ad-sidebar-role">
          <IconAd size={16} />
          <span>Advertiser</span>
        </div>
        <RoleNavigation
          role="advertiser"
          dashboardHref="#dashboard"
          dashboardIcon={IconHome}
          sections={advertiserNavigation}
          onPreview={setNavigationPreview}
        />
        {navigationPreview && (
          <div className="role-navigation-preview" role="status">
            {navigationPreview} · pratinjau
          </div>
        )}
        <div className="ad-sidebar-footer">
          <span>{data.profile.businessName}</span>
          <small>Dashboard Advertiser</small>
        </div>
      </aside>

      <main className="ad-main" id="dashboard">
        <header className="ad-topbar">
          <label className="ad-search">
            <IconSearch size={16} />
            <input
              aria-label="Cari campaign"
              placeholder="Cari campaign..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="ad-topbar-user">
            <span className="ad-icon-button" aria-hidden="true">
              <IconBell size={18} />
            </span>
            <span className="ad-user-avatar">
              {data.profile.fullName.slice(0, 1).toUpperCase()}
            </span>
            <span className="ad-user-caption">
              <b>{data.profile.businessName}</b>
              <small>{data.profile.role}</small>
            </span>
            <button
              className="ad-sign-out"
              onClick={() => void signOut()}
              type="button"
            >
              Keluar
            </button>
          </div>
        </header>

        {catalogTab ? (
          <AdvertiserCatalog
            initialTab={catalogTab}
            startWithCreate={catalogCreate}
            onBack={() => {
              setCatalogTab(null);
              setCatalogCreate(null);
            }}
          />
        ) : (
          <div className="ad-dashboard-layout">
          <div className="ad-primary-column">
            <section className="ad-welcome">
              <div>
                <span className="ad-kicker">Selamat datang kembali,</span>
                <h1>{data.profile.businessName}</h1>
                <p>Kelola campaign dan pantau performa iklan Anda.</p>
              </div>
              <div className="ad-welcome-art" aria-hidden="true">
                <IconTargetArrow size={57} stroke={1.5} />
                <IconChartBar size={35} />
              </div>
            </section>

            <section
              className="ad-metric-grid"
              aria-label="Ringkasan performa tujuh hari"
            >
              <MetricCard
                label="Total Budget"
                value={formatRupiah(data.summary.allocatedBudgetIdr)}
                icon={IconCoins}
                tone="blue"
              />
              <MetricCard
                label="Total Click"
                value={formatNumber(data.summary.clicks)}
                icon={IconClick}
                tone="violet"
              />
              <MetricCard
                label="Total Conversion"
                value={formatNumber(data.summary.conversions)}
                icon={IconDeviceAnalytics}
                tone="green"
              />
              <MetricCard
                label="Total Biaya"
                value={formatRupiah(data.summary.spendIdr)}
                icon={IconChartBar}
                tone="orange"
              />
            </section>

            <section className="ad-panel ad-performance-panel" id="performance">
              <div className="ad-panel-heading">
                <h2>Performa Campaign</h2>
                <span className="ad-date-range">
                  <IconCalendar size={14} /> 7 hari terakhir{" "}
                  <IconChevronDown size={14} />
                </span>
              </div>
              {daily.length > 0 ? (
                <div className="ad-chart-layout">
                  <div className="ad-chart-wrap">
                    <div className="ad-chart-y-labels">
                      <span>Maks.</span>
                      <span>50%</span>
                      <span>Min.</span>
                    </div>
                    <svg
                      className="ad-chart"
                      viewBox="0 0 680 178"
                      preserveAspectRatio="none"
                      role="img"
                      aria-label="Grafik campaign dari catatan performa database"
                    >
                      <line x1="0" y1="8" x2="680" y2="8" />
                      <line x1="0" y1="53" x2="680" y2="53" />
                      <line x1="0" y1="98" x2="680" y2="98" />
                      <line x1="0" y1="143" x2="680" y2="143" />
                      <polyline
                        className="ad-chart-spend"
                        points={buildPoints(daily.map((row) => row.spendIdr))}
                      />
                      <polyline
                        className="ad-chart-clicks"
                        points={buildPoints(daily.map((row) => row.clicks))}
                      />
                      <polyline
                        className="ad-chart-conversions"
                        points={buildPoints(
                          daily.map((row) => row.conversions),
                        )}
                      />
                    </svg>
                    <div className="ad-chart-x-labels">
                      {daily.map((row) => (
                        <span key={row.date}>{formatDate(row.date)}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ad-chart-legend">
                    <div>
                      <span className="legend-dot clicks" /> <span>Klik</span>
                      <b>{formatNumber(totals.clicks)}</b>
                    </div>
                    <div>
                      <span className="legend-dot conversions" />{" "}
                      <span>Konversi</span>
                      <b>{formatNumber(totals.conversions)}</b>
                    </div>
                    <div>
                      <span className="legend-dot spend" /> <span>Biaya</span>
                      <b>{formatRupiah(totals.spendIdr)}</b>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ad-empty-chart">
                  <span>
                    <IconChartLine size={22} />
                  </span>
                  <p>Belum ada catatan performa untuk tujuh hari terakhir.</p>
                </div>
              )}
            </section>

            <section className="ad-panel ad-campaigns-panel" id="campaigns">
              <div className="ad-panel-heading">
                <h2>Campaign Terbaru</h2>
                <span className="ad-result-count">
                  {formatNumber(data.summary.campaignCount)} campaign
                </span>
              </div>
              {visibleCampaigns.length > 0 ? (
                <div className="ad-table-wrap">
                  <table className="ad-campaign-table">
                    <thead>
                      <tr>
                        <th>Nama Campaign</th>
                        <th>Tujuan</th>
                        <th>Anggaran</th>
                        <th>Performa (7 hari)</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleCampaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td>
                            <div className="ad-campaign-name">
                              <span className="ad-campaign-mark">
                                <IconSpeakerphone size={14} />
                              </span>
                              <span>
                                <b>{campaign.name}</b>
                                <small>{campaign.id.slice(0, 8)}</small>
                              </span>
                            </div>
                          </td>
                          <td>{campaign.objective}</td>
                          <td>{formatRupiah(campaign.budgetIdr)}</td>
                          <td>
                            <div className="ad-performance-cell">
                              <b>{formatNumber(campaign.clicks)} klik</b>
                              <span>
                                <i
                                  style={{
                                    width: `${Math.min(campaign.budgetUsedPercent, 100)}%`,
                                  }}
                                />
                              </span>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`ad-status ${campaign.status.toLowerCase()}`}
                            >
                              <i />
                              {campaign.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="ad-table-action"
                              type="button"
                              onClick={() => setSelectedCampaign(campaign)}
                            >
                              Lihat
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="ad-empty-campaigns">
                  <span>
                    <IconSpeakerphone size={21} />
                  </span>
                  <div>
                    <b>
                      {data.campaigns.length === 0
                        ? "Belum ada campaign"
                        : "Campaign tidak ditemukan"}
                    </b>
                    <p>
                      {data.campaigns.length === 0
                        ? "Buat campaign untuk mulai mencatat anggaran dan performa."
                        : "Coba kata kunci lain."}
                    </p>
                  </div>
                  {data.campaigns.length === 0 && (
                    <button
                      className="ad-button ad-button-primary"
                      type="button"
                      onClick={() => setCampaignDialogOpen(true)}
                    >
                      <IconPlus size={15} /> Buat Campaign
                    </button>
                  )}
                </div>
              )}
            </section>
          </div>

          <aside className="ad-secondary-column">
            <section className="ad-new-campaign-card">
              <div>
                <h2>Mulai Campaign Baru</h2>
                <p>Atur anggaran dan tujuan campaign Anda.</p>
                <button
                  className="ad-button ad-button-light"
                  type="button"
                  onClick={() => setCampaignDialogOpen(true)}
                >
                  Buat Campaign <IconArrowRight size={14} />
                </button>
              </div>
              <span aria-hidden="true">
                <IconTargetArrow size={38} />
              </span>
            </section>

            <section className="ad-panel ad-quick-actions">
              <h2>Quick Actions</h2>
              <button type="button" onClick={() => setCampaignDialogOpen(true)}>
                <span>
                  <IconPlus size={16} />
                </span>
                <b>
                  Buat Campaign<small>Tambah campaign baru</small>
                </b>
                <IconArrowRight size={14} />
              </button>
              <a href="#campaigns">
                <span>
                  <IconSpeakerphone size={16} />
                </span>
                <b>
                  Lihat Kampanye<small>Pantau campaign terbaru</small>
                </b>
                <IconArrowRight size={14} />
              </a>
              <a href="#performance">
                <span>
                  <IconChartLine size={16} />
                </span>
                <b>
                  Lihat Laporan<small>Performa tujuh hari terakhir</small>
                </b>
                <IconArrowRight size={14} />
              </a>
            </section>

            <section className="ad-panel ad-wallet-card" id="wallet">
              <div className="ad-panel-heading">
                <h2>Saldo Advertiser</h2>
                <IconWallet size={17} />
              </div>
              <strong>{formatRupiah(data.walletBalanceIdr)}</strong>
              <span
                className={
                  data.walletBalanceIdr === null
                    ? "ad-wallet-unavailable"
                    : "ad-wallet-available"
                }
              >
                {data.walletBalanceIdr === null ? (
                  "Belum ada saldo tercatat"
                ) : (
                  <>
                    <IconCircleCheck size={13} /> Saldo dari database
                  </>
                )}
              </span>
            </section>

            <section className="ad-panel ad-budget-card">
              <div className="ad-panel-heading">
                <h2>Sisa Anggaran Campaign</h2>
                <IconGauge size={17} />
              </div>
              <strong>{formatRupiah(data.summary.remainingBudgetIdr)}</strong>
              <small>
                Dihitung dari anggaran campaign dikurangi biaya yang tercatat.
              </small>
            </section>

            <section className="ad-panel ad-profile-card" id="profile">
              <div className="ad-panel-heading">
                <h2>Profil Bisnis</h2>
                <IconBuildingStore size={16} />
              </div>
              <b>{data.profile.businessName}</b>
              <span>{data.profile.fullName}</span>
              <button
                type="button"
                onClick={() => window.location.assign(appPath("/"))}
              >
                Kembali ke Nevora
              </button>
            </section>
          </aside>
          </div>
        )}
      </main>
      <CreateCampaignDialog
        open={campaignDialogOpen}
        onOpenChange={setCampaignDialogOpen}
      />
      <CampaignDetailsDialog
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </div>
  );
}
