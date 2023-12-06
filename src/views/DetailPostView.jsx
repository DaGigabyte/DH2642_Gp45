import ProfileBox from "./profilePicAndNick"
import ReturnButton from "../components/navigation/ReturnButton.jsx"
/**
 * Renders the Detailed post view
 * @param {Object} props.post - The post to display
 * @returns {React.Element} A render of the post
 */
function DetailedPostView(props) {

    return (  
    <div className="flex flex-col gap-2  w-full xl:w-3/4">
        <div className="relative bg-white rounded-2xl">
            <ReturnButton size="30"/>
            <div className="flex flex-col xl:block p-20 ">

                <div className="float-left h-[400px] shrink-0 rounded-xl mr-10 mb-10 overflow-hidden">
                    <img className="w-full h-full object-cover 2xl:object-contain " src={props.post.posterPath} alt="/"/>
                </div>
                <div className="clear-right">
                    <span className="block text-3xl mt-4 ">
                        <ProfileBox 
                        picture={props.post.profilePicture} 
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