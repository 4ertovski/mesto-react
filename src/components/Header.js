import React from 'react';
import Mesto_header_logo from '../images/Mesto_header_logo.svg';
function Header() {
    return (
        <header className='header'>
                <img src={Mesto_header_logo} alt="логотип Место" className="header__logo" />
        </header>
    );
}

export default Header