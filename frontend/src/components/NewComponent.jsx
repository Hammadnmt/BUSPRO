import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge, Form } from 'react-bootstrap';

const BusSeatSelector = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Generate seats data
    const totalSeats = 34;
    const seatsData = Array.from({ length: totalSeats }, (_, index) => ({
        id: index + 1,
        type: [2, 4, 10, 16, 19, 22, 25, 33].includes(index + 1) ? 'female' : 'male',
        status: 'available'
    }));

    const handleSeatSelect = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else if (selectedSeats.length < 4) {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const getSeatColor = (seat) => {
        if (selectedSeats.includes(seat.id)) return 'bg-primary text-white';
        return seat.type === 'female' ? 'bg-pink-500' : 'bg-blue-600 text-white';
    };

    return (
        <Container className="p-4">
            <div className="mb-4">
                <h5 className="text-lg font-semibold">Select Your Seat</h5>
                <p className="text-sm text-gray-600">You can book maximum 4 seats at a time.</p>
                <div className="text-sm">1/34 Available seats</div>
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600"></div>
                    <span>Reserved (Male)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-500"></div>
                    <span>Reserved (Female)</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md">
                {seatsData.map((seat) => (
                    <Button
                        key={seat.id}
                        onClick={() => handleSeatSelect(seat.id)}
                        className={`w-12 h-12 flex items-center justify-center ${getSeatColor(seat)}`}
                        disabled={seat.status === 'reserved'}
                    >
                        {seat.id}
                    </Button>
                ))}
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-600">
                    Please select an available seat from the chart to continue.
                </p>
                <Button
                    className="w-full mt-2"
                    disabled={selectedSeats.length === 0}
                >
                    Continue Booking
                </Button>
            </div>
        </Container>
    );
};

export default BusSeatSelector;