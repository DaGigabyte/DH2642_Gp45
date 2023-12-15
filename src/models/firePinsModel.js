import { observable, reaction, action, set } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { listOfGenre } from "../services/firePinsSource";
import { savePostToFirestore, queryMoreNewestPosts, queryTopPosts, queryFavoritePosts, likePostFirestore, dislikePostFirestore, followUserFirestore, unfollowUserFirestore, saveCommentToFireStore } from "../firebase/firebaseModel";

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
    appendToFollows: action(function (uid) {
      if (!this.data.follows.includes(uid)) {
        this.data.follows = [...this.data.follows, (uid)];
      }
    }),
    removeFromFollows: action(function (uid) {
      this.data.follows = this.data.follows.filter((uidInFollows) => uidInFollows !== uid);
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
      TMDBsourceID: null,
      TMDBgenreID: [],
      TMDBdateOfMovieRelease: "",
      postDescription: ""
    },
    setTitle: action(function(title) {
      console.debug("setting createPostEditor.data.title to: ", title);
      this.data.title = title;
    }),
    setContent: action(function(content) {
      console.debug("setting createPostEditor.data.content to: ", content);
      this.data.content = content;
    }),
    setPosterPath: action(function(posterPath) {
      console.debug("setting createPostEditor.data.posterPath to: ", posterPath);
      this.data.posterPath = posterPath;
    }),
    setSource: action(function (source) {
      console.debug("setting createPostEditor.data.source to: ", source);
      this.data.source = source;
    }),
    setTMDBgenre: action(function (TMDBgenre) {
      console.debug("setting createPostEditor.data.TMDBgenre to: ", TMDBgenre);
      this.data.TMDBgenre = TMDBgenre;
    }),
    setTMDBdateOfMovieRelease: action(function (TMDBdateOfMovieRelease) {
      console.debug("setting createPostEditor.data.TMDBdateOfMovieRelease to: ", TMDBdateOfMovieRelease);
      this.data.TMDBdateOfMovieRelease = TMDBdateOfMovieRelease;
    }),
    setPostDescription: action(function (postDescription) {
      console.debug("setting createPostEditor.data.postDescription to: ", postDescription);
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
      newestPosts: await queryMoreNewestPosts(4),
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
      const morePosts = await queryMoreNewestPosts(4);
      this.setNewestPosts([...this.data.newestPosts, ...morePosts]);
    },
  },
  postDetailData: {
    currentPostID: null,
    status: null, // Has one of the values, 'loading, 'success' or 'error' depening on the state of the fetching
    comment: "",
    promiseState: {
      promise: null,
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
      error: null,
      setPromise: action(function(promise) {
        this.promise = promise;
      }),
      setData: action(function(data) {
        this.data = data;
      }),
      setError: action(function(error) {
        this.error = error;
      }),
    },
    setCurrentPostID: action(async function(postID) {
      this.currentPostID = postID;
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
  profilePageData: {
    currentProfileUid: null,
    promiseState: {
      promise: null,
      data: {
        profilePicture: null,
        displayName: null,
        bio: null,
        followedBy: [],
        follows: [],
        followingAmt: null, // Amount of accounts that the profile is following
        followerAmt: null, // Amount of followers of the account
        ownAccount: null, // Boolean for if the profile is the users own
        isFollwing: null, // Boolean for if the user is following the profile
        isLoggedIn: null, // If the user browsing is currently logged in
        posts: [], // Array of posts created by the user
      },
      error: null,
      setPromise: action(function(promise) {
        this.promise = promise;
      }),
      setData: action(function(data) {
        this.data = data;
      }),
      setError: action(function(error) {
        this.error = error;
      }),
    },
    setCurrentProfileUid: action(function(uid) {
      this.currentProfileUid = uid;
    }),
    followUser: async function () {
      try {
          await followUserFirestore(this.currentProfileUid, model.user.uid);
          model.user.appendToFollows(this.currentProfileUid);
      } catch (error) {
          console.error('Error following user:', error);
      }
    },
    unfollowUser: async function () {
      try {
          await unfollowUserFirestore(this.currentProfileUid, model.user.uid);
          model.user.removeFromFollows(this.currentProfileUid);
      } catch (error) {
          console.error('Error unfollowing user:', error);
      }
    },
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
  newPostsData: {
    numberOfNewPost: 0,
    data: [], // array of new posts
    setNumberOfNewPost: action(function(number) {
      console.debug("setting numberOfNewPost to: ", number);
      this.numberOfNewPost = number;
    }),
    setNewPostsData: action(function(posts) {
      console.debug("current newPostsData: ", this.newPostsData);
      console.debug("setting newPostsData to: ", posts);
      this.data = posts;
      console.debug("new newPostsData: ", this.data);
      this.setNumberOfNewPost(this.data.length);
    }),
    addNewPost: action(function(post) {
      console.debug("adding new post: ", post);
      this.setNewPostsData([post, ...this.data]);
      model.updateHomePageDataWithNewPosts();
    }),
  },
  /**
   * Updates the homePageData.newestPosts with the new posts and clears the newPostsData.data
   */
  updateHomePageDataWithNewPosts: function() {
    this.homePageData.setNewestPosts([...this.newPostsData.data, ...this.homePageData.data.newestPosts]);
    this.newPostsData.setNewPostsData([]);
  },
  /**
   * get post locally from homePageData.newestPosts
   * @param {Number} postID 
   * @returns {Object} post with the corresponding postID
   */
  getPostFromModel: function(postID) {
    const post = this.homePageData.data.newestPosts.find(post => post.id === postID) || this.homePageData.data.topRatedPosts.find(post => post.id === postID) || this.favoritesPageData.data.favoritePosts.find(post => post.id === postID);
    return post;
  },
  listOfTMDBgenre: await listOfGenre(),
  /**
   * Converts a TMDB genre ID to a string of the genre name
   * @param {Number} TMDBgenreID 
   * @returns {String} genre name
   */
  TMDBgenreToString: function(TMDBgenreID) {
    const genre = this.listOfTMDBGenre.find(genre => genre.id === TMDBgenreID);
    return genre.name;
  },
  uuid: uuidv4(),
});



export default model;