import React from 'react';
import './styles/Header.css'

function Header({ title }) {
  return (
    <div className='Header'>
      {title}
    </div>
  );
}

export default Header;