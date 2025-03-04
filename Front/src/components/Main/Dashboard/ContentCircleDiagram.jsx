import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { slotState } from "../../../api/authService";

function ContentCircleDiagram({ width, height }) {

  const [slotStatus, setSlotStatus] = useState({ freeSlots: 0, busySlots: 0 });

  useEffect(() => {
    const fetchSlots = async () => {
      const data = await slotState();
      if (data) {
        setSlotStatus(data);
      }
    };
    fetchSlots();
  }, []);

  const data = [
    { name: "Free slots", value: slotStatus.freeSlots },
    { name: "Busy slots", value: slotStatus.busySlots },
  ];

  
  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div>
     
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%" 
          cy="43%" 
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend
         verticalAlign="top" 
         align="center"
          />
      </PieChart>
    </div>
  );
}

export default ContentCircleDiagram;
