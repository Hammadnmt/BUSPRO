import TravelSearchForm from "../components/SearchForm";
import UserNavBar from "../components/UserNavbar";
function Home() {
  return (
    <div className="mx-auto">
      <UserNavBar />
      <TravelSearchForm />
    </div>
  );
}

export default Home;
