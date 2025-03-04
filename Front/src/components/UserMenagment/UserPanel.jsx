import React, { useState,useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { getUserData } from "../../api/authService";

function UserPanel() {
  const [userData, setUserData] = useState(null);
 

  useEffect(() => {
    const login = localStorage.getItem("login"); 
    if (login) {
      getUserData(login).then((data) => {
        if (data) {
          setUserData(data); 
        }
      });
    }
  }, []); 

  

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("login");
    console.log("Token usunięty z localStorage");
    window.location.reload();
  };

  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="userInformationsContainer">
      <div>
        <div className="userData">
          <AccountCircleIcon sx={{ width: "100px", height: "100px", color: "blue" }} />
          <h6>User informations</h6>

          <div>
            <h5>Name: </h5> <span>{userData.name}</span>
          </div>
          <div>
            <h5>Status: </h5> <span>{userData.active? "Active" : "Inactive"}</span>
          </div>
          <div>
            <h5>Role: </h5> <span>{userData.role}</span>
          </div>

          <button className="setOccupyButton" onClick={handleLogout}>Log out</button>
          {userData.role === "ADMIN" && (
            <Link to="/usersList">
              <button className="showUsersButton">Show users List</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPanel;