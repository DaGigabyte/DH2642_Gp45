import React from "react";

function NewPostCreateNewPostButton(props) {
  // Conditional create new post button
  function handleCreateNewPostButton() {
    if (props.selectedMovieID === null) {
      return "Select a movie";
    } else if (props.newPostCaption === "") {
      return "Add a caption";
    } else {
      return "Create New Post";
    }
  }

  return (
    <button
      className="bg-pins-primary text-white font-bold text-lg rounded-lg px-5 py-2 mt-4 hover:bg-pins-primary/80 transition duration-150 ease-in-out disabled:bg-pins-primary/50 disabled:cursor-not-allowed"
      onClick={props.onCreateNewPost}
      disabled={props.selectedMovieID === null || props.newPostCaption === ""}
    >
      {handleCreateNewPostButton()}
    </button>
  );
}

export default NewPostCreateNewPostButton;
