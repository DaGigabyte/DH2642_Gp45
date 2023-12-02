import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Presenters
import RootPresenter from "./presenters/RootPresenter";
import HomePresenter from "./presenters/HomePresenter";
import AboutPresenter from "./presenters/AboutPresenter";

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
      ],
    },
  ]);
}

function App(props) {
  return <RouterProvider router={createRouter(props)} />;
}

export default App;
