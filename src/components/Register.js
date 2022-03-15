import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from '../utils/auth.js';




function Register(props) {
    const history = useHistory();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        auth.register(password, email)
            .then((res) => {
                if(res.data){
                    props.handleInfoTooltipOpen(true);
                    history.push('/sign-in')
                } else {
                    props.handleInfoTooltipOpen(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return(
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title">Регистрация</h2>
                <input className="auth__input" name="email" type="email" placeholder="Email" onChange={handleChangeEmail} value={email||''}/>
                <input className="auth__input" name="password" type="password" placeholder="Пароль" onChange={handleChangePassword} value={password||''}/>
                <button  className="auth__button" onSubmit={handleSubmit}>Зарегистрироваться</button>
                <p className="auth__text">Уже зарегистрированы?
                    <Link className="auth__link" to="/sign-in"> Войти</Link>
                </p>
            </form>
        </div>
        )
}

export default Register;