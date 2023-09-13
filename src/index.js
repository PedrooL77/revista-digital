import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login';
import Cadastro from "./Cadastro";
import Filmes from './Filmes';
import EditaFilme from './EditaFilme';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#02020c',
      dark: '#02020c',
      contrastText: '#c5bce8',
    },
    secondary: {
      main: '#091bc1',
      light: '#2929e0',
      contrastText: '#c5bce8',
    },
    background: {
      default: '#d4d0d0',
      paper: '#fbf7f7',
    },
    error: {
      main: '#af0a28',
    },
    text: {
      primary: '#201f1f',
      secondary: '#02020c',
    },
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/filmes",
    element: <Filmes />
  },
  {
    path: "/edicao/:id",
    element: <EditaFilme />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
