import { Outlet } from "react-router-dom";
import { NavBar } from "../components/ui";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="p-5">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
