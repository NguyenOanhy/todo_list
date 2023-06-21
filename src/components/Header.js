import React from 'react';
import './Header.css'

function Header({ title }) {
  return (
    <div className='Header'>
      {title}
    </div>
  );
}

export default Header;