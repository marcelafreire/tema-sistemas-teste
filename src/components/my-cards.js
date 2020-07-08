import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import EditCard from "./editar-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

function MyCards({ cards, handleAddCard, myCards, handleSearch, search, getId, id }) {
  const [carregarCards, setCarregarCards] = useState(true);
  const cardId = React.useRef(null);

  useEffect(() => {
    if (carregarCards) {
      setCarregarCards(false);
      handleAddCard();
      getId();
    }

    // function getId(cardId) {
    //   const cardsDb = localStorage["myCards"];
    //   let newCards = cardsDb ? JSON.parse(cardsDb) : [];

    //   newCards.forEach((card) => {
    //     if (card.cardId === cardId) {
    //       return setId(card.cardId);
    //     }
    //   });
    // }
    cardId.current = getId;
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

  return (
    <div>
    <div>
    </div>
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

      {/* <EditCard /> */}

      <h1>Minhas Cartas</h1>
      <div className="cards-container">
        {myCards.map((card, idx) => (
          <div key={idx} className="cards mycards">
            <img src={card.img} alt={card.cardId} />
            <h3>{card.name}</h3>
            <h4>Tipo: {card.type}</h4>
            <h4>Classe: {card.playerClass}</h4>
            <h4>
              Ataque: &nbsp;<p>{card.attack}</p> &nbsp; Defesa: &nbsp;
              <p>{card.health}</p>
            </h4>
            <span className="cardText">
              <h4>{card.description}</h4>
              <h4>{card.text}</h4>
            </span>
            <span className="btn-group">
              <button onClick={() => handleDelete(idx)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button onClick={() => cardId.current(card.cardId)}>
                <Link to={`/editar-card/${card.cardId}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default MyCards;
