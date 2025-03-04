import React, { useState, useEffect } from "react";
import { apiOccupyFirstAvilable, getAllFreeSlots ,apiOccupySlot } from "../../api/authService";

function FreeSlots() {
  const [freeSlots, setFreeSlots] = useState([]);

  const fetchFreeSlots = async () => {
      const slots = await getAllFreeSlots(); 
      setFreeSlots(slots); 
  };


  useEffect(() => {
    fetchFreeSlots();
  }, []);

  const handleClickedSlot = async (id) => {
    const login = localStorage.getItem("login"); 
    if (!login) {
      console.log("Brak loginu w localStorage");
      return;
    }
      await apiOccupySlot(id, login); 
      fetchFreeSlots();
  };

  return (
    <div className="freeSlotsContainer">
      <h2 style={{ fontFamily: "sans-serif" }}>Free Slots</h2>

      <div className="slotCard" style={{ marginBottom: "30px" }}>
        <div className="slotInfo" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>Occupy first available slot</p>
          <button className="setOccupyButton" onClick={() => handleClickedSlot(freeSlots[0]?.id)}>Get it</button>
        </div>
      </div>
      <div className="slotsGrid">
        {freeSlots.length > 0 ? (
          freeSlots.map((item) => (
            <div key={item.id} className="slotCard">
              <div className="slotInfo">
                <p>ID: {item.id}</p>
                <p>Active: {item.empty ? "Yes" : "No"}</p>
                <button className="setOccupyButton" onClick={() => handleClickedSlot(item.id)}>
                  Occupy
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No available slots</p>
        )}
      </div>
    </div>
  );
}

export default FreeSlots;