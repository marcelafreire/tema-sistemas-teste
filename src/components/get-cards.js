import React, { useState, useEffect } from "react";

function GetCards({cards, getCards, myCards, handleAddCard, handleSearch, searchName, searchId, searchType, searchClass}) {
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



  // let filterCards = filteredCard.slice();

  if(searchName) {
    filteredCard = filteredCard.filter(item => item.name.toLowerCase().includes(searchName));
  }
  if(searchId) {
    filteredCard = filteredCard.filter(item => item.cardId.toLowerCase().includes(searchId));
  }
  if(searchType) {
    filteredCard = filteredCard.filter(item => item.type.toLowerCase().includes(searchType));
  }
  if(searchClass) {
    filteredCard = filteredCard.filter(item => item.playerClass.toLowerCase().includes(searchClass));
  }


  return (
    <div className="App">

     <input id="name" type="text" placeholder="filtrar carta por Nome" value={searchName} onChange={handleSearch}></input>
     <input type="text" placeholder="filtrar carta por Id" value={searchId} onChange={handleSearch}></input>
     <input type="text" placeholder="filtrar carta por Tipo" value={searchType} onChange={handleSearch}></input>
     <input type="text" placeholder="filtrar carta por Classe" value={searchClass} onChange={handleSearch}></input>

     


      <h1>cards</h1>
      {/* filter(item => item.name.toLowerCase().includes(search)) */}
      {
        filteredCard.map(card => 
            <div key={card.cardId}>
           <img src={card.img} alt={card.cardId} />
           <h3>{card.cardId}</h3>
           <button type="submit" onClick={() => click_ref.current(card.cardId)}>Adicionar Carta</button>
            </div>
    )
      }
      
    </div>
  );
}

export default GetCards;
