import { Badge, Bus, Clock, MapPin, Users } from "lucide-react";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { extractTime12HourFormat } from "../utils/helpers";

export default function Booking(data) {
  return (
    <Container>
      <Col lg={8}>
        <Card className="shadow-sm mx-auto">
          <Card.Body>
            <Row>
              <Col md={12}>
                <div className="mb-4">
                  <h5 className="text-primary mb-3">Daweo Express</h5>

                  <div className="d-flex align-items-center mb-3">
                    <Clock className="text-muted me-2" size={18} />
                    <span className="fw-bold">
                      {extractTime12HourFormat(data?.trip?.departure_time)}
                      <span className="mx-2">→</span>
                      {extractTime12HourFormat(data?.trip?.arrival_time)}
                    </span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <MapPin className="text-muted me-2" size={18} />
                    <span>
                      {data?.trip?.Route?.source || "N/A"}
                      <span className="mx-2">→</span>
                      {data?.trip?.Route?.destination || "N/A"}
                    </span>
                  </div>

                  <div className="border-top border-bottom py-3 my-3">
                    <h6 className="text-primary mb-2 d-flex align-items-center gap-2">
                      <MapPin size={16} />
                      Pickup Point
                    </h6>
                    <p className="mb-0 text-muted">Kalma Chowk</p>
                    <small className="text-muted">
                      {data?.travel_date.split("T")[0] || "N/A"}
                    </small>
                  </div>
                  {/* <div className="d-flex gap-2 mb-3">
                    <Badge bg="warning" className="px-3 py-2">
                      <span className="fw-normal">Luxury</span>
                    </Badge>
                    <Badge bg="success" className="px-3 py-2">
                      <span className="fw-normal">Refundable</span>
                    </Badge>
                  </div> */}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}
