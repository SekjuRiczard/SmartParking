import React, { useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PasswordIcon from "@mui/icons-material/Password";
import BadgeIcon from "@mui/icons-material/Badge";
import SendIcon from "@mui/icons-material/Send";
import { registerUser } from "../../api/authService"; // Import funkcji rejestracji
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    login: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { login, name, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const registerData = {
      login,
      name,
      password,
    };
    const result = await registerUser(registerData); 
    if (result.success) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="registerContainer">
      <h2 className="registerHeader">Register</h2>
      <div className="registerContent">
        <div className="registerLeft">
          <form className="registerForm" onSubmit={handleSubmit}>
            <h1 style={{ fontFamily: "sans-serif" }}>Create an Account</h1>
            <LockOpenIcon
              sx={{
                width: "90px",
                height: "90px",
                color: "purple",
              }}
            />
            <ul>
              <li>
                <p>
                  <PermIdentityIcon
                    sx={{
                      marginRight: "10px",
                      width: "45px",
                      height: "45px",
                    }}
                  />
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
                  <BadgeIcon
                    sx={{
                      marginRight: "10px",
                      width: "45px",
                      height: "45px",
                    }}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <p>
                  <PasswordIcon
                    sx={{
                      marginRight: "10px",
                      width: "45px",
                      height: "45px",
                    }}
                  />
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
                <p>
                  <PasswordIcon
                    sx={{
                      marginRight: "10px",
                      width: "45px",
                      height: "45px",
                    }}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <button className="registerSubmitButton" type="submit">
                  <p>Register</p>
                  <SendIcon />
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
