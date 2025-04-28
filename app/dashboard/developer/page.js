'use client';
import React, { useState } from 'react';
import HeaderDeveloper from './Header';
import Test from './Test';
import Production from './Production';

export default function DeveloperPage() {
  const [isOn, setIsOn] = useState(true);
  

  return (

    <div className=" bg-white rounded-md pt-3 ml-0  p-2 border border-gray-200">
      <HeaderDeveloper
        setIsOn={setIsOn}
        isOn={isOn}
      ></HeaderDeveloper>
      {isOn ? <Test /> : <Production />}
    </div>
  );
}
