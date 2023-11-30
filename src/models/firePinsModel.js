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
      profilePicture: null,
      follows: [], // ["2387dgh2378chr2t7xtrn23723eb3d"]
      followedBy: [],
    }
  }

  /*
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
  */
};
