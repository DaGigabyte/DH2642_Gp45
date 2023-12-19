/**
 * @param {*} props.post The post to display
 * @returns {React.Element} A component displaying the toprated section
 */
import { useState } from "react";
import { BiLike } from "react-icons/bi";

export default function TopRatedCard(post) {
  const [isHovered, setIsHover] = useState(false);
  return (
    <div
      className="relative h-[400px] inline-block m-3 cursor-pointer rounded-lg border  shadow hover:shadow-lg overflow-hidden "
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <img
        onClick={() => {
          post.selectPost();
        }}
        src={post.postPicture}
        alt="Post Cover"
        className={
          isHovered
            ? "aspect-[1/2] h-full w-full object-cover scale-110  transition duration-300 "
            : "aspect-[1/2] h-full w-full object-cover  transition duration-300 "
        }
      />
      {/* Overlay source */}

      <div
        className={
          isHovered
            ? "hotPostOverlay hotPostOverlayVisible"
            : " hotPostOverlay hotPostOverlayHidden"
        }
      >
        <img src={post.creator.picture} alt="/" className="rounded-full w-9" />
        <p className=" overflow-clip ">{post.creator.name}</p>
        <div className="text-center items-center flex gap-0.5">
          <p>{post.likes}</p>
          <BiLike size={20} />
        </div>
      </div>
    </div>
  );
}
