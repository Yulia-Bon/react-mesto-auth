import React from 'react';

function PopupWithForm(props) {
    const classId = `popup_type_${props.name}`;
    return (
        <div className={props.isOpen ? "popup popup_opened" : "popup"}
             id={classId}
             onClick={props.handleOverlayClose}
        >
            <div className="popup__container">
                <button className="popup__close"
                        type="button"
                        aria-label="закрыть форму"
                        id={`button_close_${props.name}`}
                        onClick={props.onClose}>

                </button>
                <form className="popup__form"
                      name={props.name}
                      id={`form_${props.name}`}
                      onSubmit={props.onSubmit}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button className={props.isDisabled ? ` popup__submit popup__button popup__submit_inactive` :
                        "popup__submit" }
                            type="submit"
                            id={`button_${props.name}`}
                            value={props.buttonText}>{props.isLoading ? 'Сохранение...' : props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;