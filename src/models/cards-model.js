function Card(cardId, name, health, attack, type, playerClass, description, img) {
    this.cardId = cardId;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.type = type;
    this.playerClass = playerClass;
    this.description = description;
    this.img = 'https://res.cloudinary.com/deyy3glzl/image/upload/v1594143132/card.png';
  
    return {
        cardId: cardId,
        health: health,
        name: name,
        attack: attack,
        type: type,
        playerClass: playerClass,
        description: description,
        img: 'https://res.cloudinary.com/deyy3glzl/image/upload/v1594143132/card.png'
    };
  }
  
  export default Card;
