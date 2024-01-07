import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Dashboard from "./Pages/Dashboard";
import { Manager } from "./Pages/Manager";
import { Navigate } from "react-router-dom";
import { Employee } from "./Pages/Employee";
import AuthGuard from "./Component/AuthGuard";
import GeustGuard from "./Component/GeustGuard";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                element: (
                    <GeustGuard>
                        <Login />
                    </GeustGuard>
                ),
                index: true,
            }]
    },
    {
        path: "/home",
        element: (
            <AuthGuard>
                <Main />
            </AuthGuard>
        ),
        children: [
            { element: <Navigate to="/home/app" replace />, index: true },
            {
                element: <Dashboard />,
                path: "app",
            },
            {
                element: <Manager />,
                path: "manager"
            },
            {
                element: <Employee />,
                path: "employee"
            },
        ]
    }
])