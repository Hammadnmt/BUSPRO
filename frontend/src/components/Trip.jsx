import React, { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Badge,
  Collapse,
  Overlay,
  Popover,
  Container,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router";
import { Clock, MapPin, Info } from "lucide-react";
import { useGetBookingsByTripIdQuery } from "../features/booking/bookingSlice";
import { transformSeatsData } from "../utils/transformSeatsData";
import { extractTime12HourFormat } from "../utils/helpers";
// Constants
const COLORS = {
  primary: "#364F6B",
  secondary: "#3FC1C9",
  light: "#F5F5F5",
  accent: "#FC5185",
};

const TOTAL_SEATS = 20;

const Trip = ({ data }) => {
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [target, setTarget] = useState(null);
  const [bookedInfo, setBookedInfo] = useState([]);

  const {
    data: bookingData,
    error,
    isLoading,
  } = useGetBookingsByTripIdQuery(data?._id, {
    skip: !showSeats,
  });
  console.log("selectedSeat", selectedSeat);
  // Seat information helpers
  const getSeatInfo = (seatNum) => {
    if (!bookingData) return { reserved: false, gender: null };
    const reservations = transformSeatsData(bookingData);

    const existingReservation = reservations.find((reservation) =>
      reservation.seat_numbers.includes(seatNum)
    );

    if (existingReservation) {
      const index = existingReservation.seat_numbers.indexOf(seatNum);
      return {
        reserved: true,
        gender: existingReservation.genders[index],
      };
    }

    const userSelection = bookedInfo.find((seat) => seat.seatNumber === seatNum);
    return {
      reserved: false,
      gender: userSelection?.gender || null,
    };
  };

  // Event handlers
  const handleSeatClick = (event, seatNumber) => {
    const isAlreadySelected = bookedInfo.some((seat) => seat.seatNumber === seatNumber);

    if (isAlreadySelected) {
      setBookedInfo((prev) => prev.filter((seat) => seat.seatNumber !== seatNumber));
      setSelectedSeat(null);
    } else {
      setTarget(event.target);
      setSelectedSeat(selectedSeat === seatNumber ? null : seatNumber);
    }
  };

  const handleGenderSelect = (gender) => {
    setBookedInfo((prev) => {
      const existingSeat = prev.find((seat) => seat.seatNumber === selectedSeat);
      if (existingSeat) {
        return prev.map((seat) => (seat.seatNumber === selectedSeat ? { ...seat, gender } : seat));
      }
      return [...prev, { seatNumber: selectedSeat, gender }];
    });
    setSelectedSeat(null);
  };

  const handleUnselectSeat = (seatNumber) => {
    setBookedInfo((prev) => prev.filter((seat) => seat.seatNumber !== seatNumber));
  };

  const user = JSON.parse(localStorage.getItem("user"));
  // Render helpers
  const renderSeatLegend = () => (
    <div className="d-flex gap-4 mb-4">
      {[
        { color: COLORS.primary, label: "Male" },
        { color: COLORS.accent, label: "Female" },
        { color: COLORS.light, label: "Available", border: true },
      ].map(({ color, label, border }) => (
        <div key={label} className="d-flex align-items-center">
          <div
            className="me-2"
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              backgroundColor: color,
              ...(border && { border: "1px solid #ddd" }),
            }}
          />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );

  const renderSelectedSeats = () =>
    bookedInfo.length > 0 && (
      <Card className="mb-4 border-0" bg="light">
        <Card.Body>
          <h6 className="mb-3" style={{ color: COLORS.primary }}>
            Selected Seats:
          </h6>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            {bookedInfo.map((seat) => (
              <Badge
                key={seat.seatNumber}
                bg={seat.gender === "male" ? "primary" : "danger"}
                className="p-2"
                style={{
                  backgroundColor: seat.gender === "male" ? COLORS.primary : COLORS.accent,
                }}
              >
                Seat {seat.seatNumber}
                <Button
                  variant="link"
                  className="ms-2 p-0 text-white"
                  onClick={() => handleUnselectSeat(seat.seatNumber)}
                >
                  ×
                </Button>
              </Badge>
            ))}
            <div className="ms-3 fw-bold" style={{ color: COLORS.primary }}>
              Total: PKR {bookedInfo.length * data?.Route?.fare}
            </div>
          </div>
        </Card.Body>
      </Card>
    );

  return (
    <Card className="shadow-lg mb-4 border-0">
      <Card.Body className="p-4">
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex flex-column mb-3">
              <h4 className="mb-2" style={{ color: COLORS.primary }}>
                {data?.Bus?.bus_no || "Daweo"}
              </h4>

              <div className="d-flex align-items-center mb-2 text-muted">
                <Clock size={18} className="me-2" />
                <span>{extractTime12HourFormat(data?.departure_time)}</span>
                <span className="mx-2">→</span>
                <span>{extractTime12HourFormat(data?.arrival_time)}</span>
              </div>

              <div className="d-flex align-items-center mb-3 text-muted">
                <MapPin size={18} className="me-2" />
                <span>{data?.Route?.source}</span>
                <span className="mx-2">→</span>
                <span>{data?.Route?.destination}</span>
              </div>

              <Card className="mb-3 border-0" style={{ backgroundColor: COLORS.light }}>
                <Card.Body>
                  <div style={{ color: COLORS.secondary }} className="mb-2">
                    Pickup Point
                  </div>
                  <small className="text-muted">{data?.description}</small>
                </Card.Body>
              </Card>

              <div className="d-flex gap-2">
                <Badge pill bg="info" style={{ backgroundColor: COLORS.secondary }}>
                  Luxury
                </Badge>
                <Badge pill bg="danger" style={{ backgroundColor: COLORS.accent }}>
                  Refundable
                </Badge>
              </div>
            </div>
          </Col>

          <Col md={4} className="text-end">
            <h3 className="mb-3" style={{ color: COLORS.primary }}>
              PKR {data?.Route?.fare}
            </h3>
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant={showSeats ? "outline-secondary" : "primary"}
                onClick={() => setShowSeats(!showSeats)}
                style={
                  !showSeats
                    ? {
                        backgroundColor: COLORS.primary,
                        borderColor: COLORS.primary,
                      }
                    : {}
                }
              >
                {showSeats ? "Hide Seats" : "Check Seats"}
              </Button>

              {bookedInfo.length > 0 && (
                <Button
                  as={Link}
                  to={user ? "/review" : "/login"}
                  state={{ bookedInfo, id: data?._id }}
                  style={{
                    backgroundColor: COLORS.secondary,
                    borderColor: COLORS.secondary,
                  }}
                >
                  Continue Booking
                </Button>
              )}
            </div>
          </Col>
        </Row>

        <Collapse in={showSeats}>
          <div className="mt-4 pt-4 border-top">
            {isLoading ? (
              <div className="text-center p-4">
                <Spinner animation="border" style={{ color: COLORS.secondary }} />
              </div>
            ) : error ? (
              <Alert variant="danger">Error loading seat data</Alert>
            ) : (
              <Container fluid className="p-0">
                <h5 className="mb-4" style={{ color: COLORS.primary }}>
                  Select Your Seats
                </h5>

                {renderSeatLegend()}
                {renderSelectedSeats()}

                <Row xs={5} className="g-3" style={{ maxWidth: "600px" }}>
                  {Array.from({ length: TOTAL_SEATS }, (_, index) => {
                    const seatNumber = index + 1;
                    const { reserved, gender } = getSeatInfo(seatNumber);
                    const isSelected = bookedInfo.some((seat) => seat.seatNumber === seatNumber);

                    const seatStyle = {
                      backgroundColor:
                        reserved || isSelected
                          ? gender === "male"
                            ? COLORS.primary
                            : COLORS.accent
                          : COLORS.light,
                      border: !reserved && !isSelected ? "1px solid #ddd" : "none",
                      color: reserved || isSelected ? "#fff" : "inherit",
                      cursor: !reserved ? "pointer" : "not-allowed",
                      transition: "all 0.2s ease",
                    };

                    return (
                      <Col key={seatNumber}>
                        <div
                          className="p-3 rounded text-center fw-bold"
                          style={seatStyle}
                          onClick={(e) => !reserved && handleSeatClick(e, seatNumber)}
                        >
                          {seatNumber}
                        </div>

                        <Overlay show={selectedSeat === seatNumber} target={target} placement="top">
                          <Popover className="shadow-lg border-0">
                            <Popover.Header className="bg-white border-bottom py-2">
                              Select Gender for Seat {seatNumber}
                            </Popover.Header>
                            <Popover.Body className="p-3">
                              <div className="d-flex justify-content-around gap-3">
                                {["male", "female"].map((gender) => (
                                  <div
                                    key={gender}
                                    className="text-center p-2 rounded"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleGenderSelect(gender)}
                                  >
                                    <div className="d-flex align-items-center gap-2">
                                      <div
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "4px",
                                          backgroundColor: gender === "male" ? COLORS.primary : COLORS.accent,
                                        }}
                                      />
                                      <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            )}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default Trip;
