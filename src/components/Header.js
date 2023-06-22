import React from 'react';
import './styles/Header.css';


const Header = ({ title }) => {
  return (
    <div className='Header'>
      {title}
    </div>
  );
};


export default Header;