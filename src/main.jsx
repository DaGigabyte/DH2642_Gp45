import React from "react";
import "./services/teacherFetch.js"; // protection against fetch() in infinite re-render
import { configure } from "mobx";
import ReactDOM from "react-dom/client";
import firePinsModel from "./models/firePinsModel.js";
import App from "./App.jsx";
import "./index.css";
import initialiseModel from "./models/initialiseModel.js";
// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

configure({ enforceActions: "observed" }); // All state that is observed somewhere needs to be changed through actions.
if (!new class { x }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly for MobX');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App model={firePinsModel} />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>
);

window.myModel = firePinsModel; // For accessing the model in the console.
initialiseModel(firePinsModel);
