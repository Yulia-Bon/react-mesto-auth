import React from 'react';

import PopupWithForm from './PopupWithForm';
import {useFormWithValidation} from '../hooks/useFormWithValidation';

const Login = ({ onAuthorization, onCheckToken }) => {


    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm
    } = useFormWithValidation({});



    function handleSubmit(e) {
        e.preventDefault();
        onAuthorization(values);
        resetForm();
    };

    return (
        <PopupWithForm
            title="Вход"
            name="authorization"

            buttonText="Войти"
            onSubmit={handleSubmit}

            isDisabled={!isValid}
        >
            <input
                className={errors.name ? "popup__input popup-user__input-email popup__input-error-line" : 'popup__input'}
                id="login-email"
                name="email"
                type="email"
                value={values.email || ''}
                placeholder="Email"
                aria-label="электронная почта"
                onChange={handleChange}/>
            <span
                className={errors.email ? "popup__input-error popup__input-error_active userName-input-error" : 'popup__input-error'}
                id="user-name-input-error">
                {errors.email}
            </span>
            <input
                className={errors.password ? "popup__input popup__input-error-line popup__input_type_password" : 'popup__input'}
                id="login-password"
                type="password"
                value={values.password || ''}
                aria-label="пароль"
                placeholder="Пароль"
                name="password"
                required
                onChange={handleChange}/>
            <span
                className={errors.password ? "popup__input-error popup__input-error_active userAbout-input-error" : 'popup__input-error'}
                id="user-description-input-error">
                {errors.password}
            </span>
        </PopupWithForm>
    )
}

export default Login;
