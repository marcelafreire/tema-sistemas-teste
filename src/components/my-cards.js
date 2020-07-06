import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

function MyCards({ cards, handleAddCard, myCards }) {
  const [carregarCards, setCarregarCards] = useState(true);


  useEffect(() => {

    if (carregarCards) {
      setCarregarCards(false);
      handleAddCard();
    }
  }, [carregarCards, cards, handleAddCard, myCards]);

  function handleDelete(idx) {
      const cardsDb = localStorage['myCards'];
      let newCards = cardsDb ? JSON.parse(cardsDb) : [];
      newCards.splice(idx, 1);

    localStorage['myCards'] = JSON.stringify(newCards);
      setCarregarCards(true);
  }

  return (
    <div>
      <h2>COPY CARDS</h2>
      <h1>hey</h1>
      {
          myCards.map((card, idx) => (
        <div key={idx}>
          <img src={card.img} alt={card.cardId} />
          <button onClick={() => handleDelete(idx)}>remover carta</button>
          <button>alterar carta</button>

        </div>
      ))
      }
    </div>
  );
}

// MyCards.propTypes = {
//     : PropTypes.number.isRequired
//   }

export default MyCards;
