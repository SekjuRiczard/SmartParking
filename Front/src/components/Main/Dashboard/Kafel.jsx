import React from "react";

function Kafel({ kafelDescription, icon, freeSlotsNumber, busySlotsNumber }) {
 
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

 
  const renderData = () => {
    if (kafelDescription === "Today date") {
      return formatDate(new Date());
    }
    return freeSlotsNumber !== undefined ? freeSlotsNumber : busySlotsNumber;
  };


  const dateStyle = kafelDescription === "Today date" ? { fontSize: "23px", color: "black" } : {};

  return (
    <div className="kafel">
      <div className="kafelData">
        <h3
          style={{
            borderBottom: "4px solid rgb(94, 100, 151)",
            width: "80%",
            padding: "5px",
          }}
        >
          {kafelDescription}
        </h3>
        <h2 style={dateStyle}>{renderData()}</h2> 
      </div>
      <div className="kafelIcon">{icon}</div>
    </div>
  );
}

export default Kafel;
