import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import EditArticle from "./components/EditArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/editArticle/:id", element: <EditArticle /> },
    ],
  },
]);

export default router;
