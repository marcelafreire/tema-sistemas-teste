import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from '../models/cards-model'

function GetCards() {
  const [cards, setCards] = useState([]);
  const [carregarCards, setCarregarCards] = useState(true);
  const [myCards, setMyCards] = useState([]);


  //Pegar lista de cartas
  useEffect(() => {
    function getCards() {
      axios({
        method: "GET",
        url: "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "174f54c7e9msh385aea11f59db8ep1eecbfjsna5431ab42c87",
          useQueryString: true,
          params: {
            locale: "ptBR",
          },
        },
      })
        .then((response) => {
          const filteredCards = response.data.Basic.map((card) => card.attack);
          //   console.log(cards, 'cards')
          if (filteredCards !== undefined) {
            setCards(response.data.Basic);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (carregarCards) {
      getCards();
      setCarregarCards(false);
    }
  }, [carregarCards, cards]);



  //Adicionar carta
  function handleAddCard(e) {
      e.preventDefault();
      const cardsDb = localStorage['myCards'];
      const cards = cardsDb ? JSON.parse(cardsDb) : [];

      cards.push(new Card(new Date().getTime(), myCards, false));
      localStorage['cards'] = JSON.stringify(cards);
  }


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
           <button type="submit" onClick={handleAddCard}>Adicionar Carta</button>
            </div>
    )
      }

      <h2>COPY CARDS</h2>
      {
          
      }
    </div>
  );
}

export default GetCards;