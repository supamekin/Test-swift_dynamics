import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./shared/routes";
import BigSpinner from "./shared/components/BigSpinner";
import './shared/i18n/index';

function App() {
  return (
        <RouterProvider router={router} fallbackElement={<BigSpinner />} />
  );
}

export default App;
