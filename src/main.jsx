import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import About from "./components/about/About.jsx";
import Cart from "./components/cart/Cart.jsx";
import Body from "./components/body/Body.jsx";
import Error from "../src/utils/error/ErrorPage.jsx";
import Header from "./components/header/Header.jsx";
import Help from "./components/help/Help.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestrauntMenu from "./components/restraunt Menu/RestrauntMenu.jsx";
import LandingPage from "./components/landing page/LandingPage.jsx";
import HeaderBottom from "./components/header/HeaderBottom.jsx";

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
            <Header />
            <Body />
            <HeaderBottom />
          </>
        ),
      },
      {
        path: "/about",
        element: (
          <>
            <Header />
            <About />
            <HeaderBottom />
          </>
        ),
      },
      {
        path: "/cart",
        element: (
          <>
            <Header />
            <Cart />
            <HeaderBottom />
          </>
        ),
      },
      {
        path: "/help",
        element: (
          <>
            <Header />
            <Help />
            <HeaderBottom />
          </>
        ),
      },

      {
        path: "home/restraunts/:resId",
        element: (
          <>
            <Header />
            <RestrauntMenu />
            <HeaderBottom />
          </>
        ),
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<>loadingggg..</>}>
            <>
              {" "}
              <Header />
              <Grocery />
              <HeaderBottom />
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
