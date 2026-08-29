"use client";
import React, { useEffect, useState } from 'react';

const RBACDashboard = ({ role }) => {
  const [data, setData] = useState([]);
  useEffect(() => { console.log('RBACDashboard loaded'); }, []);
  return <div>Painel {role}</div>;
};

export default RBACDashboard;

