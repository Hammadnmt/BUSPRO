import React from "react";
import { Container } from "react-bootstrap";
import TravelSearchForm from "../components/SearchForm";
import UserNavBar from "../components/UserNavbar";

function Home() {
  return (
    <div>
      <UserNavBar />
      <Container fluid className="p-0">
        <TravelSearchForm />
      </Container>
    </div>
  );
}

export default Home;
