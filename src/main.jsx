import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import About from "./components/about/About.jsx";
import Cart from "./components/cart/Cart.jsx";
import Body from "./components/body/Body.jsx";
import Error from "./utils/Error.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestrauntMenu from "./components/restraunt Menu/RestrauntMenu.jsx";
const Grocery = lazy(() => import("./components/Grocery/Grocery.jsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Body /> },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restraunts/:resId",
        element: <RestrauntMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<>loadingggg..</>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
