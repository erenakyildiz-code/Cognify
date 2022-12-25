import React from 'react';
const Brand = (props) => (
  <div className="flexBoxLittleboxes">
  <img className="littlebox" src={"/Cognify-Logo-White.png"}/>
    <p className='Eren'>{props.type}</p>
  </div>
);

export default Brand;
