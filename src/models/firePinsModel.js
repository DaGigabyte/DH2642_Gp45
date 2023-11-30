export default {
  count: 1,
  setCount(value) {
    this.count = value;
  },
  user: {
    uid: null,
    data: {
      fullName: null, // "Wong Pak Long"
      displayName: null, // "Jasper"
      profilePicture: "default-avatar.jpg",
      follows: [], // ["2387dgh2378chr2t7xtrn23723eb3d"]
      followedBy: [],
    }
  },
  setFullName(name) {
    this.user.fullName = name;
  },
  setDisplayName(name) {
    this.user.displayName = name;
  },
  searchText: null,
  setSearchText(text) {
    this.searchText = text;
  },
  //TODO temporary solution to display custom evt
  confirmUserSearch() {
    alert("User wants to search for:  " + this.searchText);
  },
};
