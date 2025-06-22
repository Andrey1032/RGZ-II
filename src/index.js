import { createHashRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.scss";

import First from "./pages/First";
import NotFoundPage from "./pages/NotFoundPage";
import Second from "./pages/Second";
import Third from "./pages/Third";
import Fourth from "./pages/Fourth";
import Matrix from "./pages/Matrix";
import Algorithm from "./pages/Algorithm";
import Alg4 from "./pages/Alg4";
import Neuralnetwork from "./pages/Neuralnetwork";
import Kmeans from "./pages/Kmeans";
import Alg8 from "./pages/Alg8";
import Help from "./pages/Help";
import Teoria from "./pages/Teoria";

const router = createHashRouter([
  {
    path: "/first",
    element: <First />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/second",
    element: <Second />,
  },
  {
    path: "/third",
    element: <Third />,
  },
  {
    path: "/fourth",
    element: <Fourth />,
  },
  {
    path: "/",
    element: <Matrix />,
  },
  {
    path: "/algorithm",
    element: <Algorithm />,
  },
  {
    path: "/alg4",
    element: <Alg4 />,
  },
  {
    path: "/neural",
    element: <Neuralnetwork />,
  },
  {
    path: "/kmeans",
    element: <Kmeans />,
  },
  {
    path: "/alg8",
    element: <Alg8 />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/teoria",
    element: <Teoria />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}/>);
