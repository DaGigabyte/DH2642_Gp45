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
            className="absolute top-5 right-5 p-2 shadow rounded-xl cursor-pointer
                  hover:shadow-lg hover:bg-gray-300 bg-pins-light opacity-100 backdrop-blur">
            <IoCloseOutline size={props.size} />
        </div>)
}