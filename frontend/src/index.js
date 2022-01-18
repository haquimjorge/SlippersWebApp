import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./redux/reducers/mainReducer.js";


const globalStore = createStore(mainReducer, applyMiddleware(thunk));




ReactDOM.render(
  <Provider store={globalStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
