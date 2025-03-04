import React, { useEffect, useState } from "react";
import { allBusySlots, releaseSlot, getUserSlot } from "../../api/authService"; 

function BusySlots() {
  const [busySlots, setBusySlots] = useState([]); 
  const [userSlot, setUserSlot] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
        const login = localStorage.getItem("login"); 
        if (!login) {
          console.error("Brak loginu w localStorage!");
          setLoading(true);
          return;
        }
        const busySlotsData = await allBusySlots(); 
        const userSlotData = await getUserSlot(login); 
        setBusySlots(busySlotsData || []);
        setUserSlot(userSlotData || null);
      
    };

    fetchData();
  }, []); 


  const handleRelease = async () => {
    try {
      const result = await releaseSlot(); 
      if (result) {
        alert("Parking slot released successfully!");
        const busySlotsData = await allBusySlots();
        setBusySlots(busySlotsData || []);
        setUserSlot(null);
      } else {
        alert("Failed to release parking slot.");
      }
    } catch (error) {
      console.error("Błąd podczas zwalniania slotu:", error);
      alert("An error occurred while releasing the parking slot.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="busy-slots-container">
      {userSlot && (
        <div className="release-slot-card">
          <p className="release-slot-text">Release Parking Slot</p>
          <button className="release-slot-button" onClick={handleRelease}>
            Release
          </button>
        </div>
      )}
      <h2 className="busy-slots-title">Busy Slots</h2>
      <div className="slots-grid">
        {busySlots.map((item) => (
          <div key={item.id} className="slot-card">
            <div className="slot-info">
              <p>ID: {item.id}</p>
              <p>Active: {item.isEmpty ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusySlots;
