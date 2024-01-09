import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import About from "./components/about/About.jsx";
import Cart from "./components/cart/Cart.jsx";
import Body from "./components/body/Body.jsx";
import Error from "../src/utils/error/ErrorPage.jsx";
import Header from "./components/header/Header.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestrauntMenu from "./components/restraunt Menu/RestrauntMenu.jsx";
import LandingPage from "./components/landing page/LandingPage.jsx";
import Protected from "./utils/Protected.jsx";

const Grocery = lazy(() => import("./components/Grocery/Grocery.jsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: (
          <>
            <Protected>
              <Header />
              <Body />
            </Protected>
          </>
        ),
      },
      {
        path: "/about",
        element: (
          <>
            <Protected>
              <Header />
              <About />
            </Protected>
          </>
        ),
      },
      {
        path: "/cart",
        element: (
          <>
            <Protected>
              <Header />
              <Cart />
            </Protected>
          </>
        ),
      },

      {
        path: "home/restraunts/:resId",
        element: (
          <>
            <Protected>
              <Header />
              <RestrauntMenu />
            </Protected>
          </>
        ),
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<>loadingggg..</>}>
            <>
              <Protected>
                {" "}
                <Header />
                <Grocery />
              </Protected>
            </>
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
