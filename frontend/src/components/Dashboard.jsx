import Card from "react-bootstrap/Card";
import { ToastContainer } from "react-toastify";
function Dashboard() {
  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center">
        <Card className="dashboard-card m-2">
          <Card.Body>
            <Card.Title>Total Products </Card.Title>
            <Card.Text>1</Card.Text>
          </Card.Body>
        </Card>
        <Card className="dashboard-card m-2">
          <Card.Body>
            <Card.Title>Total users </Card.Title>
            <Card.Text>2</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default Dashboard;
