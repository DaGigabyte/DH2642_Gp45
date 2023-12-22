import { observer } from "mobx-react-lite";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGuard from "./utils/AuthGuard";

// Presenters
import RootPresenter from "./presenters/RootPresenter";
import HomePresenter from "./presenters/HomePresenter";
import AboutPresenter from "./presenters/AboutPresenter";
import DetailsPresenter from "./presenters/DetailsPresenter";
import FavoritesPresenter from "./presenters/FavoritesPresenter";
import ProfilePresenter from "./presenters/ProfilePresenter";
import SettingsPresenter from "./presenters/SettingsPresenter";
import PageNotFoundPresenter from "./presenters/PageNotFoundPresenter";
import TopRatedPinsPresenter from "./presenters/TopRatedPinsPresenter";
import PrivacyPolicyPresenter from "./presenters/PrivacyPolicyPresenter";

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
          path: "liked-pins",
          element: <FavoritesPresenter model={props.model} />,
        },
        {
          path: "profile/:uid",
          element: <ProfilePresenter model={props.model} />,
        },
        {
          path: "settings",
          element: (
            <AuthGuard model={props.model}>
              <SettingsPresenter model={props.model} />
            </AuthGuard>
          ),
        },
        {
          path: "top-rated-pins",
          element: <TopRatedPinsPresenter model={props.model} />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicyPresenter />,
        },
      ],
    },
  ]);
}

function App(props) {
  return <RouterProvider router={createRouter(props)} />;
}

export default observer(App);
