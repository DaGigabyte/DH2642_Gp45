import { observable, action, autorun } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { listOfGenre } from "../services/firePinsSource";
import { savePostToFirestore, removePostFromFirestore, queryTopPosts, queryFavoritePosts, likePostFirestore, dislikePostFirestore, followUserFirestore, unfollowUserFirestore, saveCommentToFireStore, removeCommentFromFirestore } from "../firebase/firebaseModel";
import NewestPostListenerManager from "../firebase/NewestPostListenerManager";
import FavoritesPostListenerManager from "../firebase/FavoritesPostListenerManager";

const model = observable({
  count: 1,
  setCount(value) {
    this.count = value;
  },
  
  /* Left here for reference (refer to Firebase usage.md)*/
  userReady: null,
  setUserReady: action(function(value) {
    this.userReady = value;
  }),
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
      this.uid = uid;
    }),
    setData: action(function(data) {
      this.data = data;
    }),
  },
  setUser: action(function(userObj) {
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
      this.data.fullName = name;
    }),
    setDisplayName: action(function(name) {
      this.data.displayName = name;
    }),
    setDisplayNameInsensitive: action(function(name) {
      const nameLowerCase = name?.toLowerCase();
      this.data.displayNameInsensitive = nameLowerCase;
    }),
    setBio: action(function(bio) {
      this.data.bio = bio;
    }), 
  },
  storeUpdates: action(function() {
    const newUserData = { ...this.user.data, ...this.userSettingsData.data };
    this.user.setData(newUserData);
  }),
  createPostEditor: {
    data: {
        title: "",
        content: "",
        posterPath: "",
        source: "",
        TMDBsourceID: null,
        TMDBgenres: [],
        TMDBdateOfMovieRelease: "",
        postDescription: "",
        rating: null,
    },
    createPostStatus: null, // Has one of the values, 'loading, 'success' or 'error' depending on the state of the fetching
    setCreatePostStatus: action(function(status) {
      this.createPostStatus = status;
    }),
    setTitle: action(function(title) {
      this.data.title = title;
    }),
    setContent: action(function(content) {
      this.data.content = content;
    }),
    setPosterPath: action(function(posterPath) {
      this.data.posterPath = posterPath;
    }),
    setSource: action(function(source) {
      this.data.source = source;
    }),
    setTMDBsourceID: action(function (source) {
      this.data.TMDBsourceID = source;
    }),
    setTMDBgenres: action(function (TMDBgenres) {
      this.data.TMDBgenres = TMDBgenres;
    }),
    setTMDBdateOfMovieRelease: action(function (TMDBdateOfMovieRelease) {
      this.data.TMDBdateOfMovieRelease = TMDBdateOfMovieRelease;
    }),
    setPostDescription: action(function (postDescription) {
      this.data.postDescription = postDescription;
    }),
    setRating: action(function (rating) {
      this.data.rating = rating;
    })
  },
  createPost: action(async function() {
    this.createPostEditor.setCreatePostStatus("loading");
    savePostToFirestore(this.createPostEditor.data, this.user.uid)
      .then(()=> {
          this.createPostEditor.setCreatePostStatus("success");
      })
      .catch((error)=> {
          this.createPostEditor.setCreatePostStatus("error");
      });
  }),
  homePageData: {
    scrollPosition: 0,
    setScrollPosition: action(function(position) {
      this.scrollPosition = position;
    }),
  },
  topRatedPostsData: {
    topRatedPosts: [],
    setTopRatedPosts: action(function(posts) {
      this.topRatedPosts = posts;
    }),
    fetchTopPosts: async function() {
      const posts = await queryTopPosts(12); // Hardcoded posts fetched once when app is initialised
      this.setTopRatedPosts(posts);
    },
  },
  newestPostsData: {
    newestPosts: [],
    newestPostsBeforeTimeOfConstruction: [],
    endOfNewestPostsBeforeTimeOfConstruction: false,
    newestPostsAfterTimeOfConstruction: [],
    setNewestPosts: action(function(posts) {
      this.newestPosts = posts;
    }),
    setNewestPostsBeforeTimeOfConstruction: action(function(posts) {
      this.newestPostsBeforeTimeOfConstruction = posts;
    }),
    setEndOfNewestPostsBeforeTimeOfConstruction: action(function(endOfPosts) {
      this.endOfNewestPostsBeforeTimeOfConstruction = endOfPosts;
    }),
    setNewestPostsAfterTimeOfConstruction: action(function(posts) {
      this.newestPostsAfterTimeOfConstruction = posts;
    }),
    fetchNewestPosts: async function() {
      newestPostListenerManager.addNewestPostsListener();
    },
  },
  postDetailData: {
    currentPostID: null,
    comment: "",
    postCommentStatus: null, // Has one of the values, 'loading, 'success' or 'error' depending on the state of the posting comment
    setPostCommentStatus: action(function(status) {
      this.postCommentStatus = status;
    }),
    removeCommentStatus: null, // Has one of the values, 'loading, 'success' or 'error' depending on the state of removing comment
    setRemoveCommentStatus: action(function(status) {
      this.removeCommentStatus = status;
    }),
    postData: {
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
    },
    removePostStatus: null, // Has one of the values, 'loading, 'success' or 'error' depending on the state of removing post
    setRemovePostStatus: action(function(status){
      this.removePostStatus = status;
    }),
    unsubscribePostData: null,
    setPostData: action(function(postData) {
      this.postData = postData;
    }),
    setUnsubscribePostData: action(function(unsubscribeFunc) {
      this.unsubscribePostData = unsubscribeFunc;
    }),
    postComments: null, // Array of comments on the post
    unsubscribePostCommentsData: null,
    setPostComments: action(function(comments) {
      this.postComments = comments;
    }),
    setUnsubscribePostCommentsData: action(function(unsubscribeFunc) {
      this.unsubscribePostCommentsData = unsubscribeFunc;
    }),
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
      this.setPostCommentStatus("loading");
      try {
        await saveCommentToFireStore(commentObj, this.currentPostID);
        this.setPostCommentStatus("success");
      } catch (error) {
        this.setPostCommentStatus("error");
      }
    },
    removeComment: async function (commentId) {
      this.setRemoveCommentStatus("loading");
      try {
        await removeCommentFromFirestore(this.currentPostID, commentId);
        this.setRemoveCommentStatus("success");
      } catch (error) {
        this.setRemoveCommentStatus("error");
      }
    },
    likePost: async function () {
      await likePostFirestore(model.user.uid, this.currentPostID);
    },
    dislikePost: async function () {
      await dislikePostFirestore(model.user.uid, this.currentPostID);
    },
    removePost: async function () {
      this.setRemovePostStatus("loading");
      try {
        await removePostFromFirestore(this.currentPostID);
        this.setRemovePostStatus("success");
      } catch (error) {
        this.setRemovePostStatus("error");
      }
    }
  },
  profilePageData: {
    currentProfileUid: null,
    unsubscribeProfileData: null, // Function to unsubsribe from profile data listener
    unsubscribePostsData: null, // Function to unsubscribe from user posts data listener
    profileBannerPromiseState: {
      promise: null,
      data: {
        profilePicture: null,
        displayName: null,
        bio: null,
        followedBy: [],
        follows: [],
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
    userPosts: [],
    setUserPosts: action(function(data) {
      this.userPosts = data;
    }),
    setCurrentProfileUid: action(function(uid) {
      this.currentProfileUid = uid;
    }),
    setUnsubscribeProfileData: action(function(unsubscribeFunc) {
      this.unsubscribeProfileData = unsubscribeFunc;
    }),
    setUnsubscribePostsData: action(function(unsubscribeFunc) {
      this.unsubscribePostsData = unsubscribeFunc;
    }),
    followUser: async function () {
      try {
          await followUserFirestore(this.currentProfileUid, model.user.uid);
      } catch (error) {
      }
    },
    unfollowUser: async function () {
      try {
          await unfollowUserFirestore(this.currentProfileUid, model.user.uid);
      } catch (error) {
      }
    },
  },
  favoritesPageData: {
    favoritePosts: [],
    newestPostsBeforeTimeOfConstruction: [],
    endOfNewestPostsBeforeTimeOfConstruction: false,
    newestPostsAfterTimeOfConstruction: [],
    setFavoritePosts: action(function(posts) {
      this.favoritePosts = posts;
    }),
    setNewestPostsBeforeTimeOfConstruction: action(function(posts) {
      this.newestPostsBeforeTimeOfConstruction = posts;
    }),
    setEndOfNewestPostsBeforeTimeOfConstruction: action(function(endOfPosts) {
      this.endOfNewestPostsBeforeTimeOfConstruction = endOfPosts;
    }),
    setNewestPostsAfterTimeOfConstruction: action(function(posts) {
      this.newestPostsAfterTimeOfConstruction = posts;
    }),
    fetchFavoritePosts: async function() {
      const posts = await queryFavoritePosts(10, model.user.uid); // Hardcoded posts fetched once when app is initialised
      this.setFavoritePosts(posts);
    },
  },
  /**
   * get post locally from homePageData.newestPosts
   * @param {Number} postID 
   * @returns {Object} post with the corresponding postID
   */
  getPostFromModel: function(postID) {
    const post = this.newestPostsData.newestPosts.find(post => post.id === postID) || this.topRatedPostsData.topRatedPosts.find(post => post.id === postID) || this.favoritesPageData.favoritePosts.find(post => post.id === postID);
    return post;
  },
  listOfTMDBgenre: [],
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

const newestPostListenerManager = new NewestPostListenerManager(model.newestPostsData);
const favoritePostListenerManager = new FavoritesPostListenerManager(model.favoritesPageData);
autorun(() => {favoritePostListenerManager.setUserID(model.user.uid);});

export default model;