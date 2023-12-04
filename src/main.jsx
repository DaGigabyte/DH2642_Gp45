import React from "react";
import { configure } from "mobx";
import ReactDOM from "react-dom/client";
import firePinsModel from "./models/firePinsModel.js";
// import "./teacherFetch.js"; // protection against fetch() in infinite re-render
import App from "./App.jsx";
import "./index.css";
import {connectToFirebase} from "./firebase/firebaseModel.js";
import settingsReaction from "./components/settings/settingsReaction.js";

configure({ enforceActions: "observed" }); // All state that is observed somewhere needs to be changed through actions.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App model={firePinsModel} />
  </React.StrictMode>
);

window.myModel = firePinsModel; // For debugging purposes
connectToFirebase(firePinsModel);
settingsReaction(firePinsModel);