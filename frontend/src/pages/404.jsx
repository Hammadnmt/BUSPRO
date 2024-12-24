import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router"; // Assuming you're using react-router for navigation

// 404 Component
function NotFound() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.accessToken) {
    console.log(user);
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 3000);
  }
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Row className="text-center">
        <Col md={6} className="mx-auto">
          <h1 className="display-1 text-danger">404</h1>
          <h2 className="mb-3">Oops! Page Not Found</h2>
          <p className="lead">
            The page you're looking for might have been moved or doesn't exist
            anymore.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Go to Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
