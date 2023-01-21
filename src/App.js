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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  // lazna funkcionalnost s kojom protektujemo layout routes
  // const currentUser = true;

  // sada ovu funkcionalnost iznad mozemo odraditi preko useContexta, odnosno authContexta

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  const { darkMode } = useContext(DarkModeContext);
  // console.log(darkMode);

  // layout koji mozemo koristiti bilo gdje

  // pomocu queryclientprovidera mozemo uzeti putem reacta bilo koji podatak iz db
  const queryClient = new QueryClient();

  // queryClientProvider mora wrapovati cijelu aplikaciju, a to smo uradili jer ce sve manje komponente se nalazit onda u tom
  // wrapu i svaki put kada se desi neki request moci cemo dohvatiti odmah te podatke na nasem timeline-u ovaj put jer smo sve te komponente
  // warpovali ranije navedenim queryClientProviderom

  // a necemo wrapovati index js jer nam to treba samo za layout a layout se nalazi u app.js

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
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
