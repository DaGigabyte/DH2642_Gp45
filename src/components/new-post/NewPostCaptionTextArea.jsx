function NewPostCaptionTextArea(props) {
  return (
    <div className="flex flex-col mt-4">
      <textarea
        id="caption"
        className="border-2 border-gray-300 rounded-lg px-2 py-3 text-lg mt-2 bg-pins-light focus:border-pins-primary focus:outline-none transition duration-150 ease-in-out"
        placeholder="Add a caption..."
        value={props.newPostCaption}
        onChange={(event) => props.onSetNewPostCaption(event.target.value)}
      />
    </div>
  );
}

export default NewPostCaptionTextArea;
