"use client";
import React from 'react';
import { BedDouble, Bath, Car } from 'lucide-react'; // Sugestão de ícones

const BaseCard = ({ property }) => {
  const { title, price, img, beds, baths, garage, type } = property;
  
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white border border-gray-200 transition-transform hover:scale-[1.02] cursor-pointer">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={img} alt={title} />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {type === 'rent' ? 'Aluguel' : 'Venda'}
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2 truncate">{title}</h2>
        <p className="text-2xl font-extrabold text-blue-700 mb-4">{price}</p>
        <div className="flex justify-between text-gray-600 text-sm">
          <div className="flex items-center gap-1"><BedDouble size={16} /> {beds} qtos</div>
          <div className="flex items-center gap-1"><Bath size={16} /> {baths} banh</div>
          <div className="flex items-center gap-1"><Car size={16} /> {garage} vaga</div>
        </div>
      </div>
    </div>
  );
};

export default BaseCard;

