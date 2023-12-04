import TopRatedCard from "../components/homepage/TopRatedCard"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"; //chagne to this?
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
/**
 * Renders the homepage view
 * @param {Object} props.model - The firepinsModel
 * @returns {React.Element} A render of the homepage
 */
function HomePage(props) {
  function renderPosts(post) {
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
  return (
    <div className="flex flex-col w-full">
      {/*Top rated pins*/}
      <span className="text-3xl font-semibold pb-4 block pd-10 mt-2">Top Rated Pins</span>
      <div className="flex  items-center h-[400px] m-5 mb-20"> {/*outer*/}

        <MdChevronLeft onClick={slideLeft} size="30"
          class="h-full w-28 flex items-center cursor-pointer rounded-lg shadow hover:shadow-xl transition duration-200" />

        <div id="slider"
          className="p-5 items-center overflow-x-scroll overflow-y-visible whitespace-nowrap scroll-smooth scrollbar-hide"> {/*inner*/}
          {props.posts ? props.posts.map(renderPosts) : null}
        </div>

        <MdChevronRight onClick={slideRight} size="30"
          class="h-full w-28 flex items-center cursor-pointer rounded-lg shadow hover:shadow-xl transition duration-200 ml-2" />
      </div>
      <div>
      {/*More content*/}
      </div>
      <div>
        <h1 className="text-2xl font-bold">HomePage</h1>
        <p>Main content for HomePage...</p>
      </div>
    </div>
  );
}

export default HomePage;
