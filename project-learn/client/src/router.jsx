import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Dashboard from "./Pages/Dashboard";
import { Manager } from "./Pages/Manager";
import { Navigate, useRoutes, useLocation } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                element: (
                    // <Guestguard>
                    <Login />
                    // </Guestguard>
                ),
                index: true,
            }]
    },
    {
        path: "/home",
        element: (
            // <Protected>
            <Main />
            // </Protected>
        ),
        children: [
            { element: <Navigate to="/home" replace />, index: true },
            {
                element: <Dashboard />,
                path: "home/",
            },
            {
                element: <Manager />,
                path: "manager"
            }]
    }
])