import React from 'react';
import headerLogo from "../images/logo_w.svg";

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип сайта"/>
            <nav className="header__nav">
                {props.children}
            </nav>
        </header>
    );
}

export default Header;