import { getCurrentUser } from "@/actions/getCurrentUser";
import { Col, Container, Row } from "react-bootstrap";
import Summary from "./Summary";
import NullData from "@/components/ui/NullData";
import Login from "@/app/(auth)/login/Login";
import { db } from "@/libs/db";

const Admin = async () => {
  const [ currentUser] = await Promise.all([
    getCurrentUser(),
  ]);
  const users = await db.user.findMany()
  if (!currentUser) {
    return <Login />;
  }
  if (
    currentUser.role !== "SUPERADMIN" &&
    currentUser.role !== "ADMIN"
  ) {
    return currentUser.role === "USER" ? (
      <NullData title="Oops! Access Denied" />
    ) : null;
  }
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="flex gap-4 justify-between flex-wrap">
            <Summary users={users} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;


