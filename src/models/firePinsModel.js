const model = {
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
  userSettingsData: {
    data: {
      fullName: null,
      displayName: null,
    },
    setFullName(name) {
      this.data.fullName = name;
    },
    setDisplayName(name) {
      this.data.displayName = name;
    },
    storeUpdates() {
      model.user.data = { ...model.user.data, ...this.data };
    },
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
export default model;