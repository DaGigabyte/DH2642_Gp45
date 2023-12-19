import { Link } from "react-router-dom";
import TopRatedCard from "./TopRatedCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import SuspenseAnimation from "../../global/SuspenseAnimation.jsx";

/**

 * @param {Object} props.currentUID - The currently logged in user
 * @param {Object} props.hotPosts - An array of the most liked posts
 * @param {function} props.selectPost - sets the currentPost to the id of the clicked posts
 * @returns {React.Element} The top rated section of the homepage
 */
export default function TopRatedSection(props) {
  function slideLeft() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 250;
  }

  /* move right int the vertical scroll */
  function slideRight() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 250;
  }

  /* CB to render each post in the array*/
  function renderHotPostCB(post) {
    return (
      <Link to={{ pathname: "/post/" + post.id }} key={post.id}>
        <TopRatedCard
          key={post.id}
          postPicture={post.posterPath}
          source={post.source}
          likes={post.likes}
          creator={{
            name: post.user.displayName,
            picture: post.user.profilePicture,
          }}
          selectPost={() => {
            props.selectPost(post.id);
          }}
        />
      </Link>
    );
  }

  return (
    <>
      <p className="text-3xl font-semibold ">Top Rated Pins</p>

      <div className="flex relative items-center border py-3 rounded-xl bg-white disable-selection">
        <div
          className="absolute top-1/2 left-1 transform -translate-y-1/2 cursor-pointer backdrop-blur-lg py-4 z-10 border border-gray-700 rounded-xl hover:bg-gray-300 transition ease-in duration-300"
          onClick={slideLeft}
        >
          <MdChevronLeft size="40" />
        </div>
        <div
          id="slider"
          className="items-center overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide transition-all duration-300 disable-selection"
        >
          {props.hotPosts.map(renderHotPostCB)}
        </div>
        <div
          className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer backdrop-blur-lg py-4 z-10 border border-gray-700 rounded-xl hover:bg-gray-300 transition ease-in duration-300"
          onClick={slideRight}
        >
          <MdChevronRight size="40" />
        </div>
      </div>
    </>
  );
}
