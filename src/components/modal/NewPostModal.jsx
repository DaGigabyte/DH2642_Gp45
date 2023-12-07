import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Modal from "./Modal";
// Components
import CreateNewPost from "./CreateNewPost";

function NewPostModal(props) {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button className="flex items-center justify-center text-lg text-white font-bold bg-pins-primary px-5 py-2 rounded-2xl shadow hover:scale-105 transition duration-75">
        <IoAddOutline
          className="text-white mr-3 flex-shrink-0 h-6 w-6"
          aria-hidden="true"
        />{" "}
        Create New Post
      </Modal.Button>
      <Modal.Content title="Create New Post">
        <CreateNewPost
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
      </Modal.Content>
    </Modal>
  );
}

export default NewPostModal;
