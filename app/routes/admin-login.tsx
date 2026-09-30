import { appPath } from "@agent-native/core/client/api-path";
import { IconArrowLeft, IconLock, IconShieldCheck } from "@tabler/icons-react";
import { useState, type FormEvent } from "react";

import "../components/admin-login.css";

export function meta() {
  return [
    { title: "Login Admin — Nevora" },
    {
      name: "description",
      content: "Layar login khusus administrator Nevora.",
    },
  ];
}

export default function AdminLoginRoute() {
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setPending(true);
    setNotice("");

    try {
      const response = await fetch(appPath("/_agent-native/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(values.get("email") || "").trim(),
          password: String(values.get("password") || ""),
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Email atau password belum benar.");
      }

      const adminResponse = await fetch(appPath("/api/installer/admin-session"));
      const admin = (await adminResponse.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!adminResponse.ok || !admin?.ok) {
        throw new Error(admin?.error || "Akun ini tidak memiliki akses Admin.");
      }

      window.location.assign(appPath("/admin"));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Login administrator belum berhasil.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="admin-login-page">
      <a className="admin-login-brand" href={appPath("/")}>
        <span>N</span>
        <b>Nevora</b>
        <small>Admin Control</small>
      </a>
      <section className="admin-login-card">
        <span className="admin-login-mark">
          <IconShieldCheck size={22} />
        </span>
        <h1>Login Administrator</h1>
        <p>Masuk ke ruang kontrol Nevora.</p>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email administrator</label>
          <input
            autoComplete="username"
            id="admin-email"
            name="email"
            placeholder="admin@nevora.id"
            required
            type="email"
          />
          <label htmlFor="admin-password">Password</label>
          <div className="admin-login-password">
            <IconLock size={15} />
            <input
              autoComplete="current-password"
              id="admin-password"
              name="password"
              placeholder="Masukkan password"
              required
              type="password"
            />
          </div>
          {notice && (
            <p className="admin-login-notice" role="alert">
              {notice}
            </p>
          )}
          <button disabled={pending} type="submit">
            {pending ? "Memverifikasi…" : "Masuk ke Admin"}
          </button>
        </form>
        <a className="admin-login-back" href={appPath("/")}>
          <IconArrowLeft size={13} /> Kembali ke Nevora
        </a>
      </section>
    </main>
  );
}
