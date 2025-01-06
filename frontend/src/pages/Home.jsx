import React from "react";
import { Container } from "react-bootstrap";
import TravelSearchForm from "../components/SearchForm";

function Home() {
  return (
    <div>
      <Container fluid className="p-0">
        <TravelSearchForm />
      </Container>
    </div>
  );
}

export default Home;
