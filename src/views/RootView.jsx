import { Outlet } from "react-router-dom";
// Components
import Sidebar from "../components/layout/Sidebar";
import NewPostModal from "../components/modal/NewPostModal";
import Search from "./Searchbar";
import UserAvatarAndMenu from "../components/topbar/UserAvatarAndMenu";
import LogInButton from "../components/topbar/LogInButton";
import SearchbarPresenter from "../presenters/SearchbarPresenter";

function RootView(props) {
  return (
    <div className="flex flex-col min-h-screen bg-pins-light md:flex-row">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1">
        {/* Sticky top bar */}
        <div className="sticky top-[66px] z-10 flex flex-col md:flex-row md:top-0 items-center justify-between p-4 bg-pins-light bg-opacity-95">
          <div className="w-full sm:w-1/2 self-center">
            <SearchbarPresenter />
          </div>
          <div className="flex items-center space-x-5 justify-end">
            {/* Create new post button */}
            {props.uid ? (
              <NewPostModal
                searchTextTMDB={props.searchTextTMDB}
                setSearchTextTMDB={props.setSearchTextTMDB}
                searchResultsTMDB={props.searchResultsTMDB}
                selectedMovieID={props.selectedMovieID}
                onSelectMovie={props.onSelectMovie}
                sourceENUM={props.sourceENUM}
                searchApiSource={props.searchApiSource}
                onSelectSearchApiSource={props.onSelectSearchApiSource}
                newPostCaption={props.newPostCaption}
                onSetNewPostCaption={props.onSetNewPostCaption}
                onCreateNewPost={props.onCreateNewPost}
              />
            ) : (
              <></>
            )}
            {/* User avatar and menu */}
            {props.uid ? (
              <UserAvatarAndMenu
                uid={props.uid}
                profilePicture={props.user?.data?.profilePicture || ""}
                signOut={props.onSignOut}
              />
            ) : (
              <LogInButton signIn={props.onSignIn} />
            )}
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
