import Modal from "./Modal";
import ConfirmationPopupContainer from "../global/ConfirmationPopupContainer";

export default function ConfirmationPopupModal(props) {
  return (
    <Modal open={props.isOpen} onOpenChange={props.setOpen}>
      <Modal.Content title={"Delete " + props.actionType}>
        <ConfirmationPopupContainer
          actionType={props.actionType}
          onConfirm={() => props.onConfirm()}
          onCancel={() => props.onCancel()}
          commentRemovalStatus={props.commentRemovalStatus}
          postRemovalStatus={[props.postRemovalStatus]}
        />
      </Modal.Content>
    </Modal>
  );
}