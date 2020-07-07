import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MyCards({ cards, handleAddCard, myCards, handleSearch, search }) {
  const [carregarCards, setCarregarCards] = useState(true);

  useEffect(() => {
    if (carregarCards) {
      setCarregarCards(false);
      handleAddCard();
    }
  }, [carregarCards, cards, handleAddCard, myCards]);

  function handleDelete(idx) {
    const cardsDb = localStorage["myCards"];
    let newCards = cardsDb ? JSON.parse(cardsDb) : [];
    newCards.splice(idx, 1);

    localStorage["myCards"] = JSON.stringify(newCards);
    setCarregarCards(true);
  }

  if (search.searchName) {
    myCards = myCards.filter((item) =>
      item.name.toLowerCase().includes(search.searchName)
    );
  }
  if (search.searchId) {
    myCards = myCards.filter((item) =>
      item.cardId.toLowerCase().includes(search.searchId)
    );
  }
  if (search.searchType) {
    myCards = myCards.filter((item) =>
      item.type.toLowerCase().includes(search.searchType)
    );
  }
  if (search.searchClass) {
    myCards = myCards.filter((item) =>
      item.playerClass.toLowerCase().includes(search.searchClass)
    );
  }

  console.log(myCards, "myCards");
  return (
    <div>
      <div>
        <input
        placeholder="name"
          type="text"
          name="searchName"
          value={search.searchName}
          onChange={handleSearch}
        />
        <input
          type="text"
          name="searchId"
          placeholder="filtrar carta por Id"
          value={search.searchId}
          onChange={handleSearch}
        ></input>
        <input
          name="searchType"
          type="text"
          placeholder="filtrar carta por Classe"
          value={search.searchType}
          onChange={handleSearch}
        ></input>
        <input
          name="searchClass"
          type="text"
          placeholder="filtrar carta por Tipo"
          value={search.searchClass}
          onChange={handleSearch}
        ></input>
      </div>

      <h2>Minhas Cartas</h2>

      {myCards.map((card, idx) => (
        <div key={idx}>
          <img src={card.img} alt={card.cardId} />
          <h3>{card.name}</h3>
          <h3>{card.type}</h3>
          <h3>{card.playerClass}</h3>
          <button onClick={() => handleDelete(idx)}>remover carta</button>
          <Link to={`/editar-card/${card.cardId}`}>Alterar Carta</Link>
        </div>
      ))}
    </div>
  );
}

// MyCards.propTypes = {
//     : PropTypes.number.isRequired
//   }

export default MyCards;
