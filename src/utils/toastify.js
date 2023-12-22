import { toast } from "react-toastify";

// Need to login
export const needToLogInToast = () => toast.error("You need to log in.");

export const newPostCreatedToast = () =>
  toast.success("Your post was successfully created.");

export const newCommentCreatedToast = () =>
  toast.success("Your comment was posted.");
export const newCommentFailedToast = () =>
  toast.error("There was an issue storing the comment.");

export const postDeletedToast = () => toast.success("The Pin was removed.");
export const postDeletedFailedToast = () =>
  toast.error("Failed to remove the Pin.");

export const commentDeletedToast = () =>
  toast.success("The comment was removed.");
export const commentDeletedFailedToast = () =>
  toast.error("Failed to remove the Comment.");

export const settingsUpdatedToast = () =>
  toast.success("Your settings was updated.");
