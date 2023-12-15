// SVG animation for Suspense fallback
import Loader from "../../assets/svg-loaders/ball-triangle.svg";

function SuspenseAnimation({ loading }) {
  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center absolute top-0 bottom-0 right-0 left-0 space-y-2">
          <img src={Loader} alt="Loading..." className="w-10" />
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default SuspenseAnimation;
