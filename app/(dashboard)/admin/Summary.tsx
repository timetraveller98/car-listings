"use client";

import { Listing, User } from "@prisma/client";
import { useEffect, useState, FC } from "react";
import FormatPrice from "@/components/ui/formatPrice";
import FormatNumber from "@/components/ui/formatNumber";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { Users, LucideProps, Car } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface SummaryProps {
  users: User[];
  listings: Listing[];
}

type SummaryItem = {
  label: string;
  digit: number;
  bgColor: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type SummaryDataType = Record<string, SummaryItem>;

const Summary: FC<SummaryProps> = ({ users,listings }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    users: {
      label: "Total Users",
      digit: 0,
      bgColor: "bg-gray-100",
      url: "/admin/user",
      icon: Users,
    },
    listings: {
      label: "Total Cars",
      digit: 0,
      bgColor: "bg-green-100",
      url: "/admin/listing",
      icon: Car,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => ({
      ...prev,
      users: {
        ...prev.users,
        digit: users.length,
      },
      listings: {
        ...prev.listings,
        digit: listings.length,
      },
    }));
  }, [users,listings]);

  return (
    <Container>
      <Row className="my-3">
        {Object.entries(summaryData).map(
          ([key, { label, digit, bgColor, url, icon: Icon }]) => (
            <Col key={key} md={3} xs={6}>
              <Link
                href={url}
                passHref
                className={`d-flex shadow gap-2 my-3 align-items-center flex-column justify-content-center ${bgColor}`}
                style={{
                  borderRadius: "5%",
                  padding: "20px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Icon size={30} />
                <div className="text-center">
                  <div
                    className={`fw-semibold py-2 ${
                      Object.keys(summaryData).length < 4 ? "fs-5" : "fs-6"
                    }`}
                  >
                    {["Total Sale", "Appointment Sale", "Camp Sale"].includes(
                      label
                    )
                      ? FormatPrice(digit)
                      : FormatNumber(digit)}
                  </div>
                  <div className="fs-6">{label}</div>
                </div>
              </Link>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

export default Summary;
