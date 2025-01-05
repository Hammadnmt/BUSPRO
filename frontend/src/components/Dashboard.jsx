import Card from "react-bootstrap/Card";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";

function Dashboard() {
  return (
    <>
      <ToastContainer />
      <Container>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Total Products</Card.Title>
                <Card.Text>1</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <Card.Text>2</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
