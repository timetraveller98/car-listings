import { Col, Container, Row } from "react-bootstrap";
interface HeadingProps {
  title: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, center }) => {
  return (
    <Container>
      <Row>
        <Col className="mb-3">
          <div className={`${center ? "text-center" : "text-start"} text-secondary`}>
            <p className="heading">{title}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Heading;
