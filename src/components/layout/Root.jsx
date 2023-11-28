import { Outlet } from "react-router-dom";
// Components
import Sidebar from "./Sidebar";

function Root() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
