import Modal from "./Modal";
import CommentPost from "../homepage/CommentContainer";

/**
 * @param {Object} props.post - The currently selected post 
 * @param {Boolean} props.isUserConfirmed - true if the user is logged in
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
          text={props.text}
          isUserConfirmed={props.isUserConfirmed}
          onInputChange={(res) => props.userEntersComment(res)}
          storeComment={() => props.storeComment()}
        />
      </Modal.Content>
    </Modal>
  );
}