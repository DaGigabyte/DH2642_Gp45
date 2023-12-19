import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Presenters
import RootPresenter from "./presenters/RootPresenter";
import HomePresenter from "./presenters/HomePresenter";
import AboutPresenter from "./presenters/AboutPresenter";
import DetailsPresenter from "./presenters/DetailsPresenter";
import FavoritesPresenter from "./presenters/FavoritesPresenter";
import ProfilePresenter from "./presenters/ProfilePresenter";
import SettingsPresenter from "./presenters/SettingsPresenter";
import PageNotFoundPresenter from "./presenters/PageNotFoundPresenter";

import { observer } from "mobx-react-lite";

// Create a router

function createRouter(props) {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootPresenter model={props.model} />,
      errorElement: <PageNotFoundPresenter />,
      children: [
        {
          path: "/",
          element: <HomePresenter model={props.model} />,
        },
        {
          path: "about-us",
          element: <AboutPresenter model={props.model} />,
        },
        {
          path: "post/:pid",
          element: <DetailsPresenter model={props.model} />,
        },
        {
          path: "favorites",
          element: <FavoritesPresenter model={props.model} />,
        },
        {
          path: "profile/:uid",
          element: <ProfilePresenter model={props.model} />,
        },
        {
          path: "settings",
          element: <SettingsPresenter model={props.model} />,
        },
      ],
    },
  ]);
}

function App(props) {
  return <RouterProvider router={createRouter(props)} />;
}

export default observer(App);
