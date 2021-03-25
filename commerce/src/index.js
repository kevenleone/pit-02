import React from "react";
import { ClayIconSpriteContext } from "@clayui/icon";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ToastContainer} from 'react-toastify'
import spritemap from './icons.svg';
import "@clayui/css/lib/css/atlas.css";
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';

ReactDOM.render(
  <ClayIconSpriteContext.Provider value={spritemap}>
    <React.StrictMode>
      <ToastContainer />
      <App />
    </React.StrictMode>
  </ClayIconSpriteContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
