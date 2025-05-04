'use client'

import React from 'react';

type CardProps = {
  title: string;
  value: number | string;
};

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="border text-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <p className="text-3xl font-semibold">{typeof value === 'number' ? value.toString().padStart(2, '0') : value}</p>
    </div>
  );
};

export default Card;