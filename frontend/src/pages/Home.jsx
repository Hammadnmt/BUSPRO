import React from "react";
import { Container } from "react-bootstrap";
import TravelSearchForm from "../components/SearchForm";
import UserNavbar from "../components/UserNavbar";

function Home() {
  return (
    <div>
      <UserNavbar />  
      <Container fluid className="p-0 min-vh-100">
        <TravelSearchForm />
      </Container>
    </div>
  );
}

export default Home;
