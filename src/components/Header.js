import React from 'react';
import {Link, Route} from "react-router-dom";
import headerLogo from "../images/logo_w.svg";

function Header({handleLogOut = null, email}) {

    return (
        <header className='header'>
            <div
                className="header__nav"
            >
                <Link
                    to="/"
                    className="header__address"
                >
                    <img
                        src={headerLogo}
                        alt="Логотип приложения Место"
                        className="header__logo"
                    />
                </Link>

                <Route path="/sign-in">
                    <Link
                        to="/sign-up"
                        className="header__button"
                        onClick={handleLogOut}
                    >
                        Регистрация
                    </Link>
                </Route>

                <Route path="/sign-up">
                    <Link
                        to="/sign-in"
                        className="header__button"
                        onClick={handleLogOut}
                    >
                        Войти
                    </Link>
                </Route>

                <Route exact path="/">
                    <div className='header__nav_desktop'>
                        {email && <p className={'header__email'}>{email}</p>}
                        <Link
                            to="/sign-in"
                            className="header__button"
                            onClick={handleLogOut}
                        >
                            Выйти
                        </Link>
                    </div>
                </Route>
            </div>
        </header>
    );
}

export default Header;
