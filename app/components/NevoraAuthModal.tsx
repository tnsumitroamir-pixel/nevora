import { appPath } from "@agent-native/core/client/api-path";
import {
  actionErrorMessage,
  useActionMutation,
  useActionQuery,
} from "@agent-native/core/client/hooks";
import {
  IconArrowRight,
  IconBrandGoogle,
  IconChartBar,
  IconDeviceGamepad2,
  IconEye,
  IconEyeOff,
  IconGift,
  IconLock,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useState, type FormEvent } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export type AuthMode = "login" | "signup";

interface NevoraAuthModalProps {
  mode: AuthMode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onModeChange: (mode: AuthMode) => void;
}

const signupRoles = ["Konsumen", "Publisher", "Advertiser", "Partner"] as const;

async function postAuth(path: string, body: Record<string, string>) {
  const response = await fetch(appPath(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;

  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || "Autentikasi belum berhasil.");
  }
}

export function NevoraAuthModal({
  mode,
  open,
  onOpenChange,
  onModeChange,
}: NevoraAuthModalProps) {
  const [selectedRole, setSelectedRole] =
    useState<(typeof signupRoles)[number]>("Konsumen");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const saveProfile = useActionMutation("save-advertiser-profile");
  const accountHome = useActionQuery(
    "get-current-account-home",
    {},
    { enabled: false },
  );

  const switchMode = (nextMode: AuthMode) => {
    setNotice("");
    onModeChange(nextMode);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const email = String(form.get("email") || "").trim();

    if (
      mode === "signup" &&
      password !== String(form.get("confirmPassword") || "")
    ) {
      setNotice("Konfirmasi password belum sama.");
      return;
    }

    setPending(true);
    setNotice("");
    try {
      if (mode === "signup") {
        await postAuth("/_agent-native/auth/register", {
          email,
          password,
          callbackURL: appPath(
            selectedRole === "Publisher" ? "/publisher" : "/advertiser",
          ),
        });
      }
      await postAuth("/_agent-native/auth/login", { email, password });

      if (mode === "signup") {
        const profile = await saveProfile.mutateAsync({
          fullName: String(form.get("name") || "").trim(),
          businessName: String(form.get("businessName") || "").trim(),
          phone: String(form.get("phone") || "").trim(),
          role: selectedRole,
        });
        window.location.assign(
          appPath(
            profile.role === "Publisher"
              ? "/publisher"
              : profile.role === "Advertiser"
                ? "/advertiser"
                : "/",
          ),
        );
        return;
      }

      const destination = await accountHome.refetch();
      window.location.assign(appPath(destination.data?.path ?? "/"));
    } catch (error) {
      setNotice(
        mode === "signup"
          ? (actionErrorMessage(error) ??
              (error instanceof Error
                ? error.message
                : "Pendaftaran belum berhasil."))
          : error instanceof Error
            ? error.message
            : "Login belum berhasil.",
      );
    } finally {
      setPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setPending(true);
    setNotice("");
    try {
      const response = await fetch(
        `${appPath("/_agent-native/google/auth-url")}?return=${encodeURIComponent(appPath("/advertiser"))}`,
      );
      const result = (await response.json().catch(() => null)) as {
        url?: string;
        error?: string;
      } | null;
      if (!response.ok || !result?.url) {
        throw new Error(result?.error || "Login Google belum dikonfigurasi.");
      }
      window.location.assign(result.url);
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Login Google belum dikonfigurasi.",
      );
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`auth-modal-content auth-${mode}`}
        overlayClassName="auth-modal-overlay"
      >
        <div
          className={`auth-modal-grid ${mode === "signup" ? "is-signup" : "is-login"}`}
        >
          <aside className="auth-brand-panel">
            <a
              className="auth-brand-logo"
              href="#home"
              onClick={() => onOpenChange(false)}
            >
              <span aria-hidden="true">N</span> Nevora
            </a>
            <div className="auth-brand-message">
              <h2>
                {mode === "signup"
                  ? "Bergabung dengan Nevora Sekarang!"
                  : "Selamat Datang Kembali"}
              </h2>
              <p>
                {mode === "signup"
                  ? "Dapatkan akses ke berbagai reward, misi harian, dan peluang penghasilan yang seru."
                  : "Masuk ke akun Anda untuk melanjutkan ke Nevora."}
              </p>
            </div>
            <div className="auth-benefits">
              <div>
                <span>
                  <IconGift size={17} />
                </span>
                <p>
                  <b>Reward Menarik</b>
                  <small>Tukarkan poin dengan berbagai hadiah pilihan.</small>
                </p>
              </div>
              <div>
                <span>
                  <IconDeviceGamepad2 size={17} />
                </span>
                <p>
                  <b>Misi &amp; Game</b>
                  <small>Nikmati game favorit dan dapatkan reward.</small>
                </p>
              </div>
              <div>
                <span>
                  <IconChartBar size={17} />
                </span>
                <p>
                  <b>Peluang Penghasilan</b>
                  <small>Isi survei atau ikuti aktivitas pilihan.</small>
                </p>
              </div>
            </div>
            <div className="auth-reward-art" aria-hidden="true">
              <span className="auth-coin coin-one" />
              <span className="auth-coin coin-two" />
              <span className="auth-coin coin-three" />
              <span className="auth-gift">
                <IconGift size={52} stroke={1.7} />
              </span>
            </div>
          </aside>

          <section className="auth-form-panel">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form-heading">
                <DialogTitle className="auth-form-title">
                  {mode === "signup" ? "Daftar Akun" : "Selamat Datang Kembali"}
                </DialogTitle>
                <DialogDescription className="auth-form-description">
                  {mode === "signup"
                    ? "Lengkapi data di bawah ini untuk membuat akun Nevora."
                    : "Masuk ke akun Anda untuk melanjutkan ke Nevora."}
                </DialogDescription>
              </div>

              {mode === "signup" && (
                <div className="auth-field">
                  <label htmlFor="signup-name">Nama Lengkap</label>
                  <div className="auth-input-wrap">
                    <IconUser size={15} aria-hidden="true" />
                    <input
                      id="signup-name"
                      name="name"
                      placeholder="Masukkan nama lengkap Anda"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label htmlFor={`${mode}-email`}>Email</label>
                <div className="auth-input-wrap">
                  <IconMail size={15} aria-hidden="true" />
                  <input
                    id={`${mode}-email`}
                    name="email"
                    type={mode === "signup" ? "email" : "text"}
                    placeholder="Masukkan email Anda"
                    autoComplete={mode === "signup" ? "email" : "username"}
                    required
                  />
                </div>
              </div>

              {mode === "signup" && selectedRole === "Advertiser" && (
                <div className="auth-field">
                  <label htmlFor="signup-business">Nama Perusahaan</label>
                  <div className="auth-input-wrap">
                    <IconUser size={15} aria-hidden="true" />
                    <input
                      id="signup-business"
                      name="businessName"
                      placeholder="Nama perusahaan Anda"
                      autoComplete="organization"
                      required
                    />
                  </div>
                </div>
              )}

              {mode === "signup" && (
                <div className="auth-field">
                  <label htmlFor="signup-phone">Nomor Telepon</label>
                  <div className="auth-input-wrap">
                    <IconPhone size={15} aria-hidden="true" />
                    <input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      placeholder="Masukkan nomor telepon Anda"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label htmlFor={`${mode}-password`}>Password</label>
                <div className="auth-input-wrap">
                  <IconLock size={15} aria-hidden="true" />
                  <input
                    id={`${mode}-password`}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      mode === "signup"
                        ? "Buat password Anda"
                        : "Masukkan password"
                    }
                    autoComplete={
                      mode === "signup" ? "new-password" : "current-password"
                    }
                    minLength={8}
                    required
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IconEyeOff size={15} />
                    ) : (
                      <IconEye size={15} />
                    )}
                  </button>
                </div>
              </div>

              {mode === "signup" ? (
                <>
                  <div className="auth-field">
                    <label htmlFor="signup-confirm">Konfirmasi Password</label>
                    <div className="auth-input-wrap">
                      <IconLock size={15} aria-hidden="true" />
                      <input
                        id="signup-confirm"
                        name="confirmPassword"
                        type={showConfirmation ? "text" : "password"}
                        placeholder="Ulangi password Anda"
                        autoComplete="new-password"
                        minLength={8}
                        required
                      />
                      <button
                        className="password-toggle"
                        type="button"
                        aria-label={
                          showConfirmation
                            ? "Sembunyikan konfirmasi password"
                            : "Tampilkan konfirmasi password"
                        }
                        onClick={() => setShowConfirmation(!showConfirmation)}
                      >
                        {showConfirmation ? (
                          <IconEyeOff size={15} />
                        ) : (
                          <IconEye size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                  <fieldset className="auth-role-fieldset">
                    <legend>Daftar sebagai</legend>
                    <div className="auth-role-options">
                      {signupRoles.map((role) => (
                        <label
                          className={selectedRole === role ? "selected" : ""}
                          key={role}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={selectedRole === role}
                            onChange={() => setSelectedRole(role)}
                          />
                          <span>{role}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="auth-terms">
                    <input type="checkbox" required />
                    <span>
                      Saya setuju dengan{" "}
                      <a href="#footer" onClick={() => onOpenChange(false)}>
                        Syarat dan Ketentuan
                      </a>{" "}
                      dan{" "}
                      <a href="#footer" onClick={() => onOpenChange(false)}>
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                </>
              ) : (
                <div className="auth-login-options">
                  <label>
                    <input type="checkbox" name="remember" />{" "}
                    <span>Ingat saya</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setNotice("Pemulihan password belum tersedia.")
                    }
                  >
                    Lupa password?
                  </button>
                </div>
              )}

              {notice && (
                <p className="auth-notice" role="alert">
                  {notice}
                </p>
              )}
              <button className="auth-submit" type="submit" disabled={pending}>
                {pending
                  ? "Memproses..."
                  : mode === "signup"
                    ? "Daftar Sekarang"
                    : "Login"}
                {!pending && <IconArrowRight size={15} />}
              </button>

              <div className="auth-divider">
                <span />
                atau
                <span />
              </div>
              <button
                className="auth-google"
                type="button"
                onClick={handleGoogleSignIn}
                disabled={pending}
              >
                <IconBrandGoogle size={16} />
                {mode === "signup"
                  ? "Daftar dengan Google"
                  : "Login dengan Google"}
              </button>
              <p className="auth-switch-copy">
                {mode === "signup" ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
                <button
                  type="button"
                  onClick={() =>
                    switchMode(mode === "signup" ? "login" : "signup")
                  }
                >
                  {mode === "signup" ? "Login sekarang" : "Daftar sekarang"}
                </button>
              </p>
            </form>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
