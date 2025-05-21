// src/Body.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Home from "./Home";
import UserSignup from "./UserSignup";
import NavBar from "./Navbar";
import UserLogin from "./UserLogin";
import UserProfile from "./UserProfile";
import DocDetail from "./DocDetail"
import Footer from "./Footer";
import BookAppointment from "./BookAppointment";

// Layout that includes Navbar + nested page via <Outlet />
const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer/>
    </>
  );
};

// Proper router configuration with layout
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Wrap all routes with Navbar
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "user/signup",
        element: <UserSignup />
      },
      {
        path: "user/login",
        element: <UserLogin />
      },
      {
        path:"user/profile",
        element: <UserProfile />
      },
      {
        path : "doc/:id",
        element : <DocDetail/>
      },
      {
        path : 'book-appointment/:id',
        element : <BookAppointment/>
      }

    ]
  }
]);

const Body = () => {
  return (
    <div className="overflow-x-auto scrollbar-none">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
