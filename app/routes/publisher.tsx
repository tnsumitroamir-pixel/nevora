import { PublisherDashboard } from "@/components/PublisherDashboard";

export function meta() {
  return [
    { title: "Dashboard Publisher — Nevora" },
    {
      name: "description",
      content: "Dashboard Publisher dengan data live dari database Nevora.",
    },
  ];
}

export default function PublisherRoute() {
  return <PublisherDashboard />;
}
