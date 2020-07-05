function Card(cardId, name, type, health, attack, img, playerClass, text) {
    this.cardId = cardId;
    this.name = name;
    this.type = type;
    this.health = health;
    this.attack = attack;
    this.img = img;
    this.playerClass = playerClass;
    this.text = text;
  
    return {
        cardId: cardId,
        name: name,
        type: type,
        health: health,
        attack: attack,
        img: img,
        playerClass: playerClass,
        text: text
    };
  }
  
  export default Card;
