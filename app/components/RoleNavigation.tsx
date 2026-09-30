import { IconChevronDown, IconUser, type Icon } from "@tabler/icons-react";
import { appPath } from "@agent-native/core/client/api-path";
import { useState, type ReactNode } from "react";

import "./role-navigation.css";

export type RoleNavigationItem = {
  label: string;
  href?: string;
  onSelect?: () => void;
};

export type RoleNavigationSection = {
  id: string;
  label: string;
  icon: Icon;
  items: RoleNavigationItem[];
};

export function RoleNavigation({
  role,
  dashboardLabel = "Dashboard",
  dashboardHref,
  dashboardIcon: DashboardIcon,
  sections,
  onPreview,
}: {
  role: string;
  dashboardLabel?: string;
  dashboardHref: string;
  dashboardIcon: Icon;
  sections: RoleNavigationSection[];
  onPreview?: (label: string) => void;
}) {
  const [openSection, setOpenSection] = useState("");

  return (
    <nav className="ad-nav role-navigation" aria-label={`Navigasi ${role}`}>
      <a className="active" href={dashboardHref} aria-current="page">
        <DashboardIcon size={17} />
        <span>{dashboardLabel}</span>
      </a>
      <a className="role-navigation-user-link" href={appPath("/user")} aria-label="Dashboard Pengguna" title="Dashboard Pengguna">
        <IconUser size={17} />
        <span>Dashboard Pengguna</span>
      </a>
      {sections.map(({ id, label, icon: SectionIcon, items }) => {
        const open = openSection === id;
        return (
          <div className="role-nav-group" key={id}>
            <button
              aria-expanded={open}
              aria-label={label}
              className="role-nav-trigger"
              onClick={() =>
                setOpenSection((current) => (current === id ? "" : id))
              }
              type="button"
            >
              <SectionIcon size={17} />
              <span>{label}</span>
              <IconChevronDown className={open ? "is-open" : ""} size={12} />
            </button>
            {open && (
              <div className="role-nav-submenu">
                {items.map(({ label: itemLabel, href, onSelect }) => {
                  const content: ReactNode = <span>{itemLabel}</span>;
                  return href ? (
                    <a href={href} key={itemLabel} onClick={onSelect}>
                      {content}
                    </a>
                  ) : (
                    <button
                      key={itemLabel}
                      onClick={() => {
                        if (onSelect) {
                          onSelect();
                        } else {
                          onPreview?.(itemLabel);
                        }
                      }}
                      type="button"
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
