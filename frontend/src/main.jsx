import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-tiny-fab/dist/styles.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import {store, persistor } from "./core/createStore.js";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
  , rootElement);
} else {
  console.error("Root element not found");
}
