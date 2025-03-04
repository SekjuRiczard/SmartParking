import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import InfoIcon from "@mui/icons-material/Info";

function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [admin, isAdmin] = useState(false);



  function toggleNav() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <div className="nav-container">
      <nav className={isCollapsed ? "collapsed" : ""}>
        <div>
          <img className="logo" src="/logo.png" alt="Logo" />
        </div>

        <ul>
          <Link to="/" className="navLink">
            <li>
              <NavigationItem
                itemDescription="Dashboard"
                icon={<SignalCellularAltIcon />}
              />
            </li>
          </Link>

          <Link to="/freeSlots" className="navLink">
            <li>
              <NavigationItem
                itemDescription="Free Slots"
                icon={<NoCrashIcon />}
              />
            </li>
          </Link>

          <Link to="/busySlots" className="navLink">
            <li>
              <NavigationItem
                itemDescription="Busy Slots"
                icon={<CarCrashIcon />}
              />
            </li>
          </Link>

          <Link to="/informations" className="navLink">
            <li>
              <NavigationItem
                itemDescription="Information"
                icon={<InfoIcon />}
              />
            </li>
          </Link>
         
        </ul>
      </nav>
      <button onClick={toggleNav} className="toggle-button">
        {isCollapsed ? (
          <KeyboardDoubleArrowRightIcon />
        ) : (
          <KeyboardDoubleArrowLeftIcon />
        )}
      </button>
    </div>
  );
}

export default Navigation;
