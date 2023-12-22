import { useEffect } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { newPostCreatedToast } from "../../utils/toastify";

function NewPostCreateNewPostButton(props) {
  // Handle create new post
  function handleCreateNewPost() {
    props.onCreateNewPost();
  }

  // Conditional create new post button
  function handleCreateNewPostButton() {
    if (props.selectedMovieID === null) {
      return "Search & Select a movie";
    } else if (props.newPostCaption === "") {
      return "Add a caption";
    } else {
      return "Create New Post";
    }
  }

  // Listen for create new post status change
  useEffect(() => {
    if (props.createNewPostStatus === "success") {
      // Notify user of new post creation
      newPostCreatedToast();
      // Reset create new post status
      props.resetCreatePostStatus();
      // Close modal
      props.closeModal();
    }
  }, [props.createNewPostStatus]);

  return (
    <button
      className="flex justify-center items-center bg-pins-primary text-white font-bold text-lg rounded-lg px-5 py-2 mt-4 hover:bg-pins-primary/80 transition duration-150 ease-in-out disabled:bg-pins-primary/50 disabled:cursor-not-allowed"
      onClick={handleCreateNewPost}
      disabled={props.selectedMovieID === null || props.newPostCaption === ""}
    >
      {props.createNewPostStatus === "loading" ? (
        <>
          <IoReloadOutline size={20} className="animate-spin mr-2" /> Creating
          New Post...
        </>
      ) : (
        handleCreateNewPostButton()
      )}
    </button>
  );
}

export default NewPostCreateNewPostButton;
