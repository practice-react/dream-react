import React, { useEffect, useState } from 'react';
import './AppXY.css';

export default function AppXY() {
  const [position, setposition] = useState({ x: 0, y: 0 });

  return (
    <div
      className='container'
      onPointerMove={(e) => {
        setposition({ x: e.clientX, y: e.clientY });
      }}
    >
      <div
        className='pointer'
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      ></div>
    </div>
  );
}
