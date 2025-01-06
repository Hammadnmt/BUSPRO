import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useGetAllusersQuery } from "../features/user/userSlice";
import { useGetTripsQuery } from "../features/trip/tripSlice";
import { useGetBookingsQuery } from "../features/booking/bookingSlice";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Bus,
  Calendar,
  TrendingUp,
  Activity,
  UserCheck,
} from "lucide-react";

const Dashboard = () => {
  const { data: users } = useGetAllusersQuery();
  const { data: trips } = useGetTripsQuery();
  const { data: bookings } = useGetBookingsQuery();

  const monthlyData = [
    { name: "Jan", bookings: 65, users: 40 },
    { name: "Feb", bookings: 78, users: 52 },
    { name: "Mar", bookings: 90, users: 61 },
    { name: "Apr", bookings: 81, users: 45 },
    { name: "May", bookings: 86, users: 58 },
    { name: "Jun", bookings: 95, users: 70 },
  ];

  return (
    <>
      <ToastContainer />
      <Container fluid className="p-4 bg-light min-vh-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 text-primary fw-bold">Admin Dashboard</h2>
          <span className="text-muted">Welcome back, Admin</span>
        </div>

        <Row className="g-4">
          <Col lg={4} md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-primary bg-opacity-10 me-3">
                  <Bus size={24} className="text-primary" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Trips</h6>
                  <h2 className="mb-0 fw-bold">{trips?.length || 0}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-success bg-opacity-10 me-3">
                  <Users size={24} className="text-success" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Users</h6>
                  <h2 className="mb-0 fw-bold">{users?.length || 0}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-warning bg-opacity-10 me-3">
                  <Calendar size={24} className="text-warning" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Bookings</h6>
                  <h2 className="mb-0 fw-bold">{bookings?.length || 0}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <TrendingUp size={20} className="text-primary" />
                    Booking Trends
                  </h5>
                </div>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#0d6efd"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#198754"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <Activity size={20} className="text-primary" />
                    Performance
                  </h5>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Order Fulfillment</span>
                    <span className="text-primary fw-bold">70%</span>
                  </div>
                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: "70%" }}
                      role="progressbar"
                    />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Active Users</span>
                    <span className="text-success fw-bold">
                      {users?.length || 0}%
                    </span>
                  </div>
                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${users?.length || 0}%` }}
                      role="progressbar"
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <UserCheck size={20} className="text-primary" />
                    User Activity Overview
                  </h5>
                </div>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#0d6efd" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
