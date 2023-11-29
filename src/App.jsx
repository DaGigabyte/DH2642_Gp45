import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Presenters
import HomePresenter from "./presenters/HomePresenter";
import AboutPresenter from "./presenters/AboutPresenter";
// Views
import RootView from "./views/RootView";

// Create a router
function createRouter(props) {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootView />,
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
      ],
    },
  ]);
}

function App(props) {
  return <RouterProvider router={createRouter(props)} />;
}

export default App;
