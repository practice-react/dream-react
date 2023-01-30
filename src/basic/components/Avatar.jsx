import React from 'react';

export default function Avatar({ image, isNew }) {
  return (
    <div className='avatar'>
      <img src={image} alt='avatar' className='photo'></img>
      {isNew && <div className='new'>NEW</div>}
    </div>
  );
}
