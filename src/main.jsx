import React from "react";
import { observable, configure } from "mobx";
import ReactDOM from "react-dom/client";
import firePinsModel from "./models/firePinsModel.js";
// import "./teacherFetch.js"; // protection against fetch() in infinite re-render
import App from "./App.jsx";
import "./index.css";
import {connectToFirebase} from "./firebase/firebaseModel.js";

configure({ enforceActions: "observed" }); // All state that is observed somewhere needs to be changed through actions. how
const reactiveModel = observable(firePinsModel);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App model={reactiveModel} />
  </React.StrictMode>
);

window.myModel = reactiveModel; // For debugging purposes
connectToFirebase(reactiveModel);