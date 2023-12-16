/**
 *
 * @param {*} props.post The post to display
 * @returns {React.Element} A component displaying the toprated section
 */

export default function TopRatedCard(post) {

  return (
    <img
      onClick={() => { post.selectPost() }}//TODO correct routing need postmodel
      src={post.postPicture}
      alt="Post Cover"
      className="h-[400px] aspect-[1/2]  mr-3 inline-block  cursor-pointer rounded-2xl 
        shadow object-cover hover:scale-[101%] hover:shadow-lg transition duration-300 "
    />
  );
}
