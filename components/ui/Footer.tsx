"use client";
import { Container, Col, Row } from "react-bootstrap";
import Link from "next/link";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Youtube from "@mui/icons-material/YouTube";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/X";
import LinkedIn from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="text-dark bg-light">
      <hr className="mt-0 pt-0" />
      <Container>
        <Row className="">
          <Col md={6} className="">
            <ul className="mt-3">
            <p style={{ fontSize:'15px'}} className="fw-semibold ">Links</p>
              <Link href={"/"}>
                <li className="my-2 text-dark text-[14px]">Home</li>
              </Link>
              <Link href={"/admin"}>
                <li className="my-2 text-dark text-[14px]" >Admin</li>
              </Link>
            </ul>
          </Col>
          <Col md={6} className="">
            <ul className="mt-3">
              <p style={{ fontSize:'17px'}}  className="fw-semibold ">Contact</p>
              <div className="my-4">
                <p style={{ fontSize:'15px'}}  className="fw-semibold">Office Address</p>
                <li className=" my-2 text-[14px]">
                  <span className="me-2 ">
                    <HomeWorkIcon />
                  </span>{" "}
                  Plot No. 9, 2nd Floor, IT Park, Panchkula, Haryana, 134109
                </li>
              </div>

              <p style={{ fontSize:'15px'}} className="fw-semibold ">Contact Details</p>
              <div>
                <li className=" my-2 text-[14px]">
                  <span className="me-2 ">
                    <LocalPhoneIcon />
                  </span>{" "}
                  +91 7087868780
                </li>
                <li className=" my-2 text-[14px]">
                  <span className="me-2 ">
                    <EmailIcon />
                  </span>{" "}
                  help@alexsolution.in
                </li>
              </div>
              <div className="my-4">
                <Link href={"/"} target="_blank">
                  <Facebook fontSize="medium" className="m-2 text-primary" />
                </Link>
                <Link href={"/"} target="_blank">
                  <Youtube color="error" fontSize="medium" className="m-1" />
                </Link>
                <Link href={"/"} target="_blank">
                  <Twitter fontSize="medium" className="m-2 text-dark" />
                </Link>
                <Link href={"/"} target="_blank">
                  <Instagram color="error" fontSize="medium" className="m-1" />
                </Link>
                <Link href={"/"} target="_blank">
                  <LinkedIn fontSize="medium" className="m-2 text-primary" />
                </Link>
              </div>
            </ul>
          </Col>
          <Col xs={12}>
            <hr className="my-0 py-0" />
            <h6
              className=""
              style={{
                textAlign: "center",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize:'14px'
              }}
            >
              Copyrights ©2025 Docker all rights reserved.
            </h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
