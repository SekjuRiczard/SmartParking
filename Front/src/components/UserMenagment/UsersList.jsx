import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import { getUsersList } from "../../api/authService";
import { deactivateUser } from "../../api/authService"; 

function UsersList() {
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsersList();
      if (data) {
        setUsers(data); 
      }
    };
    fetchUsers();
  }, []); 

  const handleSwitchChange = async (login, currentStatus) => {
    try {
      const updatedUser = await deactivateUser(login);
      
      if (updatedUser) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.login === login ? { ...user, active: !currentStatus } : user
          )
        );
      }
    } catch (error) {
      console.error("Błąd przy aktualizacji statusu użytkownika:", error);
    }
  };

  return (
    <div className="usersListContainer">
      <h2 style={{ fontFamily: "sans-serif" }}>User List</h2>
      <div className="usersGrid">
        {users.map((user) => (
          <div key={user.id} className="userCard">
            <AccountCircleIcon sx={{ fontSize: 40, color: "#3f8efc" }} />
            <div className="userInfo">
              <p>ID: {user.id}</p>
              <p>Login: {user.login}</p>
              <p>Active: {user.active ? "Yes" : "No"}</p>
            </div>
            <Switch
              checked={user.active} 
              color="primary"
              onChange={() => handleSwitchChange(user.login, user.active)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
