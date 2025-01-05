import React from "react";
import Card from "react-bootstrap/Card";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { useGetAllusersQuery } from "../features/user/userSlice"
import { useGetTripsQuery } from "../features/trip/tripSlice"
import { useGetBookingsQuery } from "../features/booking/bookingSlice"

function Dashboard() {
  const { data: users } = useGetAllusersQuery();
  const { data: trips } = useGetTripsQuery();
  const { data: bookings } = useGetBookingsQuery();
  return (
    <>
      <ToastContainer />
      <Container fluid className="py-4">
        <h2 className="mb-4 text-center">Admin Dashboard</h2>
        <Row>
          {/* Metrics Cards */}
          <Col md={4}>
            <Card className="mb-4 text-center shadow-sm border-primary">
              <Card.Body>
                <Card.Title className="text-primary">Total Trips</Card.Title>
                <Card.Text className="display-4 text-success">{trips?.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 text-center shadow-sm border-secondary">
              <Card.Body>
                <Card.Title className="text-secondary">Total Users</Card.Title>
                <Card.Text className="display-4 text-info">{users?.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 text-center shadow-sm border-warning">
              <Card.Body>
                <Card.Title className="text-warning">Total Booking</Card.Title>
                <Card.Text className="display-4 text-danger">{bookings?.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Progress Bars Section */}
        <Row>
          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Order Fulfillment</Card.Title>
                <ProgressBar now={70} label="70%" variant="success" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Active Users</Card.Title>
                <ProgressBar now={users?.length} label={`${users?.length}%`} variant="info" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Placeholder for Chart or Detailed View */}
        <Row>
          <Col>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Sales Overview</Card.Title>
                <div className="text-center text-muted">
                  <p>Chart placeholder</p>
                  <p>(e.g., Bar Chart, Line Chart, etc.)</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
