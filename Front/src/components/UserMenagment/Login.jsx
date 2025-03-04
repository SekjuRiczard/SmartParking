import React, { useEffect, useState } from "react";
import PasswordIcon from "@mui/icons-material/Password";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SendIcon from "@mui/icons-material/Send";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ContentCircleDiagram from "../Main/Dashboard/ContentCircleDiagram";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from "react-router-dom";
import { loginUser, slotState } from "../../api/authService";
import { Link } from 'react-router-dom'; // Dodaj import Link
function Login() {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [loginStatus, setLoginStatus] = useState("");
  const [slotStatus, setSlotStatus] = useState({ freeSlots: 0, busySlots: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      const data = await slotState();
      if (data) {
        setSlotStatus(data);
      }
    };
    fetchSlots();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);

    if (result.success) {
      setLoginStatus("Zalogowano pomyślnie!");
      navigate("/");
    } else if (result.status === 403) {
      setLoginStatus("Nieprawidłowy login lub hasło.");
    } else {
      setLoginStatus("Wystąpił błąd");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login">
      <h2 className="loginHeader">Log in</h2>
      <div className="loginContent">
        <div className="left">
          <form className="loginForm" onSubmit={handleSubmit}>
            <h1 style={{ fontFamily: "sans-serif" }}>Welcome back
            <LockOpenIcon sx={{ width: "90px", height: "90px", color: "green" }} />
            </h1>
            
            <ul>
              <li>
                <p>
                <PermIdentityIcon sx={{marginRight: "10px", width: "45px", height: "45px" }} />
                  <input
                    type="text"
                    name="login"
                    placeholder="Username"
                    value={formData.login}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <p>
                  <PasswordIcon sx={{ marginRight: "10px", width: "45px", height: "45px" }} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <p style={{ color: loginStatus.includes("Zalogowano") ? "green" : "red" }}>
                  {loginStatus}
                </p>
                <button className="loginSubmitButton" type="submit">
                  <p>Log in</p>
                  <SendIcon />
                </button>
                <Link to="/register">
                  <button className="registerButton" type="button">
                    <p>Dont have an account? Click here.</p>
                  </button>
                </Link>
              </li>
            </ul>
          </form>
        </div>
        <div className="parkingStatus">
         <div className="parkingChart">
          <h3>Stan miejsc parkingowych</h3>
           <p className="freeSlots">Wolne miejsca: {slotStatus.freeSlots}</p>
           <p className="busySlots">Zajęte miejsca: {slotStatus.busySlots}</p>
         </div>
         </div>
      </div>
    </div>
  );
}

export default Login;
