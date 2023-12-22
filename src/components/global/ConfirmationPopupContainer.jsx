import { IoReloadOutline } from "react-icons/io5";

export default function ConfirmationPopupContainer(props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg">
        Press confirm to delete {props.actionType.toLowerCase()}. This action
        can not be undone
      </p>
      <div className="flex gap-2 justify-end">
        <button
          className="purpleButton w-40"
          onClick={() => {
            props.onCancel();
          }}
        >
          Cancel
        </button>

        <button
          className="purpleButton w-40"
          onClick={() => {
            props.onConfirm();
          }}
        >
          {props.commentRemovalStatus === "loading" ||
          props.postRemovalStatus === "loading" ? (
            <IoReloadOutline size={20} className="animate-spin mr-2" />
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  );
}
