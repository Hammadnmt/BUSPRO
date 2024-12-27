import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { useGetTripsQuery } from "../features/trip/tripSlice.js";
const BusTicketCard = () => {
  const { data } = useGetTripsQuery();
  console.log(data)

  const departure_time = 123;
  return (
    <Card className="shadow-sm mb-3 w-50">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex align-items-center mb-2">
              {/* <img src="" alt="Daewoo" className="me-2" /> */}
              <span className="text-muted">Daewoo</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div>
                <h5 className="mb-1">
                  Hello- {departure_time}
                </h5>
                <div className="text-muted">
                  <span>Lahore (لاہور)</span>
                  <span className="mx-2">-</span>
                  <span> Rawalpindi / Islamabad (اسلام آباد)</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-primary mb-1">Kalma Chowk</div>
              <small className="text-muted">
                Daewoo Terminal Rawalpindi, Jhangi Sayyedan, Near EME College,
                No 26 Chungi Peshawar Road
              </small>
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
            <h4 className="mb-3">PKR 2,700</h4>
            <Button variant="primary">Check Seats</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BusTicketCard;
