"use client";

import { useState } from "react";
import Link from "next/link";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import menuItems, { MenuItem } from "./MenuData";

const Menu = ({ role }: { role: string }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="text-sm text-black bg-light h-full p-3">
      <div className="h-100 overflow-y-auto d-flex flex-column gap-2">
        {menuItems.map((item: MenuItem) => {
          if (!item.roles.includes(role)) return null;

          return (
            <div key={item.label} className="rounded">
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="d-flex align-items-center justify-content-between w-100 p-2 rounded hover-bg-secondary border-0"
                  >
                    <div className="d-flex align-items-center gap-3">
                      {item.icon && <item.icon className="fs-5" />}
                      <span className="fs-6 fw-semibold">{item.label}</span>
                    </div>
                    {openDropdown === item.label ? (
                      <MdExpandLess className="text-secondary" />
                    ) : (
                      <MdExpandMore className="text-secondary" />
                    )}
                  </button>

                  {openDropdown === item.label && (
                    <div className="ms-4 d-flex flex-column gap-1  ps-3">
                      {item.subItems.map((subItem: MenuItem) => {
                        if (!subItem.roles.includes(role)) return null;
                        return (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="d-flex align-items-center text-decoration-none text-success py-2 ps-2 rounded hover-bg-light"
                          >
                            {subItem.icon && (
                              <subItem.icon className="fs-6" />
                            )}
                            <span className="fs-6 ps-2">{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="d-flex align-items-center text-decoration-none text-black py-2 ps-1 rounded hover-bg-secondary"
                >
                  {item.icon && <item.icon className="ms-1 fs-6" />}
                  <span className="ps-2 fs-6">{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Menu;
