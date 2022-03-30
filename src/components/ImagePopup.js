function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card.link && "popup_opened"}`}
             id='popup_type_image'>
            <div className="popup__container-fullscreen">
                <button className="popup__close popup-fullscreen__close-button" type="button" aria-label="закрыть форму"
                        id="button_close_image" onClick={props.onClose}/>
                <figure className="popup__figure">
                    <img src={props.card.link} alt={props.card.name} className="popup__image popup-fullscreen__image"/>
                    <figcaption
                        className="popup__figcaption popup-fullscreen__figcaption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;