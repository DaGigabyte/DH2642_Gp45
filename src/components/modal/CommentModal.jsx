import { BiCommentDetail } from "react-icons/bi";
import Modal from "./Modal";
import CommentPost from "../homepage/CommentContainer";

/**
 * 
 * @param {Object} props.post - The currently selected post 
 * @param {Boolean} props.isUserConfirmed - true if the user is logged in
 * @param {Boolean} props.confirmPost- true if the user is clicks postComment
 * @param {Function} props.userEntersComment - true if the user is logged in
 * @param {Function} props.storeComment - user wants to post the comment
 * @returns 
 */
export default function CommentModal(props) {

  return (
    <Modal open={props.isOpen} onOpenChange={props.setOpen}>
      <Modal.Content title="Quick Comment">
        <CommentPost
          post={props.post}
          isUserConfirmed={props.isUserConfirmed}
          onInputChange={(res) => props.userEntersComment(res)}
          storeComment={() => props.storeComment()}
          confirmPost={props.confirmPost}
        />
      </Modal.Content>
    </Modal>
  );
}