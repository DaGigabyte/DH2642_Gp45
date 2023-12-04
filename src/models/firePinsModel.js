import { observable, reaction, action } from "mobx";

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
  searchText: "",
  setSearchText(text) {
    this.searchText = text;
  },
  //TODO temporary solution to display custom evt
  confirmUserSearch() {
    alert("User wants to search for:  " + this.searchText);
  },
});
export default model;