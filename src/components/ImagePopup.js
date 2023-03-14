import React from "react";

function ImagePopup(props) {
    const {card, name, onClose} = props;

    return (
        <div className={`popup popup_${name} ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__item-container">
                <button className="popup__button popup__button_item_exit popup__close"
                        type="button"
                        onClick={onClose}
                />
                <img className="popup__item" alt={card.name} src={card.link} />
                    <h2 className="popup__item-subject">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup