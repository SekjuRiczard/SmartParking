import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GarageIcon from "@mui/icons-material/Garage";
import BlockIcon from "@mui/icons-material/Block";
import TodayIcon from '@mui/icons-material/Today';
import Kafel from "./Kafel";
import { Link } from "react-router-dom";
import { allBusySlots, getAllFreeSlots } from "../../../api/authService";

function Header() {
  const [freeSlots, setFreeSlots] = useState(0);
  const [busySlots, setBusySlots] = useState(0);


  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const freeSlotsData = await getAllFreeSlots();
        const busySlotsData = await allBusySlots();

        if (freeSlotsData) {
          setFreeSlots(freeSlotsData.length);  
        }

        if (busySlotsData) {
          setBusySlots(busySlotsData.length);  
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych o miejscach:", error);
      }
    };

    fetchSlots();
  }, []); 

  return (
    <header>
      <div className="headerMain">
        <div className="headerOverview">
          <div className="HomeIcon">
            
            <HomeIcon style={{ width: "50px", height: "50px" }} />
            
          </div>

          <span>Dashboard</span>
        </div>

        <div className="headerUserMenagment">
          <div className="AccountBoxIcon">
            <AccountBoxIcon
              sx={{
                color: "blue",
                width: "50px",
                height: "50px",
              }}
            />
          </div>

          <Link to="/userPanel" className="navLink">
            <span>Your Account</span>
          </Link>
        </div>
      </div>
      <div className="Kafle">
        <Kafel
          kafelDescription="Number of free parking spaces"
          icon={
            <GarageIcon
              sx={{
                color: "blue",
                width: "80px",
                height: "80px",
                marginRight: "25px",
              }}
            />
          }
          freeSlotsNumber={freeSlots}  
        />
        <Kafel
          kafelDescription="Number of occupied parking spaces"
          icon={
            <BlockIcon
              sx={{
                color: "#69163c",
                width: "80px",
                height: "80px",
                marginRight: "25px",
              }}
            />
          }
          busySlotsNumber={busySlots}  
        />
        <Kafel 
        kafelDescription="Today date"
        icon={
          <TodayIcon
              sx={{
                color: "black",
                width: "80px",
                height: "80px",
                marginRight: "25px",
              }}
            />
        }
        />
      
      </div>
    </header>
  );
}

export default Header;
