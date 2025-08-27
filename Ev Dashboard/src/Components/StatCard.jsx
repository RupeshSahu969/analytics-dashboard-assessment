import React from "react";

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow-md p-4 rounded-lg text-center">
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatCard;
