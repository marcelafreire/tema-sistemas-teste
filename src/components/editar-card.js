import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import 'bootstrap/dist/css/bootstrap.min.css';


function EditCard({myCards, handleAddCard}) {

  const [exibirModal, showModal] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [card, setCard] = useState({
    name: "",
    health: "",
    attack: "",
    type: "",
    playerClass: "",
    description: "",
  });
  const [carregarCards, setCarregarCards] = useState(true);


  useEffect(() => {
   
    if (carregarCards) {
        handleAddCard()

      const cardsDb = localStorage['myCards'];
      const allCards = cardsDb  ? JSON.parse(cardsDb ) : [];
      const idCard = allCards.map(card => card.cardId)
      const cards = allCards.filter(card => card.cardId === idCard);
      console.log(cards, 'cards')

      setCard(cards);
      setCarregarCards(false);
    }
  }, [carregarCards, myCards, handleAddCard]);




  function goBack(event) {
    event.preventDefault();
    navigate('/');
  }

  function closeModal() {
    showModal(false)
    navigate('/');
  }

  function edit(event) {
    event.preventDefault();
    setFormValidado(true);
    const myCard = myCards.map(card => card.cardId)

    if (event.currentTarget.checkValidity() === true) {

      const cardsDb = localStorage['myCards'];
      let allCards = cardsDb  ? JSON.parse(cardsDb ) : [];

      allCards = allCards.map(obj => {
        if (obj.cardId === myCard) {
          obj.name = card.name;
          obj.health = card.health;
          obj.attack = card.attack;
          obj.type = card.type;
          obj.playerClass = card.playerClass;
          obj.description = card.description;

        }
        return obj;
      });
      localStorage['MyCards'] = JSON.stringify(card);
      showModal(true);
    }
  }

  function handleTxtCard(event) {
    setCard(event.target.value);
  }

//   console.log(card, 'card')

  return (
    <div>
      <h3 className="text-center">Editar card</h3>
      <Jumbotron>
        <Form onSubmit={edit} noValidate validated={formValidado}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nome"
              required
              value={card.name}
              onChange={handleTxtCard} />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="success" type="submit" data-testid="btn-edit">
              edit
            </Button>
            &nbsp;
            <A href="/" className="btn btn-light" onClick={goBack}>
              goBack
            </A>
          </Form.Group>
        </Form>
        <Modal show={exibirModal} onHide={closeModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tarefa atualizada com sucesso!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={closeModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  );
}

// editTarefa.propTypes = {
//   id: PropTypes.number.isRequired
// }

export default EditCard;
