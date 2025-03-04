import React from "react";

function NavigationItem({ itemDescription, icon }) {
  return (
    <div>
      {icon} 
      <span className="itemsTitle">{itemDescription}</span>
    </div>
  );
}

export default NavigationItem;
