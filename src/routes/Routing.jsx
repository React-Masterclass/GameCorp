import { createBrowserRouter } from "react-router-dom";
import Root from '../Pages/Root';
import Home from '../Pages/Home'
import GenrePage from '../Pages/GenrePage';
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Account from "../Pages/Account";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "../Pages/Settings";
import GamePage from "../Pages/GamePage";
import { getSingleGame } from "../Pages/GamePage";
import CommentPage from "../Pages/CommentPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: <Home />,

      },
      {
        path: "/games/:genre",
        element: <GenrePage />,

      },

    ],


  },
  
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/account',
        element: <Account />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      
    ],
  },
  {
    path: '/game/:id',
    element: <GamePage />,
    loader: getSingleGame,
  },
  {
    path: '/game/:id/comment',
    element: <CommentPage />,
    loader: getSingleGame,
  },

]);