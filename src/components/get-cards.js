import React, { useState, useEffect } from "react";

function GetCards({
  cards,
  getCards,
  myCards,
  handleAddCard,
  handleSearch,
  search,
}) {
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

  let filteredCard = cards.filter(
    (card) => card.attack && card.health !== undefined
  );


  if (search.searchName) {
    filteredCard = filteredCard.filter((item) =>
      item.name.toLowerCase().includes(search.searchName)
    );
  }
  if (search.searchId) {
    filteredCard = filteredCard.filter((item) =>
      item.cardId.toLowerCase().includes(search.searchId)
    );
  }
  if (search.searchType) {
    filteredCard = filteredCard.filter((item) =>
      item.type.toLowerCase().includes(search.searchType)
    );
  }
  if (search.searchClass) {
    filteredCard = filteredCard.filter((item) =>
      item.playerClass.toLowerCase().includes(search.searchClass)
    );
  }

  return (
    <div className="App">
      <input
        type="text"
        name='searchName'
        value={search.searchName}
        onChange={handleSearch}
      />
      <input
        type="text"
        name='searchId'
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

      <h1>Biblioteca de cards</h1>
      {filteredCard.map((card) => (
        <div key={card.cardId}>
          <img src={card.img} alt={card.cardId} />
          <h3>{card.cardId}</h3>
          <h3>{card.playerClass}</h3>
          <h3>{card.type}</h3>
          <button type="submit" onClick={() => click_ref.current(card.cardId)}>
            Adicionar Carta
          </button>
        </div>
      ))}
    </div>
  );
}

export default GetCards;
