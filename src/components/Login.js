import React from "react";
import * as auth from '../utils/auth.js';
import {useHistory} from "react-router-dom";

function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");



    const history = useHistory();



    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        auth.authorize(password, email)
            .then((res) => {
                if(res.token){
                    props.handleLogin();
                    history.push('/')
                }
            })
            .catch(err => {
                props.handleInfoTooltipOpen(false);
                console.log(err);
            });
    }
    return(
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title">Вход</h2>
                <input className="auth__input"  name="email" type="email" placeholder="Email" onChange={handleChangeEmail} value={email|| ''}/>
                <input className="auth__input" name="password" type="password" placeholder="Пароль" onChange={handleChangePassword} value={password || ''}/>
                <button  className="auth__button" onSubmit={handleSubmit}>Войти</button>
            </form>
        </div>
    )
}
export default Login;

