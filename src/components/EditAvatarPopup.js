import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useFormWithValidation} from '../hooks/useFormWithValidation';

function EditAvatarPopup(props) {

    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm
    } = useFormWithValidation({});

    React.useEffect(() => {
        resetForm();
    }, [props.isOpen, resetForm])

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar(values);
    }

    return (

        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
            isDisabled={!isValid}
            isLoading={props.isLoading}
            handleOverlayClose={props.handleOverlayClose}>
            <input
                className={errors.avatar ? "popup__input popup__input-error-line popup-avatar__input" : 'popup__input'}
                id="avatar"
                type="url"
                placeholder="Ссылка на фото"
                name="avatar"
                value={values.avatar || ''}
                required
                onChange={handleChange}/>
            <span
                className={errors.avatar ? "popup__submit popup__input-error_active popup-avatar__submit" : 'popup__input-error'}
                id="avatar-error">
                 {errors.avatar}
            </span>
        </PopupWithForm>)
}

export default EditAvatarPopup;