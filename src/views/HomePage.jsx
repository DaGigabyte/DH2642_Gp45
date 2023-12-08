import { Link } from "react-router-dom";
import TopRatedCard from "../components/homepage/TopRatedCard"
import Post from "./summarizedPost"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import defaultPic from "../assets/default-avatar.jpg"
/**
 * Renders the homepage view
 * @param {Object} props.model - The firepinsModel
 * @param {Object} props.hotPosts - An array of the most liked posts
 * @param {Object} props.newPosts - An array of new posts
 * @param {funciton} props.loadMorePosts - onClick to load more posts into the array
 * @returns {React.Element} A render of the homepage
 */
function HomePage(props) {
  function renderTopRatedSection() {
    if (!props.hotPosts)
      return null;
    if (props.hotPosts.length < 1)
      return null;
    return (
      <div className="flex items-center h-[400px] pl-5 pr-5 mb-20"> {/*outer*/}
        <MdChevronLeft onClick={slideLeft} size="30"
          className="h-full w-8 shrink-0 flex items-center cursor-pointer rounded-s-lg
          border-gray-300 border-solid border hover:bg-gray-300 transition ease-in duration-300" />
        <div id="slider"
          className="items-center overflow-x-scroll overflow-y-visible whitespace-nowrap scroll-smooth scrollbar-hide"> {/*inner*/}
          {props.hotPosts.map(renderHotPosts)}
        </div>
        <MdChevronRight onClick={slideRight} size="30"
          className="h-full w-8 shrink-0 flex items-center cursor-pointer rounded-e-lg
          border-gray-300 border-solid border hover:bg-gray-300 transition ease-in duration-300" />
      </div>)
  }
  function renderHotPosts(post) {
    return(
      <Link to={`/details`} key={post.id}>
       <TopRatedCard 
          key={post.id} 
          postPicture={post.posterPath} 
          source={post.source} 
          selectPost ={()=>{props.selectPost(post.id)}}/>
    </Link>)
  }
  function slideLeft() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 200;
  }
  function slideRight(evt) {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 200;
  }
  function renderNewPosts(post) {
    return ( <Link to={`/details`} key={post.id}> 
      <Post key={post.id} 
        picture={post.user.profilePicture?post.user.profilePicture:defaultPic} 
        nickName={post.user.displayName} 
        postPicture={post.posterPath} 
        postTitle={post.title} 
        postBody={post.content} 
        selectPost ={()=>{props.selectPost(post.id)}}/>
    </Link>)
  }
  console.log(props.loading)
  return (
    <div className="flex flex-col w-full max-w-6xl">
      {/*Top rated pins*/}
      <span className="text-3xl font-semibold block p-5">Top Rated Pins</span>
      {renderTopRatedSection()}

      {/*NEW POSTS*/}
      <span className="text-3xl font-semibold  p-5">New Posts</span>
      <div className="flex flex-col w-full p-5">
        
      {props.loading? 
        <span>loading...</span> : (props.newPosts.map(renderNewPosts))}

      </div>
      {/*Load more button*/}
      <div className="flex justify-center">
        <button className="purpleButton" onClick={() => props.loadMorePosts()}>Load More Posts</button>
      </div>
      {/*More Content*/}
    </div>
  );
}

export default HomePage;
