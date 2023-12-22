import { Link } from "react-router-dom";
// Images
import notFound from "../assets/404/404.png";
import disconnected from "../assets/404/disconnected.png";

function PageNotFoundView() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 h-screen bg-pins-light">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <Link
                to="/"
                type="button"
                className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center purpleButton hover:text-pins-light"
              >
                Take me there!
              </Link>
            </div>
          </div>
          <div>
            <img src={notFound} />
          </div>
        </div>
      </div>
      <div>
        <img src={disconnected} />
      </div>
    </div>
  );
}

export default PageNotFoundView;
