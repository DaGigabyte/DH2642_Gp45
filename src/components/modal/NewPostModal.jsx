import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Modal from "./Modal";
// Components
import CreateNewPostContainer from "../new-post/CreateNewPostContainer";

function NewPostModal(props) {
  const [open, setOpen] = useState(false);

  // Handle close modal
  function handleCloseModal() {
    setOpen(false);
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button className="flex items-center justify-center text-lg md:text-sm lg:text-lg text-white font-bold bg-pins-primary px-5 py-2 md:px-2 lg:px-5 rounded-2xl shadow hover:scale-105 transition duration-75">
        <IoAddOutline
          className="text-white mr-3 md:mr-1 lg:mr-3 flex-shrink-0 h-6 w-6 md:h-4 lg:h-6 md:w-4 lg:w-6"
          aria-hidden="true"
        />{" "}
        Create New Post
      </Modal.Button>
      <Modal.Content title="Create New Post">
        <CreateNewPostContainer
          isSearching={props.isSearching}
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
          onSetPostRating={props.onSetPostRating}
          newPostRating={props.newPostRating}
          closeModal={handleCloseModal}
        />
      </Modal.Content>
    </Modal>
  );
}

export default NewPostModal;
