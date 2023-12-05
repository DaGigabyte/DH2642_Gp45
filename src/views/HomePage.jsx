import TopRatedCard from "../components/homepage/TopRatedCard"
import Post from "./summarizedPost"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
/**
 * Renders the homepage view
 * @param {Object} props.model - The firepinsModel
 * @param {Object} props.hotPosts - An array of the most liked posts
 * @param {Object} props.newPosts - An array of new posts
 * @returns {React.Element} A render of the homepage
 */
function HomePage(props) {

  function renderTopRatedSection(){
    if (props.hotPosts.length < 1)
      return null;
    return (
      <div className="flex  items-center h-[400px] m-5 mb-20"> {/*outer*/}
        <MdChevronLeft onClick={slideLeft} size="30"
          className="h-full w-8  shrink-0 flex items-center cursor-pointer rounded-lg shadow hover:bg-gray-300 hover:shadow-lg transition duration-200" />
        <div id="slider"
          className="p-5 items-center overflow-x-scroll overflow-y-visible whitespace-nowrap scroll-smooth scrollbar-hide"> {/*inner*/}
          {props.hotPosts.map(renderHotPosts)}
          </div>
        <MdChevronRight onClick={slideRight} size="30"
        className="h-full w-8 shrink-0 flex items-center cursor-pointer rounded-lg shadow hover:bg-gray-300 hover:shadow-lg transition duration-200 ml-2" />
      </div> )
  }
  function renderHotPosts(post) {
    return <TopRatedCard key={post.postId} postPicture={post.posterPath} source={post.source} />
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
    return<Post key={post.postId} picture={post.profilePicture} nickName={post.createdBy}  postPicture={post.posterPath} postTitle={post.postTitle} postBody={post.content}/>
  }
  return (
    <div className="flex flex-col w-full xl:w-3/4">
      {/*Top rated pins*/}
      <span className="text-3xl font-semibold block m-5">Top Rated Pins</span>
       {renderTopRatedSection()}
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
