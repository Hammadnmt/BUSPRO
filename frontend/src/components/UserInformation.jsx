import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserProfile from "./UserProfile";
import { Card, Col, Row } from "react-bootstrap";
import ActiveBooking from "./ActiveBooking";
import InActiveBooking from "./InActiveBooking";

function FillExample() {
  return (
    <>
      <div className="mx-5 my-4">
        <Row>
          <Col>
            <Card className="">
              <Card.Body
                className="text-white rounded-3 "
                style={{ backgroundColor: "#364F6B" }}
              >
                <Row className="">
                  <h3>Welcome back </h3>
                  <p>Information related to User & Bookings</p>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Tabs defaultActiveKey="home" id="fill-tab-example" className=" m-5" fill>
        <Tab eventKey="profile" title="Profile">
          <UserProfile />
        </Tab>
        <Tab eventKey="active" title="Future Bookings">
          <ActiveBooking />
        </Tab>
        <Tab eventKey="past" title="Past Bookings">
          <InActiveBooking />
        </Tab>
      </Tabs>
    </>
  );
}

export default FillExample;
