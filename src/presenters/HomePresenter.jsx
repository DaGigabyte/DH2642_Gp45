import { observer } from "mobx-react-lite";
import Home from "../views/HomePage";
import Topbar from "../views/GeneralTopBar";

function HomePresenter(props) {
  return (
    <div className="flex flex-col">
      <Topbar
        searchText={props.model.searchText}
        profilePicture={props.model.profilePicture}
        setSearchText={(text) => {
          props.model.setSearchText(text);
        }}
        confirmUserSearch={() => {
          props.model.confirmUserSearch();
        }}
      />
      <Home model={props.model} />
    </div>
  );
}

export default observer(HomePresenter);
