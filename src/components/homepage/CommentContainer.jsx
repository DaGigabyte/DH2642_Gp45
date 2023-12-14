import { FaCircleCheck } from "react-icons/fa6";

/**
 * @param {Object}      props.post The shown post
 * @param {Object}      props.isUserConfirmed true if user is logged in
 * @param {Function}    props.onInputChange - changes the component state
 * @param {Function}    props.storeComment - store the comment
 * @returns {React.Element} A component displaying a summarized post preview.
 */
export default function CommentContainer(props) {
    function verifyUserForComment() {
        if (props.isUserConfirmed) {
            return (<div className="w-full flex flex-col md:flex-row gap-4 items-end md:items-end">
                <textarea
                    className="w-full border rounded-xl p-2 content-start min-h-[6rem]"
                    id="commentBox"
                    type="text"
                    placeholder={props.text ? props.text : "Enter Comment"}
                    onInput={(evt) => { props.onInputChange(evt.target.value) }} />
                <button className="mt-2 purpleButton text-xl font-medium min-w-[182px] h-full inline-block disabled:opacity-50 disabled:cursor-not-allowed  hover:disabled:border-gray-300" 
                    onClick={() => props.storeComment()} title="Enter text to enable" disabled={props.text ? false : true}>Post Comment</button>
            </div>)
        }
        else return (<>
            <textarea className="w-full border rounded-xl p-2 content-start min-h-[6rem] disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-gray-200 hover:disabled:border-gray-300" defaultValue="Log in to enter text" disabled></textarea>
            <button className="mt-2 purpleButton text-xl font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed  hover:disabled:border-gray-300" disabled>Log in to post a comment</button>
        </>)
    }
    return (
        <div className="flex flex-col rounded-xl border-gray-300 p-2 bg-white">
            {/* conditional blur */}
            <div className={"relative flex flex-col md:flex-row space-x-4 w-full text-black text-left rounded-xl border border-gray-300 p-3 bg-white items-end mb-5 shadow"}>

                {/* Image container */}
                <div className=" aspect-square w-full max-h-[300px] overflow-hidden rounded-xl shadow-lg">
                    <img
                        src={props.post.posterPath}
                        alt="Picture"
                        className="rounded-xl w-full h-full object-cover"
                    />
                </div>

                {/* Text container */}
                <div className="flex flex-col pl-1 w-full pb-1">    

                        {/* Profile and name */}
                        <div className="flex items-end pb-4 space-x-4">
                            <span className="mr-2">
                                <img src={props.post.user.profilePicture} alt="profile picture" className="w-16 h-16 shrink-0 rounded-full" />
                            </span>
                            <span className="text-3xl">{props.post.user.displayName}</span>
                        </div>

                        {/* Post Content */}
                        <span className="text-2xl line-clamp-1 font-semibold">
                            {props.post.title}
                        </span>
                        <span className="text-lg line-clamp-3 font-normal">
                            {props.post.content}
                        </span>
                    <div/>
                <div/>
            </div>

            {/* Source Badge */}
            <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl overflow-hidden">
                    <div className="bg-pins-primary py-2 px-8 text-xl font-medium text-white"> {props.post.source}</div>
            </div>
            </div>
            {/* Conditional rendering of button and input box depending on uid */}
            <div className={"rounded-xl border border-gray-300 p-5 bg-white flex flex-col shadow"}>
                {verifyUserForComment()}
            </div>

            {/* Overlay to confirm post upload */}{/* 
            <div className={props.confirmPost ?
                "absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white min-w-max min-h-fit p-5 rounded-xl items-center justify-center flex border border-gray-400 shadow-xl gap-4" : "hidden"} >
                <div className="flex flex-col justify-center rounded-xl p-3 ">
                    <p className="text-xl font-medium">Comment Posted</p>
                    <p className="text-lg font-medium">Returning in 3s</p>
                </div>
                <FaCircleCheck size="50" color="green" />
            </div>
                */}
        </div>)
}