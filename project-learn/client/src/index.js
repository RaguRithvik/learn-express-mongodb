import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./main.css"
import { ToastContainer } from "react-toastify";
import { store, persistor } from './Store/Store';
import SessionExpiry from './Component/SessionExpiry';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer style={{ top: "10px" }} />
      <SessionExpiry />
    </PersistGate>
  </Provider>
);
