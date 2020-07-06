import React, { useState, useEffect } from "react";

function GetCards({cards, getCards, myCards, handleAddCard}) {
  const [carregarCards, setCarregarCards] = useState(true);
  const click_ref = React.useRef(null);


  useEffect(() => {

    if (carregarCards) {
      getCards();
      setCarregarCards(false);
      handleAddCard();
    }

  click_ref.current = handleAddCard;
  }, [carregarCards, cards, myCards, getCards, handleAddCard]);




  const filteredCard = cards.filter(
    (card) => card.attack && card.health !== undefined
  );
  console.log(myCards, "copias");

  return (
    <div className="App">
      <h1>cards</h1>

      {
        filteredCard.map(card => 
            <div key={card.cardId}>
           <img src={card.img} alt={card.cardId} />
           <button type="submit" onClick={() => click_ref.current(card.cardId)}>Adicionar Carta</button>
            </div>
    )
      }
    </div>
  );
}

export default GetCards;
