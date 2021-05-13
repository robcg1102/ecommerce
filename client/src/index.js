import React from "react";
import ReactDOM from "react-dom";
import MyProvider from "./context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css'

ReactDOM.render(
  <MyProvider>
    <Routes />
  </MyProvider>,
  document.getElementById("root")
);

reportWebVitals();
