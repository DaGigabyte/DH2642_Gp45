import { toast } from "react-toastify";

// Need to login
export const newPostCreatedToast = () =>
  toast.success("Your post was successfully created.");

export const newCommentCreatedToast = () =>
  toast.success("Your comment was posted.");
