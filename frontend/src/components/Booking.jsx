import React from "react";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";
import { Bus, Clock, MapPin, Calendar, ArrowRight } from "lucide-react";
import { extractTime12HourFormat } from "../utils/helpers";

export default function Booking({ data }) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-lg mb-4">
            <Card.Body className="p-4">
              {/* Header Section */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                    <Bus size={24} className="text-primary" />
                  </div>
                  <h4 className="mb-0 text-primary">Daewoo Express</h4>
                </div>
                <Badge bg="success" className="px-3 py-2">
                  Active
                </Badge>
              </div>

              {/* Journey Time */}
              <Card className="border-0 bg-light mb-3">
                <Card.Body className="py-3">
                  <div className="d-flex align-items-center gap-3">
                    <Clock size={20} className="text-primary" />
                    <div className="d-flex align-items-center gap-2 flex-grow-1">
                      <span className="h5 mb-0">
                        {extractTime12HourFormat(data?.trip?.departure_time)}
                      </span>
                      <div className="flex-grow-1 px-3 border-top border-2 position-relative">
                        <ArrowRight
                          size={20}
                          className="text-primary position-absolute"
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </div>
                      <span className="h5 mb-0">
                        {extractTime12HourFormat(data?.trip?.arrival_time)}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Route Information */}
              <Card className="border-0 bg-light mb-4">
                <Card.Body className="py-3">
                  <div className="d-flex align-items-center gap-3">
                    <MapPin size={20} className="text-primary" />
                    <div className="d-flex align-items-center gap-2 flex-grow-1">
                      <span className="h6 mb-0">
                        {data?.trip?.Route?.source || "N/A"}
                      </span>
                      <div className="flex-grow-1 px-3 border-top border-2 position-relative">
                        <ArrowRight
                          size={20}
                          className="text-primary position-absolute"
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </div>
                      <span className="h6 mb-0">
                        {data?.trip?.Route?.destination || "N/A"}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Pickup Information */}
              <div className="bg-primary bg-opacity-10 rounded-3 p-4">
                <h6 className="d-flex align-items-center gap-2 text-primary mb-3">
                  <MapPin size={18} />
                  Pickup Information
                </h6>
                <div className="ms-4">
                  <p className="h5 mb-2">Kalma Chowk</p>
                  <div className="d-flex align-items-center gap-2 text-muted">
                    <Calendar size={16} />
                    <span>{data?.travel_date?.split("T")[0] || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Feature Badges */}
              <div className="d-flex gap-2 mt-4">
                <Badge
                  bg="warning"
                  className="px-3 py-2 d-flex align-items-center gap-2"
                >
                  <span className="fw-normal">Luxury</span>
                </Badge>
                <Badge
                  bg="success"
                  className="px-3 py-2 d-flex align-items-center gap-2"
                >
                  <span className="fw-normal">Refundable</span>
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
