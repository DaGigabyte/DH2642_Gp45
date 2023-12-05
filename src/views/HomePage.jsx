import TopRatedCard from "../components/homepage/TopRatedCard"
import Post from "./summarizedPost"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"; //chagne to this?
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
/**
 * Renders the homepage view
 * @param {Object} props.model - The firepinsModel
 * @returns {React.Element} A render of the homepage
 */
function HomePage(props) {
  function renderHotPosts(post) {
    return <TopRatedCard key={post.id} postPicture={post.cover} source={post.source} />
  }
  function slideLeft() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 200;
  }
  function slideRight(evt) {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 200;
  }

  function renderNewPosts(post){
    return<Post key={post.postId} picture={post.picture} nickName={post.nickName} postPicture={post.postPicture}/>
  }
  return (
    <div className="flex flex-col w-full xl:w-3/4">
      {/*Top rated pins*/}
      <span className="text-3xl font-semibold block m-5">Top Rated Pins</span>
      <div className="flex  items-center h-[400px] m-5 mb-20"> {/*outer*/}

        <MdChevronLeft onClick={slideLeft} size="30"
          className="h-full w-8  shrink-0 flex items-center cursor-pointer rounded-lg shadow hover:shadow-xl transition duration-200" />

        <div id="slider"
          className="p-5 items-center overflow-x-scroll overflow-y-visible whitespace-nowrap scroll-smooth scrollbar-hide"> {/*inner*/}
          {props.hotPosts ? props.hotPosts.map(renderHotPosts) : null}
        </div>

        <MdChevronRight onClick={slideRight} size="30"
          className="h-full w-8 shrink-0 flex items-center cursor-pointer rounded-lg shadow hover:shadow-xl transition duration-200 ml-2" />
      </div>
      {/*NEW POSTS*/}
      <span className="text-3xl font-semibold  m-5">New Posts</span>
      <div className="flex flex-col w-full m-5">
      {props.newPosts ? props.newPosts.map(renderNewPosts) : null}

      </div>
      {/*More Content*/}
      <div>
        <h1 className="text-2xl font-bold">HomePage</h1>
        <p>Main content for HomePage...</p>
      </div>
    </div>
  );
}

export default HomePage;
