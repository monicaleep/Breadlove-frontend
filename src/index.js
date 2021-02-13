import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom"
// Components imports
import App from "./App";
// CSS imports
import "./css/index.css";


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
