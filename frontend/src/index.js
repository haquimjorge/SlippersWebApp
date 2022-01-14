import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./redux/reducers/mainReducer.js";
// import paymentRoutes from "../src/routers/paymentroutes.js";
// import express from "express";

const globalStore = createStore(mainReducer, applyMiddleware(thunk));

// const app = express();
// app.use(paymentRoutes);


ReactDOM.render(
  <Provider store={globalStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
