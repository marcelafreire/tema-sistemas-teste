import React, { useState } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import MyCards from "./components/my-cards";
import GetCards from "./components/get-cards";
import IncluirCard from "./components/incluir-carta";
import EditCard from "./components/editar-card";
import './style/sass/style.css'
import NavBar from "./components/navbar";


function App() {
  const [cards, setCards] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [exibirMsg, setExibirMsg] = useState(false);
  const [id, setId] = useState("");
  const [erroMsg, setErroMsg] = useState(false);
  const [search, setSearch] = useState({
    searchName: "",
    searchId: "",
    searchType: "",
    searchClass: "",
  });

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
        if (filteredCards !== undefined) {
          setCards(response.data.Basic);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getId(cardId) {
    const cardsDb = localStorage["myCards"];
    let newCards = cardsDb ? JSON.parse(cardsDb) : [];
    let newArr = [];

    newCards.forEach((card) => {
      if (card.cardId === cardId) {
        return newArr.push(cardId);
      }
    });
    setId(newArr)
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
    exibirMensagem(cardId)
  }

  //exibir Mensagem de erro e sucesso
  function exibirMensagem(card) {
    setExibirMsg(true);
    setTimeout(() => {
      setExibirMsg(false)
    }, 2000);
  }


  //pesquisas
  const handleSearch = (evt) => {
    const value = evt.target.value;
    setSearch({
      ...search,
      [evt.target.name]: value,
    });
  };


  return (
    <div className="App">
      <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <GetCards
                cards={cards}
                handleSearch={handleSearch}
                search={search}
                getCards={getCards}
                myCards={myCards}
                handleAddCard={handleAddCard}
                exibirMsg={exibirMsg}
                erroMsg={erroMsg}
                {...props}
              />
            )}
          />
          <Route
      
            path="/meus-cards"
            render={(props) => (
              <MyCards
                cards={cards}
                myCards={myCards}
                handleAddCard={handleAddCard}
                handleSearch={handleSearch}
                search={search}
                getId={getId}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/incluir-card"
            render={(props) => <IncluirCard />}
          />

          <Route
            exact
            path="/editar-card/:id"
            render={(props) => (<EditCard id={id}/>)}
          />
        </Switch>
    </div>
  );
}

export default App;
