import React from "react";
import { Card, Row, Col, Badge, Button, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import { useGetTripByIdQuery } from "../features/trip/tripSlice";
import { extractTime12HourFormat } from "../utils/helpers";
import { Clock, MapPin, DollarSign, Users, Bus } from "lucide-react";

const ReviewTrip = () => {
  const location = useLocation();
  const { state } = location;
  const bookedinfo = state?.bookedInfo || [];
  const id = state?.id;
  const { data, isLoading, error } = useGetTripByIdQuery(id);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <Container className="py-5">
        <Card className="border-danger text-center">
          <Card.Body>
            <Card.Title className="text-danger">
              Error Loading Trip Details
            </Card.Title>
            <Card.Text>
              Failed to load trip details. Please try again later.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const totalFare = data?.Route?.fare * bookedinfo.length;

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-primary border-bottom pb-3">Review Your Trip</h2>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h4 className="mb-0 d-flex align-items-center gap-2">
                <Bus size={20} className="text-primary" />
                Trip Details
              </h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <div className="mb-4">
                    <h5 className="text-primary mb-3">Daweo Express</h5>

                    <div className="d-flex align-items-center mb-3">
                      <Clock className="text-muted me-2" size={18} />
                      <span className="fw-bold">
                        {extractTime12HourFormat(data?.departure_time)}
                        <span className="mx-2">→</span>
                        {extractTime12HourFormat(data?.arrival_time)}
                      </span>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <MapPin className="text-muted me-2" size={18} />
                      <span>
                        {data?.Route.source || "N/A"}
                        <span className="mx-2">→</span>
                        {data?.Route.destination || "N/A"}
                      </span>
                    </div>

                    <div className="border-top border-bottom py-3 my-3">
                      <h6 className="text-primary mb-2 d-flex align-items-center gap-2">
                        <MapPin size={16} />
                        Pickup Point
                      </h6>
                      <p className="mb-0 text-muted">Kalma Chowk</p>
                      <small className="text-muted">
                        {data?.description || "N/A"}
                      </small>
                    </div>

                    <div className="d-flex gap-2 mb-3">
                      <Badge bg="warning" className="px-3 py-2">
                        <span className="fw-normal">Luxury</span>
                      </Badge>
                      <Badge bg="success" className="px-3 py-2">
                        <span className="fw-normal">Refundable</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="border-top pt-3">
                    <h6 className="mb-3 d-flex align-items-center gap-2">
                      <Users size={16} />
                      Selected Seats
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {bookedinfo.map((seat, index) => (
                        <Badge
                          key={index}
                          bg={seat.gender === "male" ? "primary" : "danger"}
                          className="px-3 py-2"
                        >
                          {seat.gender === "male" ? "M" : "F"}-{seat.seatNumber}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h4 className="mb-0 d-flex align-items-center gap-2">
                <DollarSign size={20} className="text-primary" />
                Price Summary
              </h4>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <Users className="me-2" size={18} />
                    <span>Passengers</span>
                  </div>
                  <Badge bg="secondary">{bookedinfo.length}</Badge>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <DollarSign className="me-2" size={18} />
                    <span>Fare per person</span>
                  </div>
                  <span>PKR {data?.Route?.fare}</span>
                </div>

                <div className="border-top pt-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Total Amount</h5>
                    <h5 className="mb-0 text-primary">PKR {totalFare}</h5>
                  </div>
                </div>
              </div>

              <Button
                as={Link}
                to="/book"
                state={{
                  bookedInfo: bookedinfo,
                  tripId: id,
                  totalFare: totalFare,
                }}
                className="w-100 py-2"
                size="lg"
              >
                Continue Booking
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewTrip;
