import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import MyCards from "./components/my-cards";
import GetCards from "./components/get-cards";

function App() {
  const [cards, setCards] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchClass, setSearchClass] = useState("");




  //Pegar cards da api
  function getCards() {
    axios({
      method: "GET",
      url: "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
        "x-rapidapi-key": "174f54c7e9msh385aea11f59db8ep1eecbfjsna5431ab42c87",
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
    const cardsDb = localStorage["myCards"];
    const newCards = cardsDb ? JSON.parse(cardsDb) : [];

    cards.forEach((obj) => {
      if (obj.cardId === cardId && newCards.length < 30) {
        return newCards.push(obj);
      }
    });
    setMyCards(newCards);
    localStorage["myCards"] = JSON.stringify(newCards);
  }


  //pesquisas
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchName({
      [e.target.name]: value
    });

    setSearchId({
      [e.target.name]: value
    });

    setSearchType({
      [e.target.name]: value
    });

    setSearchClass({
      [e.target.name]: value
    });
  };

  // const handleSearchId = (e) => {
  //   setSearchId(e.target.value);
  // };



  




  console.log(cards, "data");

  return (
    <div className="App">
      <h1>Hey</h1>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <GetCards
                cards={cards}
                handleSearch={handleSearch}
                searchName={searchName}
                searchId={searchId}
                searchType={searchType}
                searchClass={searchClass}
                getCards={getCards}
                myCards={myCards}
                handleAddCard={handleAddCard}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/minhas-cartas"
            render={(props) => (
              <MyCards
                cards={cards}
                myCards={myCards}
                handleAddCard={handleAddCard}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
