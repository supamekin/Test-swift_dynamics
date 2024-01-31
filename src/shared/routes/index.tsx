import { createBrowserRouter, } from "react-router-dom";

import Root from "./root";
import RegisterFormPage from "../../features/register/registerFormPages";
import HomePages from "../../features/home/homePages";
import TestDirection from "../../features/test-direction/testDirection";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path:"home",
        element: <HomePages />,
      },
      {
        path:"register",
        element: <RegisterFormPage />,
      },
      {
        path:"layout-style",
        element: <TestDirection />,
      },
    ],
  },
]);
export default router;
