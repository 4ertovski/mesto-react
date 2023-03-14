import React from "react";

function Card(card) {
    function handleCardClick() {
        card.onCardClick(card);
    }

  return (
      <div id="card-template">
        <article className="element">
          <button className="element__trash-button" aria-label="Удалить" type="button"/>
          <img className="element__item" onClick={handleCardClick} src={card.link} alt={card.name} />
            <div className="element__wrapper">
              <h2 className="element__subject">{card.name}</h2>
              <div className="element__like-container">
                <button className="element__like-button" aria-label="Нравится" type="button"/>
                <span className="element__like-button_counter">{card.likes.length}</span>
              </div>
            </div>
        </article>
      </div>
  );
}

export default Card