import { Card, Button, Row, Col, Badge } from "react-bootstrap";
const Trip = ({ data }) => {
  return (
    <Card className="shadow-sm mb-3 w-50">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex align-items-center mb-2">
              {/* <img src="" alt="Daewoo" className="me-2" /> */}
              <span className="text-muted">{data?.Route?.arrival_time}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div>
                <h5 className="mb-1">Daweo</h5>
                <div className="text-muted">
                  <span>{data?.departure_time} </span>
                  <span className="mx-2">-</span>
                  <span>{data?.arrival_time}</span>
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
              {/* <Headphones size={16} className="me-2 text-muted" /> */}
              {/* <Settings size={16} className="me-2 text-muted" /> */}
              <Badge bg="warning" className="me-2">
                Luxury
              </Badge>
              <Badge bg="success">Refundable</Badge>
            </div>
          </Col>

          <Col md={4} className="text-end">
            <h4 className="mb-3">PKR {data?.Route?.fare}</h4>
            <Button variant="primary">Check Seats</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Trip;
