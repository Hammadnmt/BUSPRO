import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { CheckCircle2, MoveRight, Bus, Mail, Clock } from "lucide-react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useGetUserByIdQuery } from "../features/user/userSlice";
import { useGetBookingByUserIdRouteIdQuery } from "../features/booking/bookingSlice";
import { getUser } from "../utils/getUser";
import { Capitalize, extractTime12HourFormat } from "../utils/helpers";

export default function BookingConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data: userData } = useGetUserByIdQuery(getUser());
  const { data: bookingData, isLoading } = useGetBookingByUserIdRouteIdQuery({
    id: getUser(),
    bookId: state.bookId,
  });
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="border-0 shadow-lg">
            {/* Header Section */}
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="d-inline-flex justify-content-center align-items-center bg-success bg-opacity-10 rounded-circle p-3 mb-3">
                  <CheckCircle2 size={40} className="text-success" />
                </div>
                <h2 className="mb-0">Booking Confirmed!</h2>
              </div>

              {/* User Info */}
              <Alert variant="success" className="mb-4">
                <p className="mb-0 fw-bold">
                  Hello {Capitalize(userData?.name)}, your booking has been
                  confirmed!
                </p>
              </Alert>

              {/* Journey Details */}
              <Card className="border-0 bg-light mb-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={12} md={6} className="mb-3 mb-md-0">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded">
                          <MoveRight size={24} className="text-primary" />
                        </div>
                        <div>
                          <small className="text-muted d-block">Route</small>
                          <span className="fw-bold">
                            {Capitalize(bookingData[0]?.trip?.Route?.source)} →{" "}
                            {Capitalize(
                              bookingData[0]?.trip?.Route?.destination
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded">
                          <Clock size={24} className="text-primary" />
                        </div>
                        <div>
                          <small className="text-muted d-block">Time</small>
                          <span className="fw-bold">
                            {extractTime12HourFormat(
                              bookingData[0]?.trip?.departure_time
                            )}{" "}
                            →{" "}
                            {extractTime12HourFormat(
                              bookingData[0]?.trip?.arrival_time
                            )}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="text-center text-md-end">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-2 mb-2">
                          <Bus size={32} className="text-primary" />
                          <h3 className="mb-0">BusPRO</h3>
                        </div>
                        <p className="text-muted mb-0">Where comfort thrives</p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Email Confirmation */}
              <div className="bg-light rounded p-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Mail size={20} className="text-primary" />
                  <span>Confirmation sent to:</span>
                </div>
                <p className="fw-bold mb-0">{userData?.email}</p>
              </div>
            </Card.Body>
          </Card>

          {/* Auto Redirect Notice */}
          <div className="text-center mt-3 text-muted">
            <small>
              You will be redirected to the homepage in a few seconds...
            </small>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
