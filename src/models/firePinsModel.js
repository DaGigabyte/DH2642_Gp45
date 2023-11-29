export default {
  count: 1,
  setCount(value) {
    this.count = value;
  },

  fullName: 'My Name',
  displayName: 'My Nickname',
  profilePicture: "default-avatar.jpg",

  setPersonId(id){
      this.personId = id; 
  },
  setFullName(name){
      this.fullName = name;
  },
  setDisplayName(name){
      this.displayName = name;
  },

};
