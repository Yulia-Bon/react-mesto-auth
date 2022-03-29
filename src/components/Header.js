
import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import headerLogo from "../images/logo_w.svg";



function Header({ handleLogOut = null, email}) {

    return (
        <header className='header'>
            <div
                className="header__container-main"
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
                {email && <p className={'header__address'}>{email}</p>}
                <Link
                    to="/sign-in"
                    className="header__button"
                    onClick={handleLogOut}
                >
                    Выйти
                </Link>

            </Route>
            </div>

        </header>
    );
}

export default Header;
