import { Link } from "react-router-dom";
import TopRatedCard from "../components/homepage/TopRatedCard"
import Post from "./summarizedPost"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import defaultProfile from "../assets/default-avatar.jpg"
/**
 * Renders the homepage view
 * @param {Object} props.currentUID - The currently logged in user
 * @param {Object} props.hotPosts - An array of the most liked posts
 * @param {Object} props.newPosts - An array of new posts
 * @param {function} props.loadMorePosts - onClick to load more posts into the array
 * @param {function} props.selectPost - sets the currentPost to the id of the clicked posts
 * @param {function} props.likePost - user wants to like or unlike the post
 * @param {function} props.dislikePost - user wants to dislike or undislike the post
 * @param {function} props.commentOnCurrentPost - to change the comonent state do the modal open
 * @returns {React.Element} A render of the homepage
 */
function HomePage(props) {
  /* Renders the topRated section if array exists*/
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
          {props.hotPosts.map(renderHotPostsB)}
        </div>
        <MdChevronRight onClick={slideRight} size="30"
          className="h-full w-8 shrink-0 flex items-center cursor-pointer rounded-e-lg
          border-gray-300 border-solid border hover:bg-gray-300 transition ease-in duration-300" />
      </div>)
  }

  /* CB to render each new post in the array newestPosts */
  function renderNewPosts(post) {
    return (
      <Post key={post.id}
        picture={post.user.profilePicture ? post.user.profilePicture : defaultProfile}
        nickName={post.user.displayName}
        postPicture={post.posterPath}
        postId={post.id}
        postTitle={post.title}
        postBody={post.content}
        nofLikes={post.likes}
        nofDislikes={post.dislikedBy.length}
        currentUID={props.currentUID}
        currentUserLikes={post.likedBy?.includes(props.currentUID)}
        currentUserDislikes={post.dislikedBy?.includes(props.currentUID)}
        selectPost={() => { props.selectPost(post.id) }}
        likePost={() => { props.likePost(post.id) }}
        dislikePost={() => { props.dislikePost(post.id) }}
        commentOnPost={() => { props.commentOnCurrentPost(post) }}
      />
    )
  }

  /* The complete homepage render */
  return (
    <div className="flex flex-col w-full max-w-6xl">
      {/*Top rated pins*/}
      <span className="text-3xl font-semibold block pb-5 ">Top Rated Pins</span>
      {renderTopRatedSection()}

      {/*NEW POSTS*/}
      <span className="text-3xl font-semibold pb-5 ">New Posts</span>
      <div className="flex flex-col w-full">
        {props.newPosts ? props.newPosts.map(renderNewPosts) : null}
      </div>

      {/*Load more posts button*/}
      <div className="flex justify-center">
        <button className="purpleButton w-64" onClick={(event) => { props.loadMorePosts(); event.stopPropagation(); }}>Load More Posts</button>
      </div>
      {/*More Content*/}

    </div>
  );
}

export default HomePage;
