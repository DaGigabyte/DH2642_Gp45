/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function ConfirmationPopupContainer(props) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-lg">
        Press confirm to delete {props.actionType.toLowerCase()}. This action
        can not be undone.
      </p>
      <div className="flex gap-2">
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
          Confirm
        </button>
      </div>
    </div>
  );
}
