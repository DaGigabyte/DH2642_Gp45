import { MdDeleteForever } from "react-icons/md";


export default function DeletePostButton(props) {


    return (

        <span className="hover:bg-gray-200 max-w-fit p-1 rounded">
            <button title="Click to remove" onClick={(e) => {
                props.handleOnClick();
                e.stopPropagation();
            }}>
                <MdDeleteForever size="40" />
            </button>
        </span>
    )
}