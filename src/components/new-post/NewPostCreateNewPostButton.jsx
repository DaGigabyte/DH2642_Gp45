import React from "react";

function NewPostCreateNewPostButton(props) {
  // Handle create new post
  function handleCreateNewPost() {
    props.onCreateNewPost();
    props.closeModal();
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

  return (
    <button
      className="bg-pins-primary text-white font-bold text-lg rounded-lg px-5 py-2 mt-4 hover:bg-pins-primary/80 transition duration-150 ease-in-out disabled:bg-pins-primary/50 disabled:cursor-not-allowed"
      onClick={handleCreateNewPost}
      disabled={props.selectedMovieID === null || props.newPostCaption === ""}
    >
      {handleCreateNewPostButton()}
    </button>
  );
}

export default NewPostCreateNewPostButton;
