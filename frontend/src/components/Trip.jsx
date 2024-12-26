import { Container, Row } from "react-bootstrap";
import { useGetTripsQuery } from "../features/trip/tripSlice.js";
export default function Trip() {
  const { data, isLoading, isSuccess } = useGetTripsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data[0]);
  return (
    <Container>
      <Row>
        <div className="d-flex  ">
          <div className="w-50">
            <div className="border border-2 ">
              <h1></h1>
              <p>
                {data[0].Route.source}--{data[0].Route.destination}
              </p>
              <small>location: Thokar Niaz Baig</small>
            </div>
          </div>
          <div className="p-3 px-2 flex-shrink-1 border border-2 ">
            <p>Rs: 999</p>
            <button className="">Book Now</button>
          </div>
        </div>
      </Row>
    </Container>
  );
}
