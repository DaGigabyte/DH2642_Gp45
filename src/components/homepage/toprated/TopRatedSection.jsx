import { Link } from "react-router-dom";
import TopRatedCard from "./TopRatedCard"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

/**

 * @param {Object} props.currentUID - The currently logged in user
 * @param {Object} props.hotPosts - An array of the most liked posts
 * @param {function} props.selectPost - sets the currentPost to the id of the clicked posts
 * @returns {React.Element} The top rated section of the homepage
 */
export default function TopRatedSection(props) {
  function renderTopRatedSection() {
    if (!props.hotPosts)
      return null;
    if (props.hotPosts.length < 1)
      return null;
    /* move left int the vertical scroll */
    function slideLeft() {
      const slider = document.getElementById("slider");
      slider.scrollLeft = slider.scrollLeft - 200;
    }
    /* move right int the vertical scroll */
    function slideRight(evt) {
      const slider = document.getElementById("slider");
      slider.scrollLeft = slider.scrollLeft + 200;
    }
    /* CB to render each post in the array*/
    function renderHotPostCB(post) {
      return (
        <Link to={{ pathname: "/post/" + post.id }} key={post.id}>
          <TopRatedCard
            key={post.id}
            postPicture={post.posterPath}
            source={post.source}
            selectPost={() => { props.selectPost(post.id) }} />
        </Link>)
    }

    /* The complete render of the TopRated section */
    return (
      <div className="flex items-center h-[400px] pl-5 pr-5 mb-20"> {/*outer*/}
        <MdChevronLeft onClick={slideLeft} size="30"
          className="h-full w-8 shrink-0 flex items-center cursor-pointer rounded-s-lg
              border-gray-300 border-solid border hover:bg-gray-300 transition ease-in duration-300" />
        <div id="slider"
          className="items-center overflow-x-scroll overflow-y-visible whitespace-nowrap scroll-smooth scrollbar-hide"> {/*inner*/}
          {props.hotPosts.map(renderHotPostCB)}
        </div>
        <MdChevronRight onClick={slideRight} size="30"
          className="h-full w-8 shrink-0 flex items-center cursor-pointer rounded-e-lg
              border-gray-300 border-solid border hover:bg-gray-300 transition ease-in duration-300" />
      </div>)
  }

  return (
    <>
      <div className="text-3xl font-semibold ">Top Rated Pins</div>
      {renderTopRatedSection()}
    </>
  )

}