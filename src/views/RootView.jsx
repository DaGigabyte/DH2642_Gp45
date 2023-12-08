import { useState } from "react";
import { Outlet } from "react-router-dom";
// Components
import Sidebar from "../components/layout/Sidebar";
import NewPostModal from "../components/modal/NewPostModal";
import Search from "./Searchbar";
import UserAvatarAndMenu from "../components/topbar/UserAvatarAndMenu";
import LogInButton from "../components/topbar/LogInButton";
import SearchbarPresenter from "../presenters/SearchbarPresenter";
import { IoSearchOutline } from "react-icons/io5";

function RootView(props) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-pins-light md:flex-row">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1">
        {/* Sticky top bar */}
        <div className="sticky top-[66px] z-10 flex flex-row md:top-0  justify-between p-4 bg-pins-light bg-opacity-95">
          <div className="flex md:w-1/2">
            {/* Mobile search button */}
            <button
              onClick={() => setShowSearch(() => !showSearch)}
              className="flex md:hidden items-center justify-center group bg-pins-grey-dark rounded-2xl w-11 h-11 select-none outline-none hover:bg-pins-grey-darker hover:cursor-pointer transition ease-in-out duration-100"
            >
              <IoSearchOutline className="text-black h-6 w-6 group-hover:text-pins-light" />
            </button>
            {/* Search bar */}
            <div
              className={`${
                showSearch ? "" : "hidden"
              } md:flex w-full self-center`}
            >
              <SearchbarPresenter />
            </div>
          </div>

          {/* Create new post button, user avatar */}
          <div
            className={`${
              showSearch ? "hidden" : "flex"
            } md:flex items-center space-x-5 md:space-x-1 lg:space-x-5 justify-end`}
          >
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
