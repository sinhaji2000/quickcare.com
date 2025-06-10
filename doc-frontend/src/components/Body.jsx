import { Children } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Homepage from "./Homepage";
import DocNavbar from './Navbar'
import Dashboard from "./Dashboard";


const AppLayout = () => {
  return (
    <>
      <DocNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
     
    </>
  );
};


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Homepage />
      }
      ,
      {
        path : '/dashboard',
        element: <Dashboard />
      }
    ]
  }
])

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-auto scrollbar-none">
      <RouterProvider router={appRouter} />
    </div>
  );
};


export default Body;
