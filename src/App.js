import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom'
import MyCards from './components/my-cards';
import GetCards from './components/get-cards';






function App() {
  const [cards, setCards] = useState([]);
  const [myCards, setMyCards] = useState([]);
 
  //Pegar cartões da api
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


    
     //copiar carta para 'minhas cartas'
  function handleAddCard(cardId) {
    console.log('clicou')
    const cardsDb = localStorage['myCards'];
    const newCards = cardsDb ? JSON.parse(cardsDb) : [];

    cards.forEach((obj) => {
      if (obj.cardId === cardId) {
        return newCards.push(obj)
      }
    });
    setMyCards(newCards);
    // localStorage.setItem('myCards', JSON.stringify(myCards))
    localStorage['myCards'] = JSON.stringify(newCards);

  }


  return (
    <div className="App">
    <h1>Hey</h1>
        <div>
        <Switch>
       
          <Route exact path='/' render={(props) => <GetCards getCards={getCards} myCards={myCards} handleAddCard={handleAddCard} cards={cards} {...props}/>}/> 
          <Route exact path="/minhas-cartas" render={(props) => <MyCards cards={cards} myCards={myCards} handleAddCard={handleAddCard} {...props}/>} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
