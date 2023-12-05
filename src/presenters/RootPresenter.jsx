import { observer } from "mobx-react-lite";
import RootView from "../views/RootView";
import { signInACB, signOutACB } from "../firebase/firebaseModel";

function RootPresenter(props) {
  return (
    <RootView
      searchText={props.model.searchText}
      profilePicture={props.model.user?.data?.profilePicture || ""}
      setSearchText={(text) => {
        props.model.setSearchText(text);
      }}
      confirmUserSearch={() => {
        props.model.confirmUserSearch();
      }}
      onSignIn={signInACB}
      onSignOut={signOutACB}
      uid={props.model.user.uid}
    />
  );
}

export default observer(RootPresenter);
