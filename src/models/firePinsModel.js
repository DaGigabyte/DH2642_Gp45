import { observable, reaction, action } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { savePostToFirestore } from "../firebase/firebaseModel";

const model = observable({
  count: 1,
  setCount(value) {
    this.count = value;
  },
  /* OBS JUST FOR TESTING */
  currentPostId: null,
  setCurrentPost(id){
    this.currentPostId = id;
  },
    /*Source only needed if we use multiple APIs and want the badge*/
    hotPosts : [
      { postId: 1,profilePicture: "public/default-avatar.jpg",createdBy: "some name 1", posterPath: 'src/assets/oppenhemier.jpg',title:'Title 1', source: 'TMdB', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      { postId: 2,profilePicture: "public/default-avatar.jpg",createdBy: "some name 2", posterPath: 'src/assets/oppenhemier.jpg',title:'Title 2', source: 'TMDB', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      { postId: 3,profilePicture: "public/default-avatar.jpg",createdBy: "some name 3", posterPath: 'src/assets/oppenhemier.jpg',title:'Title 3', source: 'TMDB', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      { postId: 4,profilePicture: "public/default-avatar.jpg",createdBy: "some name 4", posterPath: 'src/assets/oppenhemier.jpg',title:'Title 4', source: 'TMDB', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      { postId: 5,profilePicture: "public/default-avatar.jpg",createdBy: "some name 5", posterPath: 'src/assets/oppenhemier.jpg',title:'Title 5', source: 'TMDB', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      { postId: 6,profilePicture: "public/default-avatar.jpg",createdBy: "some name 6", posterPath: 'src/assets/oppenhemier.jpg',title:'Title 6', source: 'TMDB', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      { postId: 7,profilePicture: "public/default-avatar.jpg",createdBy: "some name 7", posterPath: 'src/assets/oppenhemier.jpg',title:'Title 7', source: 'TMDB', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      { postId: 8,profilePicture: "public/default-avatar.jpg",createdBy: "some name 8", posterPath: 'src/assets/oppenhemier.jpg',title:'Title 8', source: 'TMDB', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
    ],
    /*for */
   newPosts : [
      {postId:9 , profilePicture:'public/default-avatar.jpg', createdBy: "some name 9 ", posterPath:'src/assets/avatar_movie.jpg', title:'Title 9 ', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      {postId:10, profilePicture:'public/default-avatar.jpg', createdBy: "some name 10", posterPath:'src/assets/avatar_movie.jpg', title:'Title 10', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      {postId:11, profilePicture:'public/default-avatar.jpg', createdBy: "some name 11", posterPath:'src/assets/avatar_movie.jpg', title:'Title 11', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
      {postId:12, profilePicture:'public/default-avatar.jpg', createdBy: "some name 12", posterPath:'src/assets/avatar_movie.jpg', title:'Title 12', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
    ],
    getCurrentPost(){
      let post = null;
      this.hotPosts.forEach(p => {
        if (p.postId === this.currentPostId) {
          post = p;
        }
      });
      this.newPosts.forEach(p => {
        if (p.postId === this.currentPostId) {
          post = p;
        }
      });
      return post;
    },
  /* ENDS here */

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
  },
  createPost: action(function() {
    console.debug("creating post with data: ", this.createPostEditor.data);
    savePostToFirestore(this.createPostEditor.data, this.user.uid);
  }),
  searchText: "",
  setSearchText(text) {
    this.searchText = text;
  },
  //TODO temporary solution to display custom evt
  confirmUserSearch() {
    alert("User wants to search for:  " + this.searchText);
  },
  uuid: uuidv4(),
});
export default model;