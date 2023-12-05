import ProfileBox from "./profilePicAndNick"
import { MdClose } from "react-icons/md";
/**
 * Renders the Detailed post view
 * @param {Object} props.post - The post to display
 * @returns {React.Element} A render of the post
 */
function DetailedPostView(props) {

    //TODO fix onclick for returning
    return (  
    <div className="flex flex-col gap-2 m-10 w-full xl:w-3/4">
        <div className="relative  p-4 bg-white rounded-2xl">
            <div className="flex flex-col 2xl:block p-20 ">
                <div onClick={()=>{alert("USER WANT TO RETURN TODO")}}
                    className="absolute top-0 right-0 p-4 m-2 shadow rounded-2xl cursor-pointer
                    hover:shadow-lg hover:bg-slate-100">
                    <MdClose size={40}/>
                </div>
                <div className="float-left h-[400px] shrink-0 rounded-xl mr-10 mb-10 overflow-hidden">
                    <img className="w-full h-full object-cover 2xl:object-contain " src={props.post.posterPath} alt="/"/>
                </div>
                <div className="clear-right">
                    <span className="block text-3xl mt-5 ">
                        <ProfileBox 
                        picture={props.post.userPicture} 
                        nick = {props.post.createdBy}/>
                    </span>
                    <span className="block text-3xl mt-6 mb-2">{props.post.title}</span>
                    <div className="text-lg text-justify">
                        {props.post.content}
                    </div>
                </div>
            </div>
        </div>
        <div className="p-5 bg-white rounded-2xl ">
                    <span className="text-xl">COMMENTS ETC LATER</span>
                </div>
    </div>

    );
  }
  
  export default DetailedPostView;