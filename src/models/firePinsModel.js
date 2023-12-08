import { observable, reaction, action } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { savePostToFirestore, queryNewestPosts } from "../firebase/firebaseModel";

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
    },
    setFullName: action(function(name) {
      console.debug("setting userSettingsData.fullName to: ", name);
      this.data.fullName = name;
    }),
    setDisplayName: action(function(name) {
      console.debug("setting userSettingsData.displayName to: ", name);
      this.data.displayName = name;
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
  },
  createPost: action(function() {
    console.debug("creating post with data: ", this.createPostEditor.data);
    savePostToFirestore(this.createPostEditor.data, this.user.uid);
  }),
  homePageData: {
    data: {
      topRatedPosts: [],
      newestPosts: []
    },
    fetchNewestPosts: action(async function() {
      const posts = await queryNewestPosts(this.data.newestPosts.length + 4);
      this.data.newestPosts = posts;
    }),
  },
  uuid: uuidv4(),
});

export default model;