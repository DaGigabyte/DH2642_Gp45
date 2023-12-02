import { observer } from "mobx-react-lite";
import RootView from "../views/RootView";

function RootPresenter(props) {
  return (
    <RootView
      searchText={props.model.searchText}
      profilePicture={props.model.user.data.profilePicture}
      setSearchText={(text) => {
        props.model.setSearchText(text);
      }}
      confirmUserSearch={() => {
        props.model.confirmUserSearch();
      }}
    />
  );
}

export default observer(RootPresenter);
