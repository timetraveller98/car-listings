import { Container, Row, Col } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/ui/NullData";
import Login from "@/app/(auth)/login/Login";
import ShowListing from "./ShowListing";

const AdminUser = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <Login />;
  }
  if (currentUser.role !== "SUPERADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <ShowListing  />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminUser;
