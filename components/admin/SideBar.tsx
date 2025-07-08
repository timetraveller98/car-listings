"use client";
import { Image } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
import { MdExpandMore, MdExpandLess, MdMenu, MdClose } from "react-icons/md";
import menuItems, { MenuItem } from "./MenuData";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { LogOut } from "lucide-react";
import { Login } from "@mui/icons-material";

interface SidebarProps {
  currentUserId: string;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role, currentUserId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const handleSubItemClick = () => {
    setIsOpen(false);
  };
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    const callbackUrl = `${window.location.origin}/login`;
    signOut({ redirect: false, callbackUrl }).then(() => {
      router.refresh();
      setIsOpen(false);
    });
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <>
      <div className="flex justify-between sticky-top bg-light h-100">
        <div className="p-1 ms-3">
          {currentUserId ? (
            <Link href={"/admin"}>
              <Image
                src="/logo.png"
                alt="logo"
                height={110}
                width={100}
                className=""
                fluid
              />
            </Link>
          ) : (
            <Link href={"/"}>
              {" "}
              <Image
                src="/logo.png"
                alt="logo"
                height={110}
                width={100}
                className=""
                fluid
              />
            </Link>
          )}
        </div>
        <div className="flex justify-center items-center me-4">
          <button
            className="btn btn-inherit border  d-lg-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          onClick={handleCloseSidebar}
        ></div>
      )}

      <div
        className={`position-fixed top-0 pt-1 start-0 w-75 h-100 z-50 bg-white shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-100"
        }`}
        style={{ overflowY: "auto" }}
      >
        <div className="p-3">
          <div className="flex justify-center items-center">
            <Image
              src="/logo.png"
              alt="logo"
              height={100}
              width={100}
              className="p-1"
              fluid
            />
          </div>
          {filteredMenuItems.map((item: MenuItem) => (
            <div className="d-flex flex-column gap-2" key={item.label}>
              {item.subItems ? (
                <>
                  <div
                    onClick={() => toggleDropdown(item.label)}
                    className="d-flex m-1 align-items-center p-2 cursor-pointer border rounded hover-bg-light"
                  >
                    {item.icon && <item.icon className="me-2 text-dark" />}
                    <span className="text-dark">{item.label}</span>
                    {openDropdown === item.label ? (
                      <MdExpandLess className="ms-auto text-dark" />
                    ) : (
                      <MdExpandMore className="ms-auto text-dark" />
                    )}
                  </div>

                  {openDropdown === item.label && (
                    <div className="ms-2 d-flex flex-column gap-2 p-2">
                      {item.subItems.map((subItem: MenuItem) =>
                        subItem.roles.includes(role) ? (
                          <div key={subItem.label}>
                            <Link
                              href={subItem.href || "#"}
                              className="d-flex border align-items-center p-2 text-dark rounded hover-bg-secondary text-decoration-none"
                              onClick={handleSubItemClick}
                            >
                              {subItem.icon && (
                                <subItem.icon className="me-2" />
                              )}
                              <span>{subItem.label}</span>
                            </Link>
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="d-flex align-items-center p-2 m-1 border rounded hover-bg-light text-dark text-decoration-none"
                  onClick={handleCloseSidebar}
                >
                  {item.icon && <item.icon className="me-2" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-3  items-center">
          {currentUserId ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              size="small"
              className="flex items-center gap-2 p-2 border-gray-300 border text-gray-700 hover:bg-gray-100 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              color="inherit"
              size="small"
              className="flex items-center gap-2 p-2 border-gray-300 border text-gray-700 hover:bg-gray-100 transition-all"
            >
              <Login className="w-4 h-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
