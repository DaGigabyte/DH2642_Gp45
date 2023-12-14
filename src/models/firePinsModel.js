import { observable, reaction, action } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { savePostToFirestore, queryNewestPosts, queryTopPosts, queryFavoritePosts, likePostFirestore, dislikePostFirestore, followUserFirestore, unfollowUserFirestore, saveCommentToFireStore } from "../firebase/firebaseModel";

const model = observable({
  count: 1,
  setCount(value) {
    this.count = value;
  },
  
  /* Left here for reference (refer to Firebase usage.md)*/
  user: {
    uid: null,
    data: {
      fullName: "", // "Wong Pak Long"
      displayName: "", // "Jasper"
      displayNameInsensitive: "", // Needed for search functionality
      bio: "", // "I am a cool guy"
      profilePicture: "default-avatar.jpg",
      follows: [], // ["2387dgh2378chr2t7xtrn23723eb3d"]
      followedBy: [],
    },
    setUid: action(function(uid) {
      console.debug("setting user.uid to: ", uid);
      this.uid = uid;
    }),
    setData: action(function(data) {
      console.debug("current user.data: ", this.data);
      console.debug("setting user.data to: ", data);
      this.data = data;
    }),
  },
  setUser: action(function(userObj) {
    console.debug("setting user to: ", userObj);
    this.user = userObj;
  }),
  userSettingsData: {
    data: {
      fullName: "",
      displayName: "",
      displayNameInsensitive: "",
      bio: ""
    },
    setFullName: action(function(name) {
      console.debug("setting userSettingsData.fullName to: ", name);
      this.data.fullName = name;
    }),
    setDisplayName: action(function(name) {
      console.debug("setting userSettingsData.displayName to: ", name);
      this.data.displayName = name;
    }),
    setDisplayNameInsensitive: action(function(name) {
      const nameLowerCase = name?.toLowerCase();
      console.debug("setting userSettingsData.displayNameInsensitive to: " + nameLowerCase);
      this.data.displayNameInsensitive = nameLowerCase;
    }),
    setBio: action(function(bio) {
      this.data.bio = bio;
    }), 
  },
  storeUpdates: action(function() {
    console.debug(this);
    const newUserData = { ...this.user.data, ...this.userSettingsData.data };
    console.debug("storing updates to user.data\n", "newUserData: ", newUserData);
    this.user.setData(newUserData);
  }),
  createPostEditor: {
    data: {
      title: "",
      content: "",
      posterPath: "",
      source: "",
      postDescription: ""
    },
    setTitle: action(function(title) {
      console.debug("setting createPostEditor.title to: ", title);
      this.data.title = title;
    }),
    setContent: action(function(content) {
      console.debug("setting createPostEditor.content to: ", content);
      this.data.content = content;
    }),
    setPosterPath: action(function(posterPath) {
      console.debug("setting createPostEditor.posterPath to: ", posterPath);
      this.data.posterPath = posterPath;
    }),
    setSource: action(function (source) {
      console.debug("setting createPostEditor.source to: ", source);
      this.data.source = source;
    }),
    setPostDescription: action(function (postDescription) {
      console.debug("setting createPostEditor.postDescription to: ", postDescription);
      this.data.postDescription = postDescription;
    }),
  },
  createPost: action(function() {
    console.debug("creating post with data: ", this.createPostEditor.data);
    savePostToFirestore(this.createPostEditor.data, this.user.uid);
  }),
  homePageData: {
    data: {
      topRatedPosts: [],
      newestPosts: [],
    },
    setTopRatedPosts: action(function(posts) {
      console.debug("current homePageData.data.topRatedPosts: ", this.data.topRatedPosts);
      console.debug("setting homePageData.data.topRatedPosts to: ", posts);
      this.data.topRatedPosts = posts;
      console.debug("new homePageData.data.topRatedPosts: ", this.data.topRatedPosts);
    }),
    setNewestPosts: action(function(posts) {
      console.debug("current homePageData.data.newestPosts: ", this.data.newestPosts);
      console.debug("setting homePageData.data.newestPosts to: ", posts);
      this.data.newestPosts = posts;
      console.debug("new homePageData.data.newestPosts: ", this.data.newestPosts);
    }),
    fetchTopPosts: async function() {
      console.debug("this.data.topRatedPosts.length:", this.data.topRatedPosts.length);
      const posts = await queryTopPosts(this.data.topRatedPosts.length + 4);
      this.setNewestPosts(posts);
    },
    fetchNewestPosts: async function() {
      console.debug("this.data.newestPosts.length:", this.data.newestPosts.length);
      const posts = await queryNewestPosts(this.data.newestPosts.length + 4);
      this.setNewestPosts(posts);
    },
  },
  postDetailData: {
    currentPostID: null,
    status: null, // Has one of the values, 'loading, 'success' or 'error' depening on the state of the fetching
    comment: "",
    data: {
      id: null, // post id
      user: null, // user object from user who created post
      content: null,
      createdAt: null,
      createdBy: null,
      dislikedBy: null,
      likedBy: null,
      likes: null,
      modifiedAt: null,
      posterPath: null,
      source: null,
      title: null,
      comments: null, // Array of comments on the post
    },
    setCurrentPostID: action(async function(postID) {
      this.currentPostID = postID;
    }),
    setData: action(function(data) {
      this.data = data;
    }),
    setComment: action(function(comment) {
      this.comment = comment;
    }),
    postComment: async function() {
      const commentObj = {
        content: this.comment,
        createdAt: new Date(),
        createdBy: model.user.uid,
        displayName: model.user.data.displayName,
        profilePicture: model.user.data.profilePicture
      };
      await saveCommentToFireStore(commentObj, this.currentPostID);
    },
    likePost: async function () {
      await likePostFirestore(model.user.uid, this.currentPostID);
    },
    dislikePost: async function () {
      await dislikePostFirestore(model.user.uid, this.currentPostID);
    }
  },
  favoritesPageData: {
    data: {
      favoritePosts: [],
    },
    setFavoritePosts: action(function(posts) {
      this.data.favoritePosts = posts;
    }),
    fetchFavoritePosts: async function() {
      const uid = model.user.uid;
      const posts = await queryFavoritePosts(this.data.favoritePosts.length + 4, uid);
      this.setFavoritePosts(posts);
    },
  },  
  uuid: uuidv4(),
});



export default model;