import { UserDashboard } from "@/components/UserDashboard";

export function meta() {
  return [
    { title: "Dashboard Pengguna — Nevora" },
    {
      name: "description",
      content: "Dashboard pengguna Nevora dengan ringkasan reward dan offer.",
    },
  ];
}

export default function UserRoute() {
  return <UserDashboard />;
}
