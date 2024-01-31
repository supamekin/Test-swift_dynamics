import {
  Outlet,
} from "react-router-dom";
import {
  Footer,
  Navbar,
} from "../components/common";

const Root = () => {

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ height:"calc(100vh - 120px)", maxHeight:"calc(100vh - 120px)"}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
