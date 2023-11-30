export default {
  count: 1,
  setCount(value) {
    this.count = value;
  },

  fullName: "My Name",
  displayName: "My Nickname",
  profilePicture: "default-avatar.jpg",

  setPersonId(id) {
    this.personId = id;
  },
  setFullName(name) {
    this.fullName = name;
  },
  setDisplayName(name) {
    this.displayName = name;
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
