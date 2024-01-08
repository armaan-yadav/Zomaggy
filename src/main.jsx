import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import About from "./components/about/About.jsx";
import Cart from "./components/cart/Cart.jsx";
import Body from "./components/body/Body.jsx";
import Error from "./utils/Error.jsx";
import Header from "./components/header/Header.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestrauntMenu from "./components/restraunt Menu/RestrauntMenu.jsx";
import LandingPage from "./components/landing page/LandingPage.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore.jsx";

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
          </>
        ),
      },
      {
        path: "/about",
        element: (
          <>
            <Header />
            <About />
          </>
        ),
      },
      {
        path: "/cart",
        element: (
          <>
            <Header />
            <Cart />
          </>
        ),
      },
      {
        path: "/restraunts/:resId",
        element: (
          <>
            <Header />
            <RestrauntMenu />
          </>
        ),
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<>loadingggg..</>}>
            <>
              <Header />
              <Grocery />
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
