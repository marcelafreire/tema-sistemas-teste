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

  return (
    <div>
      <h2>COPY CARDS</h2>
      <h1>hey</h1>
      {
          myCards.map((card) => (
        <div key={card.cardId}>
          <img src={card.img} alt={card.cardId} />
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
