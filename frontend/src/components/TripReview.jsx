/* eslint-disable no-unused-vars */
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { extractTime12HourFormat } from "../utils/helpers";
import { Link, useLocation } from "react-router";
import { useGetTripByIdQuery } from "../features/trip/tripSlice";

const ReviewTrip = () => {
  const location = useLocation();
  const { state } = location;
  const bookedinfo = state?.bookedInfo || [];
  const id = state?.id;
  const { data, isLoading, error } = useGetTripByIdQuery(id);

  // // Fallback values to handle missing data
  // const departureTime = data?.departure_time
  //   ? extractTime12HourFormat(data.departure_time)
  //   : "N/A";
  // const arrivalTime = data?.arrival_time
  //   ? extractTime12HourFormat(data.arrival_time)
  //   : "N/A";
  // const route = data?.Route || {};
  // const fare = route.fare || 0;
  // const totalFare = fare * bookedinfo.length;

  if (isLoading) {
    return <div className="text-center">Loading trip details...</div>;
  }

  if (error || !data) {
    return (
      <div className="alert alert-danger text-center">
        Failed to load trip details. Please try again later.
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-3">
        <h3>Review Your Trip</h3>
      </div>
      <div className="d-flex w-100 gap-5">
        <div className="w-50">
          <Card className=" p-0">
            <Card.Body>
              <Row className=" align-items-center">
                <Col md={8}>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <h5 className="mb-1">Daweo</h5>
                      <div className="text-muted">
                        <span>
                          {extractTime12HourFormat(data?.departure_time)}
                        </span>
                        <span className="mx-2">-</span>
                        <span>
                          {extractTime12HourFormat(data?.arrival_time)}
                        </span>
                      </div>
                      <div className="text-muted">
                        <span>{data?.Route.source || "N/A"}</span>
                        <span className="mx-2">-</span>
                        <span>{data?.Route.destination || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-primary mb-1">Kalma Chowk</div>
                    <small className="text-muted">
                      {data?.description || "N/A"}
                    </small>
                  </div>

                  <div className="d-flex align-items-center">
                    <Badge bg="warning" className="me-2">
                      Luxury
                    </Badge>
                    <Badge bg="success">Refundable</Badge>
                  </div>
                </Col>
                <Col md={4} className="text-end">
                  <h5>Selected Seats</h5>
                  {bookedinfo.length > 0 &&
                    bookedinfo.map((seat, index) => (
                      <Badge
                        key={index}
                        style={{
                          backgroundColor:
                            seat.gender === "male" ? "blue" : "#FF69B4", // Custom colors for male and female
                        }}
                        bg=""
                        className="mb-3 me-2"
                      >
                        {seat.gender === "male"
                          ? `m-${seat.seatNumber}` // Display male seat with "m-"
                          : `f-${seat.seatNumber}`}{" "}
                      </Badge>
                    ))}

                  <h4 className="mb-3">Fare: PKR {data?.Route?.fare}</h4>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
        <div className="summary d-flex flex-column">
          <div>
            <div>
              <Row>
                <h3 className="py-2 px-4">Price Summary</h3>
              </Row>
            </div>
            <div>
              <Row>
                <div className="d-flex justify-content-between my-3">
                  <span>Daweo x {bookedinfo.length}</span>
                  <span>{bookedinfo.length * data?.Route?.fare}</span>
                </div>
              </Row>
              <Row>
                <div className="d-flex justify-content-between my-3">
                  <span>Price you Pay</span>
                  <span>PKR {data?.Route?.fare * bookedinfo.length}</span>
                </div>
              </Row>
            </div>
          </div>
          <div className="mb-">
            <Button
              as={Link}
              to={"/book"}
              state={{
                bookedInfo: bookedinfo,
                tripId: id,
                totalFare: data?.Route?.fare * bookedinfo.length,
              }}
              className="mt-1 px-5"
            >
              Continue Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTrip;
