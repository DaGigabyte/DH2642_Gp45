/**
 *
 * @param {*} props.post The post to display
 * @returns {React.Element} A component displaying the toprated section
 */

export default function TopRatedCard(post) {

  return (
    <img
      onClick={() => { alert("NAVIGATE TO POST") }}//TODO correct routing need postmodel
      src={post.postPicture}
      alt="Post Cover"
      className="h-[400px] aspect-[1/2] p-2 mr-2 inline-block  cursor-pointer rounded-2xl 
        shadow object-cover hover:scale-105 hover:shadow-lg ease-in-out transition duration-300 "
    />
  );
}
