import React from 'react';
import { RouterProvider } from "react-router-dom";
// import Login from './Pages/Login';
// import { Employee } from './Pages/Employee';
// import Manager from './Pages/Manager';
import { router } from "./router";
function App() {
  return (<RouterProvider router={router} />);
}

export default App;
