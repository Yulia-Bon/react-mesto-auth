import React from 'react';
import PopupWithForm from '../../../react-mesto-auth/src/components/PopupWithForm';
import {useFormWithValidation} from '../../../react-mesto-auth/src/hooks/useFormWithValidation.js';

function AddPlacePopup(props) {

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

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(values);
    }


    return (
        <PopupWithForm
            title="Новое место"
            name="place"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Создать"
            isDisabled={!isValid}
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            handleOverlayClose={props.handleOverlayClose}
            buttonText="Создать"
        >
            <input
                className={errors.name ? "popup__input popup__input-error-line" : "popup__input"}
                id="card-name-input"
                type="text"
                placeholder="Название"
                name="name"
                minLength="2"
                maxLength="30"
                required
                value={values.name || ""}
                onChange={handleChange}
            />
            <span
                className={errors.name ? "popup__input-error popup__input-error_active placeName-input-error" : 'popup__input-error'}
                id="card-name-input-error">
               {errors.name}
            </span>
            <input
                className={errors.link ? "popup__input-error-line popup__input popup-photos__input  popup-photos__input_type_card-src" : 'popup__input'}
                id="card-src-input"
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                required
                value={values.link || ""}
                onChange={handleChange}
            />
            <span
                className={errors.link ? "popup__input-error popup__input-error_active placeUrl-input-error" : 'popup__input-error'}
                id="card-src-input-error">
               {errors.link}
            </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;