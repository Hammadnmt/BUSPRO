import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Card, Container, Col, Row } from "react-bootstrap";
import { UserCircle2, Calendar, History } from "lucide-react";
import UserProfile from "./UserProfile";
import ActiveBooking from "./ActiveBooking";
import InActiveBooking from "./InActiveBooking";

const Profile = () => {
  return (
    <Container fluid>
      {/* Welcome Card */}
      <Row className="my-4">
        <Col>
          <Card className="shadow">
            <Card.Body
              style={{ backgroundColor: "#4A90E2" }}
              className="text-white"
            >
              <Row className="align-items-center">
                <Col md={9}>
                  <h2 className="mb-2">Welcome back!</h2>
                  <p className="mb-0">
                    Manage your profile and bookings in one place
                  </p>
                </Col>
                <Col md={3} className="d-none d-md-flex justify-content-end">
                  <UserCircle2 size={48} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Tabs defaultActiveKey="profile" fill className="mb-3">
                <Tab
                  eventKey="profile"
                  title={
                    <div className="d-flex align-items-center gap-2">
                      <UserCircle2 size={18} />
                      <span>Profile</span>
                    </div>
                  }
                >
                  <UserProfile />
                </Tab>
                <Tab
                  eventKey="active"
                  title={
                    <div className="d-flex align-items-center gap-2">
                      <Calendar size={18} />
                      <span>Future Bookings</span>
                    </div>
                  }
                >
                  <ActiveBooking />
                </Tab>
                <Tab
                  eventKey="past"
                  title={
                    <div className="d-flex align-items-center gap-2">
                      <History size={18} />
                      <span>Past Bookings</span>
                    </div>
                  }
                >
                  <InActiveBooking />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
