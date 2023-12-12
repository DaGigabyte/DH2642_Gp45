import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
/**
 * A return button that returns to the previous side
 * Placed in top right corner and needs an relative div as parent
 * @param {String} props.size is the size of the button 
 * @returns {React.Element} A render of a return button with navigation
 */
export default function ReturnButton(props) {
    /* navigation */
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div onClick={() => { navigate(-1) }}
            title="Return to previous page"
            className="absolute top-4 right-4 p-2 shadow rounded-xl cursor-pointer
                  hover:shadow-lg hover:bg-slate-300">
            <IoCloseOutline size={props.size} />
        </div>)
}