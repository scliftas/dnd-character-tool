import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import List from "./pages/list/List";
import listLoader from "./pages/list/listLoader";
import Create from "./pages/create/Create";
import createAction from "./pages/create/createAction";
import View from "./pages/view/View";
import viewLoader from "./pages/view/viewLoader";
import reportWebVitals from "./reportWebVitals";
import "typeface-roboto";
import "typeface-bree-serif";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <List />,
        loader: listLoader,
      },
      {
        path: "/create",
        element: <Create />,
        action: createAction,
      },
      {
        path: "/characters/:characterIndex",
        element: <View />,
        loader: viewLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
