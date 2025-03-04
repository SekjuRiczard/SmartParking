import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { slotState } from "../../../api/authService";
function ContentMainChart() {
  const [slotStatus, setSlotStatus] = useState({
    freeSlots: 0,
    busySlots: 0,
  });
  const [chartData, setChartData] = useState([]);

  // Funkcja do pobierania danych z serwera
  const fetchSlots = async () => {
    const data = await slotState(); // Zakładając, że slotState() zwraca dane z serwera
    if (data) {
      setSlotStatus(data);
    }
  };

  // Efekt do odświeżania danych co 5 sekund
  useEffect(() => {
    // Sprawdzenie, czy dane są zapisane w localStorage
    const savedData = JSON.parse(localStorage.getItem("slotData"));
    if (savedData) {
      setChartData(savedData);
    }

    const interval = setInterval(() => {
      fetchSlots(); // Pobranie nowych danych
    }, 10000); // Co 10 sekund

    // Czyszczenie interval po odmontowaniu komponentu
    return () => clearInterval(interval);
  }, []);

  // Efekt do aktualizowania wykresu po zmianie danych
  useEffect(() => {
    const now = new Date().toLocaleTimeString(); // Czas w formacie HH:MM:SS

    // Dodawanie nowego punktu do wykresu
    setChartData(prevData => {
      const newData = [...prevData, { time: now, busySlots: slotStatus.busySlots }];

      // Zapisywanie danych w localStorage
      localStorage.setItem("slotData", JSON.stringify(newData));

      return newData;
    });
  }, [slotStatus]); // Zmieniamy wykres, gdy zmieniają się dane slotStatus

  const handleDataRemove = ()=>{
    localStorage.removeItem("slotData")
  }
  return (
    <div>
     <button onClick={handleDataRemove}>reset</button>
      <ResponsiveContainer width={700} height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="busySlots" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ContentMainChart;
