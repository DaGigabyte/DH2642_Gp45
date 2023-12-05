import { Outlet, Link } from "react-router-dom";
// Components
import Sidebar from "../components/layout/Sidebar";
import Search from "./Searchbar";
import NewPostButton from "./CreatePostButton";

function RootView(props) {
  return (
    <div className="flex flex-col min-h-screen bg-pins-light md:flex-row">
      <Sidebar />
      <div className="flex-1">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4">
          <div className="w-full sm:w-1/2 self-center">
            <Search
              searchText={props.searchText || ""}
              onUserTyping={props.setSearchText}
              onUserSearching={props.confirmUserSearch}
            />
          </div>
          <div className="flex space-x-5 justify-end">
            <div className="flex-none self-center ">
              <NewPostButton
                onUserClick={() => {
                  window.location.hash = "#/newPost";
                }} //TODO change to real routing
              />
              <button onClick={props.onSignIn}>Sign in</button>
              <button onClick={props.onSignOut}>Sign out</button>
            </div>
              {props.profilePicture && 
              <Link to={{pathname: ("/profile/" + props.uid)}} >
                <img
                  className="rounded-full self-center h-12 shadow hover:scale-110 transition duration-300"
                  src={props.profilePicture}
                  alt="profile picture"
                />
              </Link> }
          </div>
        </div>
        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootView;