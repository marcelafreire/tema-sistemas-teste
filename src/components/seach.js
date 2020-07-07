import React, { useState } from "react";

function Search({myCards, cards}) {
    const [search, setSearch] = useState({
        searchName: "",
        searchId: "",
        searchType: "",
        searchClass: "",
      });


      //pesquisas
  const handleSearch = (evt) => {
    const value = evt.target.value;
    setSearch({
      ...search,
      [evt.target.name]: value,
    });
  };

    
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



    return(
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
        </div>
    );
}

export default Search;