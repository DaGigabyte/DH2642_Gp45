import React from "react";
import "./services/teacherFetch.js"; // protection against fetch() in infinite re-render
import { configure } from "mobx";
import ReactDOM from "react-dom/client";
import firePinsModel from "./models/firePinsModel.js";
import App from "./App.jsx";
import "./index.css";
import initialiseModel from "./models/initialiseModel.js";

configure({ enforceActions: "observed" }); // All state that is observed somewhere needs to be changed through actions.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App model={firePinsModel} />
  </React.StrictMode>
);

window.myModel = firePinsModel; // For accessing the model in the console.
initialiseModel(firePinsModel);
