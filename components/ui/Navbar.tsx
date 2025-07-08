"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";
import DropdownMenu from "./Menu";
import Sidebar from "../admin/SideBar";

interface NavbarProps {
  email: string | null | undefined;
  name: string | null | undefined;
  currentRole: string;
}

const NavbarData: React.FC<NavbarProps> = ({ email, name, currentRole }) => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const closeNavbar = () => setExpanded(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute && isMobile) {
    return <Sidebar role={currentRole} currentUserId={email ?? ""} />;
  }

  return (
    <Navbar
      expand="lg"
      className="sticky-top bg-light"
      expanded={expanded}
      id="navbar"
    >
      <Container fluid>
        <Link href="/" onClick={closeNavbar}>
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="m-0 responsive-logo"
          />
        </Link>

        <Navbar.Toggle
          className="me-3 text-light"
          onClick={() => setExpanded((prev) => !prev)}
        />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="text-secondary">
            <Link href="/" className="navButton m-2" onClick={closeNavbar}>
              Home
            </Link>
          </Nav>

          <Nav className="text-dark fw-semibold d-flex align-items-center">
            <DropdownMenu
              name={name}
              email={email}
              closeNavbar={closeNavbar}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarData;
