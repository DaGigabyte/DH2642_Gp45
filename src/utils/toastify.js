import { toast } from "react-toastify";

// Need to login
export const newPostCreatedToast = () =>
  toast.success("Your post was successfully created.");

export const newCommentCreatedToast = () =>
  toast.success("Your comment was posted.");

export const postDeletedToast = () =>
  toast.success("The Pin was deleted.");

export const commentDeletedToast = () =>
  toast.success("The comment was deleted.");
