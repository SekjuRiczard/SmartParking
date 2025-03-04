import React from "react";
import Dashboard from "./components/Main/Dashboard/Dashboard";
import Navigation from "./components/Navigation/Navigation";
import BusySlots from "./components/SlotsStatus/busySlots";
import FreeSlots from "./components/SlotsStatus/FreeSlots";
import Informations from "./components/SlotsStatus/Informations";
import UserPanel from "./components/UserMenagment/UserPanel";
import Login from "./components/UserMenagment/Login";
import Register from "./components/UserMenagment/Register";
import UsersList from "./components/UserMenagment/UsersList";
import PrivateRoute from "./components/Navigation/PrivateRoute";
import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./index.css";

function App() {
  const location = useLocation();
  const hideNavigation =
    location.pathname === "/login" || location.pathname === "/register";
    const navigate = useNavigate();

    
  
    useEffect(() => {
      const checkTokenExpiration = () => {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); 
          const expirationTime = decodedToken.exp * 1000; 
          const currentTime = Date.now(); 
          const timeRemaining = Math.max((expirationTime - currentTime) / (1000 * 60), 0); 
  
          console.log(`Token wygasa za ${timeRemaining.toFixed(2)} minut(y).`);
  
        
          if (currentTime > expirationTime) {
            localStorage.removeItem('accessToken'); 
            navigate('/login'); 
          }
        }
      };
      const interval = setInterval(checkTokenExpiration, 1 * 1000);
      return () => clearInterval(interval);
    }, [navigate]);
    

  return (
    <div className="AppContainer">
      {!hideNavigation && <Navigation />}
      <div className="ContentContainer">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/busySlots"
            element={
              <PrivateRoute>
                <BusySlots />
              </PrivateRoute>
            }
          />
          <Route
            path="/freeSlots"
            element={
              <PrivateRoute>
                <FreeSlots />
              </PrivateRoute>
            }
          />
          <Route
            path="/informations"
            element={
              <PrivateRoute>
                <Informations />
              </PrivateRoute>
            }
          />
          <Route
            path="/userPanel"
            element={
              <PrivateRoute>
                <UserPanel />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/usersList"
            element={
              <PrivateRoute>
                <UsersList />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
