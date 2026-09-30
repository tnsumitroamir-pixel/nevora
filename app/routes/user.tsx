import { UserDashboard } from "@/components/UserDashboard";

export function meta() {
  return [
    { title: "Dashboard Pengguna — Nevora" },
    {
      name: "description",
      content: "Dashboard akun dan role pengguna Nevora; fitur User yang belum didukung backend ditampilkan sebagai belum tersedia.",
    },
  ];
}

export default function UserRoute() {
  return <UserDashboard />;
}
