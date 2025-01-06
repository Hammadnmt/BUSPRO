import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>BusPro</h5>
            <p>
              We offer seamless bus booking and route management solutions to
              make your travel hassle-free and enjoyable.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-light text-decoration-none">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-light text-decoration-none">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/review" className="text-light text-decoration-none">
                  Booking Review
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@buspro.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Travel Lane, City, Country</li>
            </ul>
          </Col>
        </Row>
        <hr className="border-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} BusPro. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
