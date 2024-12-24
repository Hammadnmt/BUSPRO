import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Login from "./Login";
import Signup from "./Signup";

function UncontrolledExample() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        <Login />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <Signup />
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default UncontrolledExample;
