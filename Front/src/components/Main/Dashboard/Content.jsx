import React from "react";
import ContentMainChart from "./ContentMainChart";
import ContentCircleDiagram from "./ContentCircleDiagram";

function Content() {
  return (
    <main>
      
      <div className="mainChart">
      <h3>Status of parking spaces (last 5 minutes)</h3>
        <ContentMainChart />
      </div>
      <div className="circleChart">
      <h3>Overall Slots Count</h3>
        <ContentCircleDiagram width={400} height={350} />
      </div>
    </main>
  );
}

export default Content;
