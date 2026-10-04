import { IconHome } from "@tabler/icons-react";

export function DashboardMenu() {
  return (
    <a className="active" href="#dashboard">
      <IconHome size={17} stroke={1.9} />
      <span>Dashboard</span>
    </a>
  );
}
