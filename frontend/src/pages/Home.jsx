import TravelSearchForm from "../components/SearchForm";
import UserNavBar from "../components/UserNavbar";
function Home() {
  return (
    <div className="">
      <UserNavBar />
      <div className="">
        <TravelSearchForm />
      </div>
    </div>
  );
}

export default Home;
