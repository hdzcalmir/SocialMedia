import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from './pages/profile/Profile';
import './style.scss';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

function App() {

  // lazna funkcionalnost s kojom protektujemo layout routes
  // const currentUser = true;

  // sada ovu funkcionalnost iznad mozemo odraditi preko useContexta, odnosno authContexta

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  const { darkMode } = useContext(DarkModeContext);
  // console.log(darkMode);

  // layout koji mozemo koristiti bilo gdje

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  // provjera, odnos ovim smo wrapovali layout linkove
  // te ukoliko korisnik zeli da se prebaci na stranicu
  // od profila i slicno, bez da je logovan samo ce ga vratiti
  // na login stranicu
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    console.log(children);
    //
    return children
  }

  // kreiramo router prije returna
  // i dole u return ga samo includamo putem RouteProvidera
  // preko router={router/sto predstavlja ime arraya route}
  const router = createBrowserRouter([
    {
      path: '/',
      // ovo smo wrap sa protectedRoute tako da korisnik
      // bez logina ne moze uci na profil, jer postoji
      // gore napisana provjera
      // u biti svaki link koji se nalazi unutar
      // layout ce biti provjeren prije nego
      // redirecta, odnosno da li je korisnik prijavljen ili ne
      // sto je uslov za ulaz na stranice od layouta
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile/:id',
          element: <Profile />
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
