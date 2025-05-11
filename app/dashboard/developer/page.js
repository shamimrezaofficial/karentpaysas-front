'use client';
import React, { useState } from 'react';
import HeaderDeveloper from './Header';
import Test from './Test';
import Production from './Production';

export default function DeveloperPage() {
  const [isOn, setIsOn] = useState(true);
  

  return (

    <div className=" bg-white rounded-md border border-gray-200">
      <HeaderDeveloper
        setIsOn={setIsOn}
        isOn={isOn}
      ></HeaderDeveloper>
      {/* {isOn ? <Test /> : <Production />} */}
      <Production />
    </div>
  );
}
