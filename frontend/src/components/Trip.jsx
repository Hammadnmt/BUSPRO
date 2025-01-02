/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Button, Row, Col, Badge, Collapse } from "react-bootstrap";
import { Link } from "react-router";
import { useGetBookingsByTripIdQuery } from "../features/booking/bookingSlice";
import { transformSeatsData } from "../utils/transformSeatsData";
import { Overlay, Popover } from "react-bootstrap";
import { extractTime12HourFormat } from "../utils/helpers";

const Trip = ({ data }) => {
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [target, setTarget] = useState(null);
  const [bookedInfo, setBookedInfo] = useState([]);
  console.log(bookedInfo);
  const {
    data: bookingData,
    error,
    isLoading,
  } = useGetBookingsByTripIdQuery(data?._id, {
    skip: !showSeats,
  });

  const totalSeats = 20;
  const FEMALE_COLOR = "#FF69B4"; // Hot Pink color for female seats

  const getSeatInfo = (seatNum) => {
    if (!bookingData) return { reserved: false, gender: null };

    const reservations = transformSeatsData(bookingData);

    for (const reservation of reservations) {
      const index = reservation.seat_numbers.indexOf(seatNum);
      if (index !== -1) {
        return { reserved: true, gender: reservation.genders[index] };
      }
    }

    const userSelectedSeat = bookedInfo.find(
      (seat) => seat.seatNumber === seatNum
    );
    if (userSelectedSeat) {
      return { reserved: false, gender: userSelectedSeat.gender };
    }

    return { reserved: false, gender: null };
  };

  const handleSeatClick = (event, seatNumber) => {
    const isAlreadySelected = bookedInfo.some(
      (seat) => seat.seatNumber === seatNumber
    );

    if (isAlreadySelected) {
      setBookedInfo((prev) =>
        prev.filter((seat) => seat.seatNumber !== seatNumber)
      );
      setSelectedSeat(null);
    } else {
      setTarget(event.target);
      setSelectedSeat(selectedSeat === seatNumber ? null : seatNumber);
    }
  };

  const handleGenderSelect = (gender) => {
    setBookedInfo((prev) => {
      const existingSeat = prev.find(
        (seat) => seat.seatNumber === selectedSeat
      );
      if (existingSeat) {
        return prev.map((seat) =>
          seat.seatNumber === selectedSeat ? { ...seat, gender } : seat
        );
      }
      return [...prev, { seatNumber: selectedSeat, gender }];
    });
    setSelectedSeat(null);
  };

  const handleUnselectSeat = (seatNumber) => {
    setBookedInfo((prev) =>
      prev.filter((seat) => seat.seatNumber !== seatNumber)
    );
  };

  const getSeatStyle = (gender) => {
    if (gender === "female") {
      return { backgroundColor: FEMALE_COLOR };
    }
    return {};
  };

  return (
    <Card className="shadow-sm mb-3 w-100">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <h5 className="mb-1">Daweo</h5>
                <div className="text-muted">
                  <span>{extractTime12HourFormat(data?.departure_time)} </span>
                  <span className="mx-2">-</span>
                  <span>{extractTime12HourFormat(data?.arrival_time)}</span>
                </div>
                <div className="text-muted">
                  <span>{data?.Route?.source} </span>
                  <span className="mx-2">-</span>
                  <span>{data?.Route?.destination}</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-primary mb-1">Kalma Chowk</div>
              <small className="text-muted">{data?.description}</small>
            </div>

            <div className="d-flex align-items-center">
              <Badge bg="warning" className="me-2">
                Luxury
              </Badge>
              <Badge bg="success">Refundable</Badge>
            </div>
          </Col>
          <Col md={4} className="text-end">
            <h4 className="mb-3">PKR {data?.Route?.fare}</h4>
            <Button
              onClick={() => setShowSeats(!showSeats)}
              variant={showSeats ? "secondary" : "primary"}
              className="me-2"
            >
              {showSeats ? "Hide Seats" : "Check Seats"}
            </Button>
            {bookedInfo.length > 0 && (
              <Button
                as={Link}
                to="/review"
                state={{
                  bookedInfo,
                  id: data?._id,
                }}
                variant="success"
              >
                Continue Booking
              </Button>
            )}
          </Col>
        </Row>

        <Collapse in={showSeats}>
          <div className="mt-4 border-top pt-4">
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">Error loading seat data</div>
            ) : (
              <>
                <div className="mb-4">
                  <h5 className="mb-3">Select Your Seats</h5>
                  <div className="d-flex gap-3 mb-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="me-2 bg-primary"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                        }}
                      ></div>
                      <span className="small">Male</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="me-2"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          backgroundColor: FEMALE_COLOR,
                        }}
                      ></div>
                      <span className="small">Female</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="me-2 bg-light border"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                        }}
                      ></div>
                      <span className="small">Available</span>
                    </div>
                  </div>

                  {bookedInfo.length > 0 && (
                    <div className="mb-3 p-3 bg-light rounded">
                      <h6 className="mb-2">Selected Seats:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {bookedInfo.map((seat) => (
                          <Badge
                            key={seat.seatNumber}
                            bg={seat.gender === "male" ? "primary" : ""}
                            style={getSeatStyle(seat.gender)}
                            className="d-flex align-items-center"
                          >
                            Seat {seat.seatNumber}
                            <button
                              className="ms-2 btn btn-link btn-sm text-white p-0 border-0"
                              onClick={() =>
                                handleUnselectSeat(seat.seatNumber)
                              }
                              style={{
                                fontSize: "14px",
                                textDecoration: "none",
                              }}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                        <div className="text-muted">
                          {" "}
                          PKR: {bookedInfo.length * data?.Route?.fare}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="row row-cols-5 g-2"
                  style={{ maxWidth: "600px" }}
                >
                  {Array.from({ length: totalSeats }, (_, index) => {
                    const seatNumber = index + 1;
                    const { reserved, gender } = getSeatInfo(seatNumber);

                    let seatClass = "bg-light border";
                    let seatStyle = {};

                    if (
                      reserved ||
                      bookedInfo.some((seat) => seat.seatNumber === seatNumber)
                    ) {
                      if (gender === "male") {
                        seatClass = "bg-primary text-white";
                      } else if (gender === "female") {
                        seatClass = "text-white";
                        seatStyle = { backgroundColor: FEMALE_COLOR };
                      }
                    }

                    return (
                      <div key={seatNumber} className="col position-relative">
                        <div
                          className={`p-2 rounded text-center fw-bold ${seatClass} ${
                            !reserved ? "cursor-pointer hover-opacity-75" : ""
                          }`}
                          style={{
                            cursor: !reserved ? "pointer" : "not-allowed",
                            ...seatStyle,
                          }}
                          onClick={(e) =>
                            !reserved && handleSeatClick(e, seatNumber)
                          }
                        >
                          {seatNumber}
                        </div>

                        <Overlay
                          show={selectedSeat === seatNumber}
                          target={target}
                          placement="top"
                          container={document.body}
                        >
                          <Popover
                            id={`popover-${seatNumber}`}
                            className="shadow-sm"
                          >
                            <Popover.Header
                              as="h6"
                              className="bg-white border-bottom py-2"
                            >
                              Select Gender for Seat {seatNumber}
                            </Popover.Header>
                            <Popover.Body className="p-2">
                              <div className="d-flex justify-content-around align-items-center gap-3">
                                <div
                                  className="text-center p-2 rounded hover-bg-light"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleGenderSelect("male")}
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <div
                                      className="bg-primary"
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "4px",
                                      }}
                                    ></div>
                                    <span>Male</span>
                                  </div>
                                </div>
                                <div
                                  className="text-center p-2 rounded hover-bg-light"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleGenderSelect("female")}
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <div
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "4px",
                                        backgroundColor: FEMALE_COLOR,
                                      }}
                                    ></div>
                                    <span>Female</span>
                                  </div>
                                </div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default Trip;
