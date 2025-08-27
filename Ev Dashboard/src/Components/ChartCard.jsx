import React from "react";

const ChartCard = ({ title, children }) => (
  <div className="bg-white shadow-md p-4 rounded-lg h-full flex flex-col">
    <h3 className="text-gray-700 font-semibold mb-3">{title}</h3>
    <div className="flex-1">
      {children}
    </div>
  </div>
);


export default ChartCard;
