"use client";
import { Container, Col, Row } from "react-bootstrap";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
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
                  chuhan718@gmail.com
                </li>
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
              Copyrights ©2025 Car Listings Management.
            </h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
