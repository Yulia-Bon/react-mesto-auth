import React from "react";
import imageOk from "../images/ok.svg"
import imageError from "../images/error.svg"

function InfoTooltip(props){
    return(
        <div className= {props.isOpen ? "popup popup_opened" : "popup"} onClick={props.handleOverlayClose}>
            <div className="popup__container">
                <button className="popup__close-icon" type="button" aria-label="закрыть форму" onClick={props.onClose}></button>
                <form className="popup__form" >
                    <div className="popup__auth_image" style={{backgroundImage: `url(${props.register ? imageOk : imageError})`}}></div>
                    <h2 className="popup__title popup__title_auth" >{props.register ? "Вы успешно зарегистрировались!" :
                        "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                </form>
            </div>
        </div>
    )
}
export default InfoTooltip;
