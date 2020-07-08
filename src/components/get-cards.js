import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Alert from 'react-bootstrap/Alert';



function GetCards({
  cards,
  getCards,
  myCards,
  handleAddCard,
  handleSearch,
  search,
  exibirMsg,
  erroMsg
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
    <div className="container">
      <div className="searchBar">
        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} />
          <input
            placeholder="name"
            type="text"
            name="searchName"
            value={search.searchName}
            onChange={handleSearch}
          />
        </div>

        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            name="searchId"
            placeholder="filtrar carta por Id"
            value={search.searchId}
            onChange={handleSearch}
          ></input>
        </div>

        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} />
          <input
            name="searchType"
            type="text"
            placeholder="filtrar carta por Tipo"
            value={search.searchType}
            onChange={handleSearch}
          ></input>
        </div>

        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} />
          <input
            name="searchClass"
            type="text"
            placeholder="filtrar carta por Classe"
            value={search.searchClass}
            onChange={handleSearch}
          ></input>
        </div>
      </div>

      <h1>Biblioteca de cards</h1>
      <Alert
        variant="success"
        style={{ margin: '10px' }}
        show={exibirMsg}>
        Card adicionado aos Meus Cards
      </Alert>

      {/* <Alert
        variant="warning"
        style={{ margin: '10px' }}
        show={exibirMsg}>
        Você chegou ao seu limite de cartas
      </Alert> */}

      <div className="cards-container">
      
      {filteredCard.map((card) => (
        <div key={card.cardId} className="cards home">
          <img src={card.img && card.img} alt={card.cardId} />
          <h3>{card.name}</h3>
          <button className="btn-add-card" type="submit" onClick={() => click_ref.current(card.cardId)}>
          <FontAwesomeIcon icon={faPlusSquare} /> &nbsp; Add
          </button>
        </div>
      ))}
      </div>

      
    </div>
  );
}

export default GetCards;
