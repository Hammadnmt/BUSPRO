import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { useGetBookingsByTripIdQuery } from "../features/booking/bookingSlice";
import { transformSeatsData } from "../utils/transformSeatsData";
import { Overlay, Popover } from "react-bootstrap";

export default function CheckSeats() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBookingsByTripIdQuery(id);
  const totalSeats = 20;
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [target, setTarget] = useState(null);
  const [bookedInfo, setBookedInfo] = useState([]);

  const getSeatInfo = (seatNum) => {
    if (!data) return { reserved: false, gender: null };

    const reservations = transformSeatsData(data);

    for (const reservation of reservations) {
      const index = reservation.seat_numbers.indexOf(seatNum);
      if (index !== -1) {
        return { reserved: true, gender: reservation.genders[index] };
      }
    }

    // Check if the seat is in `bookedInfo`
    const userSelectedSeat = bookedInfo.find(
      (seat) => seat.seatNumber === seatNum
    );
    if (userSelectedSeat) {
      return { reserved: false, gender: userSelectedSeat.gender };
    }

    return { reserved: false, gender: null };
  };

  const handleSeatClick = (event, seatNumber) => {
    setTarget(event.target);
    setSelectedSeat(selectedSeat === seatNumber ? null : seatNumber);
  };

  const handleGenderSelect = (gender) => {
    setBookedInfo((prev) => {
      const existingSeat = prev.find(
        (seat) => seat.seatNumber === selectedSeat
      );
      if (existingSeat) {
        // Update the gender for an already selected seat
        return prev.map((seat) =>
          seat.seatNumber === selectedSeat ? { ...seat, gender } : seat
        );
      }

      // Add a new seat to the selected list
      return [...prev, { seatNumber: selectedSeat, gender }];
    });

    setSelectedSeat(null); // Close the popover after selection
  };

  if (isLoading) return <div className="spinner-border" role="status"></div>;
  if (error)
    return <div className="alert alert-danger">Error loading seat data</div>;

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="mb-3">Seat Layout</h2>
        <div className="d-flex gap-3 mb-3">
          <div className="d-flex align-items-center">
            <div
              className="me-2 bg-primary"
              style={{ width: "24px", height: "24px" }}
            ></div>
            <span>Male</span>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="me-2 bg-danger"
              style={{ width: "24px", height: "24px" }}
            ></div>
            <span>Female</span>
          </div>
        </div>
      </div>

      <div className="row row-cols-4 g-3" style={{ maxWidth: "500px" }}>
        {Array.from({ length: totalSeats }, (_, index) => {
          const seatNumber = index + 1;
          const { reserved, gender } = getSeatInfo(seatNumber);

          let seatClass = "bg-light border";
          if (reserved) {
            seatClass =
              gender === "male"
                ? "bg-primary text-white"
                : "bg-danger text-white";
          } else {
            const selectedSeatInfo = bookedInfo.find(
              (seat) => seat.seatNumber === seatNumber
            );
            if (selectedSeatInfo) {
              seatClass =
                selectedSeatInfo.gender === "male"
                  ? "bg-primary text-white"
                  : "bg-danger text-white";
            }
          }

          return (
            <div key={seatNumber} className="col position-relative">
              <div
                className={`p-3 rounded text-center fw-bold ${seatClass} ${
                  !reserved ? "cursor-pointer" : ""
                }`}
                onClick={(e) => !reserved && handleSeatClick(e, seatNumber)}
              >
                {seatNumber}
              </div>

              <Overlay
                show={selectedSeat === seatNumber}
                target={target}
                placement="right"
                container={document.body}
              >
                <Popover
                  id={`popover-${seatNumber}`}
                  className="shadow-sm"
                  style={{ minWidth: "220px" }}
                >
                  <Popover.Header as="h3" className="bg-white border-bottom">
                    Select Gender
                  </Popover.Header>
                  <Popover.Body>
                    <div className="d-flex justify-content-around align-items-center gap-5 px-3">
                      <div
                        className="text-center cursor-pointer"
                        onClick={() => handleGenderSelect("male")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="bg-primary"
                            style={{ width: "24px", height: "24px" }}
                          ></div>
                          <span>Male</span>
                        </div>
                      </div>
                      <div
                        className="text-center cursor-pointer"
                        onClick={() => handleGenderSelect("female")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="bg-danger"
                            style={{ width: "24px", height: "24px" }}
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
      <div className="container mt-4">
        <Link
          to={`/book/${id}`}
          state={bookedInfo}
          className={`btn btn-primary ${
            bookedInfo.length === 0 ? "disabled" : ""
          }`}
        >
          Proceed
        </Link>
      </div>
    </div>
  );
}
