import ProfileBox from "./profilePicAndNick";

/**
 * A general component for post diplaying a preview
 * @param {Object} props - Props for the SummarizedPost component.
 * @param {string} props.picture - The URL or source for the profile picture.
 * @param {string} props.nickName - The nickname associated with the post.
 * @param {string} props.postPicture - The URL or source for the post picture.
 * @param {string} props.postTitle - The URL or source for the post picture.
 * @param {string} props.postBody - The URL or source for the post picture.
 * @param {Function} props.viewPost - CB function triggered when the user clicks on the post.
 * @returns {React.Element} A component displaying a summarized post preview.
 */
export default function SummarizedPost(props) {

  /*ACB to handle postclick navigate ROUTING NEEEDED*/
  function handlePostClickACB() {
    alert("NAVIAGATE TO POST TODO")//TODO correct routing
  }
  return (
    <div
      className="flex flex-col xl:flex-row items-start space-x-4 w-full text-black text-left 
        rounded-xl border border-gray-300 p-2 bg-white shadow hover:shadow-xl cursor-pointer 
             hover:bg-gray-200 transition duration-300 mb-5"
      onClick={handlePostClickACB}
    >
      <div className="shrink-0  aspect-video xl:aspect-square max-h-[300px] overflow-hidden rounded-xl">
        {/**Exchange for real data from post */}
        <img
          src={props.postPicture}
          alt="Picture"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <ProfileBox picture={props.picture} nick={props.nickName} />
        <span className="text-2xl flex-shrink-0 font-semibold">
          {props.postTitle}
        </span>
        <span className="text-xl line-clamp-3">
          {props.postBody}
        </span>

        {/* Buttons added later*/}
      </div>
    </div>
  );
}
