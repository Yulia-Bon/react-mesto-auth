import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useFormWithValidation} from '../hooks/useFormWithValidation';

function EditProfilePopup(props) {

    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm
    } = useFormWithValidation({});

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        }
    }, [currentUser, resetForm, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(values);
    };

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            onClose={props.onClose}
            isOpen={props.isOpen}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            handleOverlayClose={props.handleOverlayClose}
            isDisabled={!isValid}
        >
            <input
                className={errors.name ? "popup__input popup-user__input-name popup__input-error-line" : 'popup__input'}
                id="user-name-input"
                name="name"
                type="text"
                value={props.isLoadingInitialData ? 'Загрузка...' : values.name || ''}
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChange}/>
            <span
                className={errors.name ? "popup__input-error popup__input-error_active userName-input-error" : 'popup__input-error'}
                id="user-name-input-error">
                {errors.name}
            </span>
            <input
                className={errors.about ? "popup__input popup__input-error-line  popup-user__input popup-user__input_type_job" : 'popup__input'}
                id="user-description-input"
                type="text"
                value={props.isLoadingInitialData ? 'Загрузка...' : values.about || ''}
                placeholder="Описание"
                name="about"
                minLength="2"
                maxLength="200"
                required
                onChange={handleChange}/>
            <span
                className={errors.about ? "popup__input-error popup__input-error_active userAbout-input-error" : 'popup__input-error'}
                id="user-description-input-error">
                {errors.about}
            </span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;