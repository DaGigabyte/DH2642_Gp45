import ProfileBox from "./profilePicAndNick";

/**
 * A general component for post diplaying a preview
 * @param {Object} props - Props for the SummarizedPost component.
 * @param {string} props.picture - The URL or source for the profile picture.
 * @param {string} props.nickName - The nickname associated with the post.
 * @param {string} props.postPicture - The URL or source for the post picture.
 * @param {Function} props.viewPost - CB function triggered when the user clicks on the post.
 * @returns {React.Element} A component displaying a summarized post preview.
 */
export default function SummarizedPost(props) {
  /*ACB to handle postclick navigate ROUTING NEEEDED*/
  function handlePostClickACB() {
    props.viewPost();
  }
  return (
    <div
      className="flex flex-col md:flex-row items-start space-x-4 w-full text-black text-left 
        rounded-xl border border-gray-300 p-2 bg-white hover:border-indigo-600 
        hover:scale-y-105 transition duration-300"
      onClick={handlePostClickACB}
    >
      <div className="flex-none  aspect-square max-h-[300px] overflow-hidden">
        {/**Exchange for real data from post */}
        <img
          src={props.postPicture}
          alt="Picture"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-start mt-3">
        <ProfileBox picture={props.picture} nick={props.nickName} />
        {/**Exchange for real data from post */}
        <span className="text-2xl flex-shrink-0 font-semibold">
          {/**Exchange for real data from post */}
          Some title we write
        </span>
        <span className="text-lg">
          {/**Exchange for real data from post */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,
          harum debitis officiis odit id impedit nostrum, sed itaque non
          repudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?
        </span>

        {/* Buttons added later*/}
      </div>
    </div>
  );
}
