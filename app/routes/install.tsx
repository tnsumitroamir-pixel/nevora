import { appPath } from "@agent-native/core/client/api-path";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconCircleCheck,
  IconDatabase,
  IconEye,
  IconEyeOff,
  IconGlobe,
  IconLock,
  IconRocket,
  IconShieldCheck,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import "../components/installer.css";

type DatabaseConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};

type InstallerStatus = {
  installed?: boolean;
  localAccess?: boolean;
  databaseConfigured?: boolean;
  databaseConnected?: boolean;
  nodeVersion?: string;
};

const steps = [
  { label: "Selamat Datang", detail: "Persiapan instalasi", icon: IconRocket },
  { label: "Database", detail: "Koneksi database MySQL", icon: IconDatabase },
  { label: "Aplikasi", detail: "Pengaturan sistem", icon: IconGlobe },
  { label: "Admin", detail: "Akun administrator", icon: IconUser },
  { label: "Instalasi", detail: "Verifikasi sistem", icon: IconShieldCheck },
  { label: "Selesai", detail: "Nevora siap digunakan", icon: IconCircleCheck },
];

const emptyDatabase: DatabaseConfig = {
  host: "127.0.0.1",
  port: 3306,
  database: "nevora_db",
  user: "root",
  password: "",
};

function supportsRequiredNodeVersion(version?: string) {
  const [major = 0, minor = 0] = (version ?? "").split(".").map(Number);
  return major > 22 || (major === 22 && minor >= 22);
}

async function readResponse(response: Response) {
  return (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
    serverVersion?: string;
    installed?: boolean;
    localAccess?: boolean;
    databaseConnected?: boolean;
    nodeVersion?: string;
    email?: string;
  } | null;
}

async function authenticateAdministrator(email: string, password: string) {
  const body = JSON.stringify({ email, password });
  const registerResponse = await fetch(appPath("/_agent-native/auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const registration = await readResponse(registerResponse);

  if (!registerResponse.ok || !registration?.ok) {
    const loginResponse = await fetch(appPath("/_agent-native/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const login = await readResponse(loginResponse);
    if (!loginResponse.ok || !login?.ok) {
      throw new Error(login?.error || registration?.error || "Akun Admin belum dapat dibuat.");
    }
  } else {
    const loginResponse = await fetch(appPath("/_agent-native/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const login = await readResponse(loginResponse);
    if (!loginResponse.ok || !login?.ok) {
      throw new Error(login?.error || "Login Administrator belum berhasil.");
    }
  }

  const sessionResponse = await fetch(appPath("/_agent-native/auth/session"));
  const session = (await sessionResponse.json().catch(() => null)) as {
    email?: string;
  } | null;
  if (!sessionResponse.ok || session?.email?.toLowerCase() !== email.trim().toLowerCase()) {
    throw new Error("Sesi Administrator belum dapat diverifikasi.");
  }
}

export function meta() {
  return [
    { title: "Instalasi Awal Nevora" },
    {
      name: "description",
      content: "Siapkan database, konfigurasi, dan akun Administrator Nevora.",
    },
  ];
}

export default function InstallRoute() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<InstallerStatus | null>(null);
  const [database, setDatabase] = useState(emptyDatabase);
  const [applicationName, setApplicationName] = useState("Nevora");
  const [timezone, setTimezone] = useState("Asia/Jakarta");
  const [currency, setCurrency] = useState("IDR");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [databaseResult, setDatabaseResult] = useState("");
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    fetch(appPath("/api/installer/status"))
      .then(readResponse)
      .then((result) => {
        if (!active || !result) return;
        setStatus(result);
        if (result.installed) setStep(5);
        if (result.localAccess === false) {
          setNotice(
            "Untuk keamanan, installer hanya bisa dijalankan dari localhost komputer Anda.",
          );
        }
      })
      .catch(() => {
        if (active) setStatus({ databaseConnected: false });
      });
    return () => {
      active = false;
    };
  }, []);

  const updateDatabase = (field: keyof DatabaseConfig, value: string) => {
    setDatabase((current) => ({
      ...current,
      [field]: field === "port" ? Number(value) : value,
    }));
    setDatabaseConnected(false);
    setDatabaseResult("");
  };

  const testDatabase = async () => {
    setPending(true);
    setNotice("");
    setDatabaseResult("");
    setDatabaseConnected(false);
    try {
      const response = await fetch(appPath("/api/installer/test-database"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(database),
      });
      const result = await readResponse(response);
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Koneksi database belum berhasil.");
      }
      setDatabaseConnected(true);
      setDatabaseResult(`Koneksi berhasil · ${result.serverVersion}`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Koneksi database gagal.");
    } finally {
      setPending(false);
    }
  };

  const createAdministrator = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setNotice("");
    try {
      await authenticateAdministrator(email, password);
      setStep(4);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Akun Admin belum dapat dibuat.");
    } finally {
      setPending(false);
    }
  };

  const install = async () => {
    setPending(true);
    setNotice("");
    try {
      const response = await fetch(appPath("/api/installer/install"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          database,
          application: { name: applicationName, timezone, currency },
          administrator: { fullName, email },
        }),
      });
      const result = await readResponse(response);
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Instalasi belum selesai.");
      }
      setStep(5);
      setStatus({ installed: true, databaseConnected: true });
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Instalasi belum selesai.");
    } finally {
      setPending(false);
    }
  };

  const next = () => {
    setNotice("");
    setStep((current) => Math.min(current + 1, 5));
  };

  if (status?.installed) {
    return (
      <main className="installer-page">
        <aside className="installer-sidebar">
          <Brand />
          <p className="installer-sidebar-quote">
            “Nevora — Menghubungkan Advertiser, Publisher dan User dalam satu ekosistem.”
          </p>
          <span className="installer-sidebar-version">Nevora v1.0.0</span>
        </aside>
        <section className="installer-main">
          <div className="installer-complete-card">
            <span className="installer-success-mark">
              <IconCircleCheck size={32} />
            </span>
            <h1>Nevora sudah terinstal</h1>
            <p>Database dan akun administrator sudah disiapkan.</p>
            <a className="installer-primary-button" href={appPath("/admin-login")}>
              Masuk sebagai Admin <IconArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>
    );
  }

  const nodeVersionSupported = supportsRequiredNodeVersion(status?.nodeVersion);
  const ready = status !== null && nodeVersionSupported;
  const activeStep = steps[step];
  const StepIcon = activeStep.icon;

  return (
    <main className="installer-page">
      <aside className="installer-sidebar">
        <Brand />
        <nav className="installer-side-steps" aria-label="Langkah instalasi">
          {steps.map(({ label, detail, icon: Icon }, index) => (
            <button
              aria-current={step === index ? "step" : undefined}
              className={`installer-side-step${step === index ? " is-active" : ""}${step > index ? " is-complete" : ""}`}
              disabled={step === 5}
              key={label}
              onClick={() => {
                if (index < step) setStep(index);
              }}
              type="button"
            >
              <span className="installer-step-number">
                {step > index ? <IconCheck size={15} /> : index + 1}
              </span>
              <span className="installer-step-copy">
                <b>{label}</b>
                <small>{detail}</small>
              </span>
              {index === step && <Icon size={17} />}
            </button>
          ))}
        </nav>
        <div className="installer-sidebar-art" aria-hidden="true">
          <div className="installer-art-glow" />
          <div className="installer-art-screen">
            <span />
            <span />
            <span />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="installer-art-base" />
          <span className="installer-art-gear">
            <IconBolt size={23} />
          </span>
        </div>
        <p className="installer-sidebar-quote">
          “Nevora — Menghubungkan Advertiser, Publisher dan User dalam satu ekosistem.”
        </p>
        <span className="installer-sidebar-version">
          Nevora v1.0.0 <small>© 2026 Nevora. All rights reserved.</small>
        </span>
      </aside>

      <section className="installer-main">
        <header className="installer-header">
          <div>
            <span className="installer-overline">NEVORA · PANDUAN SETUP</span>
            <h1>Instalasi Awal Nevora</h1>
            <p>
              Selamat datang di proses instalasi Nevora. Ikuti langkah-langkah berikut untuk
              mengonfigurasi sistem sesuai kebutuhan Anda.
            </p>
          </div>
          <span className="installer-language">
            <IconGlobe size={15} /> Bahasa Indonesia <span>⌄</span>
          </span>
        </header>

        <div className="installer-progress" aria-label={`Langkah ${step + 1} dari ${steps.length}`}>
          {steps.map(({ label }, index) => (
            <div
              className={`installer-progress-step${index <= step ? " is-active" : ""}`}
              key={label}
            >
              <span>{index < step ? <IconCheck size={14} /> : index + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <div className="installer-content">
          {step === 0 && (
            <>
              <section className="installer-system-card">
                <span className="installer-card-icon installer-card-icon-blue">
                  <IconRocket size={23} />
                </span>
                <div className="installer-system-copy">
                  <h2>Persiapan Sistem</h2>
                  <p>Pastikan lingkungan lokal siap sebelum melanjutkan instalasi Nevora.</p>
                </div>
                <div className="installer-checks">
                  <ReadinessRow
                    label="Node.js Runtime"
                    value={
                      status?.nodeVersion
                        ? nodeVersionSupported
                          ? `v${status.nodeVersion}`
                          : `v${status.nodeVersion} · perlu 22.22+`
                        : "Memeriksa…"
                    }
                    ready={nodeVersionSupported}
                  />
                  <ReadinessRow
                    label="MySQL / MariaDB"
                    value={databaseConnected ? "Terhubung" : "Diuji pada langkah Database"}
                    ready={databaseConnected}
                  />
                  <ReadinessRow
                    label="Data dan tabel Nevora"
                    value="Dibuat saat instalasi"
                    ready={false}
                  />
                </div>
              </section>
              {status === null ? (
                <section className="installer-info-card">
                  <span className="installer-spinner" /> Memeriksa status instalasi dan database…
                </section>
              ) : status.localAccess === false ? (
                <section className="installer-info-card installer-location-warning">
                  <IconLock size={18} />
                  <span>
                    Installer dibatasi ke localhost. Jalankan Nevora di komputer Anda dan buka
                    alamat lokal yang diberikan oleh perintah <code>pnpm dev</code>.
                  </span>
                </section>
              ) : (
                <section className="installer-welcome-card">
                  <span className="installer-card-icon installer-card-icon-green">
                    <IconShieldCheck size={23} />
                  </span>
                  <div>
                    <h2>Siap untuk memulai?</h2>
                    <p>
                      Siapkan database MySQL yang aktif di AMPPS. Installer akan menguji koneksi,
                      membuat tabel Nevora, dan menyimpan konfigurasi secara lokal di server.
                    </p>
                  </div>
                </section>
              )}
              <div className="installer-footer-actions">
                <span className="installer-info-text">
                  <IconShieldCheck size={15} /> Pengaturan dilakukan dengan aman di server lokal
                  Anda.
                </span>
                <button
                  className="installer-primary-button"
                  disabled={!ready || status?.localAccess === false}
                  onClick={next}
                  type="button"
                >
                  Mulai instalasi <IconArrowRight size={16} />
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <section className="installer-form-card">
                <CardHeading
                  icon={<IconDatabase size={21} />}
                  title="Konfigurasi Database"
                  description="Masukkan informasi koneksi database MySQL AMPPS Anda."
                />
                <div className="installer-form-grid">
                  <Field label="Host Database" required hint="Contoh: 127.0.0.1 atau localhost">
                    <input
                      autoComplete="off"
                      onChange={(event) => updateDatabase("host", event.target.value)}
                      value={database.host}
                    />
                  </Field>
                  <Field label="Port" required hint="Port MySQL AMPPS, umumnya 3306">
                    <input
                      max="65535"
                      min="1"
                      onChange={(event) => updateDatabase("port", event.target.value)}
                      type="number"
                      value={database.port}
                    />
                  </Field>
                  <Field
                    label="Nama Database"
                    required
                    hint="Buat database kosong melalui phpMyAdmin AMPPS terlebih dahulu."
                  >
                    <input
                      autoComplete="off"
                      onChange={(event) => updateDatabase("database", event.target.value)}
                      value={database.database}
                    />
                  </Field>
                  <Field
                    label="Username Database"
                    required
                    hint="Username MySQL yang memiliki izin membuat tabel."
                  >
                    <input
                      autoComplete="username"
                      onChange={(event) => updateDatabase("user", event.target.value)}
                      value={database.user}
                    />
                  </Field>
                  <Field
                    label="Password Database"
                    hint="Boleh kosong jika MySQL lokal Anda tidak memakai password."
                  >
                    <input
                      autoComplete="new-password"
                      onChange={(event) => updateDatabase("password", event.target.value)}
                      type="password"
                      value={database.password}
                    />
                  </Field>
                  <Field
                    label="Prefiks Tabel"
                    hint="Opsional. Tabel Nevora memakai nama standar skema aplikasi."
                  >
                    <input disabled placeholder="Tidak digunakan" value="" />
                  </Field>
                </div>
                <div
                  className={`installer-connection-status${databaseConnected ? " is-success" : ""}`}
                  role="status"
                >
                  <span>
                    {databaseConnected ? <IconCircleCheck size={21} /> : <IconDatabase size={19} />}
                  </span>
                  <div>
                    <b>
                      {databaseConnected
                        ? "Koneksi database berhasil"
                        : "Uji koneksi sebelum melanjutkan"}
                    </b>
                    <small>
                      {databaseResult || "Password dikirim ke server lokal dan disimpan sebagai konfigurasi setelah instalasi."}
                    </small>
                  </div>
                  <button
                    className="installer-secondary-button"
                    disabled={pending}
                    onClick={() => void testDatabase()}
                    type="button"
                  >
                    {pending ? "Menguji…" : "Uji Koneksi"}
                  </button>
                </div>
              </section>
              {notice && (
                <p className="installer-notice" role="alert">
                  {notice}
                </p>
              )}
              <StepActions
                canContinue={databaseConnected}
                pending={pending}
                onBack={() => setStep(0)}
                onContinue={next}
              />
            </>
          )}

          {step === 2 && (
            <>
              <section className="installer-form-card">
                <CardHeading
                  icon={<IconGlobe size={21} />}
                  title="Konfigurasi Aplikasi"
                  description="Atur identitas dan preferensi awal platform Nevora."
                />
                <div className="installer-form-grid">
                  <Field
                    label="Nama Aplikasi"
                    required
                    hint="Nama yang dicatat sebagai pengaturan awal Nevora."
                  >
                    <input
                      maxLength={80}
                      onChange={(event) => setApplicationName(event.target.value)}
                      value={applicationName}
                    />
                  </Field>
                  <Field
                    label="Zona Waktu"
                    required
                    hint="Digunakan untuk tanggal dan laporan platform."
                  >
                    <select onChange={(event) => setTimezone(event.target.value)} value={timezone}>
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </Field>
                  <Field
                    label="Mata Uang"
                    required
                    hint="Mata uang utama untuk anggaran dan laporan."
                  >
                    <select onChange={(event) => setCurrency(event.target.value)} value={currency}>
                      <option value="IDR">IDR · Rupiah Indonesia</option>
                      <option value="USD">USD · Dolar Amerika</option>
                    </select>
                  </Field>
                </div>
                <div className="installer-info-card">
                  <IconShieldCheck size={18} />
                  <span>
                    Pengaturan ini akan disimpan ke database Nevora setelah proses instalasi
                    selesai.
                  </span>
                </div>
              </section>
              <StepActions
                canContinue={applicationName.trim().length > 0}
                onBack={() => setStep(1)}
                onContinue={next}
              />
            </>
          )}

          {step === 3 && (
            <form
              className="installer-form-card"
              onSubmit={(event) => void createAdministrator(event)}
            >
              <CardHeading
                icon={<IconUser size={21} />}
                title="Buat Akun Administrator"
                description="Akun ini menjadi administrator utama dan menggunakan sistem login Nevora."
              />
              <div className="installer-form-grid">
                <Field
                  label="Nama Lengkap"
                  required
                  hint="Nama yang ditampilkan di panel administrator."
                >
                  <input
                    autoComplete="name"
                    maxLength={160}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                    value={fullName}
                  />
                </Field>
                <Field
                  label="Email Administrator"
                  required
                  hint="Email ini juga menjadi nama pengguna untuk login."
                >
                  <input
                    autoComplete="email"
                    maxLength={320}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    type="email"
                    value={email}
                  />
                </Field>
                <Field
                  label="Password"
                  required
                  hint="Minimal 12 karakter sesuai kebijakan autentikasi Nevora."
                >
                  <div className="installer-password-field">
                    <input
                      autoComplete="new-password"
                      maxLength={128}
                      minLength={12}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />
                    <button
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                      onClick={() => setShowPassword((value) => !value)}
                      type="button"
                    >
                      {showPassword ? <IconEyeOff size={17} /> : <IconEye size={17} />}
                    </button>
                  </div>
                </Field>
              </div>
              {notice && (
                <p className="installer-notice" role="alert">
                  {notice}
                </p>
              )}
              <div className="installer-security-note">
                <IconLock size={18} />
                <span>
                  Password dikelola oleh autentikasi Agent-Native dan tidak disimpan di database
                  aplikasi Nevora.
                </span>
              </div>
              <StepActions
                canContinue={
                  fullName.trim().length > 0 && email.trim().length > 0 && password.length >= 12
                }
                pending={pending}
                onBack={() => setStep(2)}
                continueLabel="Verifikasi Akun Admin"
              />
            </form>
          )}

          {step === 4 && (
            <>
              <section className="installer-form-card">
                <CardHeading
                  icon={<IconShieldCheck size={21} />}
                  title="Verifikasi & Instalasi"
                  description="Periksa kembali tujuan database dan akun utama sebelum membuat tabel Nevora."
                />
                <div className="installer-summary-list">
                  <SummaryRow
                    icon={<IconDatabase size={18} />}
                    label="Database MySQL"
                    value={`${database.database} · ${database.host}:${database.port}`}
                    complete={databaseConnected}
                  />
                  <SummaryRow
                    icon={<IconGlobe size={18} />}
                    label="Konfigurasi aplikasi"
                    value={`${applicationName} · ${timezone} · ${currency}`}
                    complete
                  />
                  <SummaryRow
                    icon={<IconUser size={18} />}
                    label="Administrator utama"
                    value={`${fullName} · ${email}`}
                    complete
                  />
                  <SummaryRow
                    icon={<IconLock size={18} />}
                    label="Sesi autentikasi"
                    value="Terverifikasi"
                    complete
                  />
                </div>
                <div className="installer-info-card">
                  <IconShieldCheck size={18} />
                  <span>
                    Instalasi membuat tabel jika belum ada, mencatat administrator, dan menyimpan
                    preferensi ke MySQL. Proses ini tidak menghapus data yang ada.
                  </span>
                </div>
                {notice && (
                  <p className="installer-notice" role="alert">
                    {notice}
                  </p>
                )}
              </section>
              <div className="installer-footer-actions">
                <button
                  className="installer-back-button"
                  disabled={pending}
                  onClick={() => setStep(3)}
                  type="button"
                >
                  <IconArrowLeft size={16} /> Kembali
                </button>
                <button
                  className="installer-primary-button"
                  disabled={pending}
                  onClick={() => void install()}
                  type="button"
                >
                  {pending ? (
                    <>
                      <span className="installer-button-spinner" /> Menyiapkan Nevora…
                    </>
                  ) : (
                    <>
                      Mulai Instalasi <IconArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {step === 5 && (
            <section className="installer-finish-card">
              <span className="installer-success-mark">
                <IconCircleCheck size={34} />
              </span>
              <h2>Instalasi Berhasil</h2>
              <p>
                Nevora dan database Anda siap digunakan. Masuk dengan email Administrator yang baru
                dibuat.
              </p>
              <div className="installer-summary-list">
                <SummaryRow
                  icon={<IconUser size={18} />}
                  label="Administrator"
                  value={email}
                  complete
                />
                <SummaryRow
                  icon={<IconDatabase size={18} />}
                  label="Database"
                  value={database.database}
                  complete
                />
              </div>
              <button
                className="installer-primary-button"
                onClick={() => navigate(appPath("/admin-login"))}
                type="button"
              >
                Masuk ke Nevora <IconArrowRight size={16} />
              </button>
            </section>
          )}
        </div>

        {step === 0 && (
          <div className="installer-bottom-note">
            <IconShieldCheck size={15} />
            <span>
              Pastikan MySQL AMPPS sudah berjalan dan database kosong sudah dibuat melalui
              phpMyAdmin.
            </span>
            <span className="installer-bottom-step">
              <StepIcon size={15} /> {step + 1} / {steps.length}
            </span>
          </div>
        )}
      </section>
    </main>
  );
}

function Brand() {
  return (
    <a className="installer-brand" href={appPath("/")} aria-label="Nevora">
      <span className="installer-brand-mark">N</span>
      <span>
        <b>Nevora</b>
        <small>
          Reward &amp; Performance
          <br />
          Marketing Platform
        </small>
      </span>
    </a>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <label className="installer-field">
      <span>
        {label}
        {required && <i> *</i>}
      </span>
      {children}
      <small>{hint}</small>
    </label>
  );
}

function CardHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="installer-card-heading">
      <span className="installer-card-icon installer-card-icon-blue">{icon}</span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function ReadinessRow({ label, value, ready }: { label: string; value: string; ready: boolean }) {
  return (
    <div className="installer-readiness-row">
      <span className={ready ? "is-ready" : ""}>{ready ? <IconCheck size={12} /> : <span />}</span>
      <b>{label}</b>
      <small>{value}</small>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
  complete,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  complete: boolean;
}) {
  return (
    <div className="installer-summary-row">
      <span className="installer-summary-icon">{icon}</span>
      <span>
        <b>{label}</b>
        <small>{value}</small>
      </span>
      <i className={complete ? "is-ready" : ""}>{complete ? <IconCheck size={14} /> : "!"}</i>
    </div>
  );
}

function StepActions({
  canContinue,
  pending = false,
  onBack,
  onContinue,
  continueLabel = "Lanjutkan",
}: {
  canContinue: boolean;
  pending?: boolean;
  onBack: () => void;
  onContinue?: () => void;
  continueLabel?: string;
}) {
  return (
    <div className="installer-footer-actions">
      <button className="installer-back-button" disabled={pending} onClick={onBack} type="button">
        <IconArrowLeft size={16} /> Kembali
      </button>
      <button
        className="installer-primary-button"
        disabled={!canContinue || pending}
        onClick={onContinue}
        type="submit"
      >
        {pending ? (
          "Memverifikasi…"
        ) : (
          <>
            {continueLabel} <IconArrowRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}
