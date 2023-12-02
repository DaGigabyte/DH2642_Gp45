import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Presenters
import RootPresenter from "./presenters/RootPresenter";
import HomePresenter from "./presenters/HomePresenter";
import AboutPresenter from "./presenters/AboutPresenter";
import FavoritesPresenter from "./presenters/FavoritesPresenter";

import Auth from "./presenters/AuthPresenter";
import { signInACB, signOutACB } from "./firebase/firebaseModel";
import { observer } from "mobx-react-lite";

// Create a router

function createRouter(props) {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootPresenter model={props.model} />,
      errorElement: <div>Error page</div>,
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
          path: "favorites",
          element: <FavoritesPresenter model={props.model} />,
        },
        {
          path: "firebase-debug",
          element: <Auth onSignIn={signInACB} onSignOut={signOutACB} uid={props.model.user.uid}/>,
        },
      ],
    },
  ]);
}


function App(props) {
  return <RouterProvider router={createRouter(props)} />;
  // return <Auth onSignIn={signInACB} onSignOut={signOutACB} uid={props.model.user?.uid}/>;
}

export default observer(App);
