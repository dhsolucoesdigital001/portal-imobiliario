import React from 'react';

const BaseCard = ({ title, children }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <div className="text-gray-700 text-base">
      {children}
    </div>
  </div>
);

export default BaseCard;
