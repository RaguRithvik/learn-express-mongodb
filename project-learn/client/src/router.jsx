import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Dashboard from "./Pages/Dashboard";

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
        children: [{
            element: <Dashboard />,
            index: true,
        }]
    }
])