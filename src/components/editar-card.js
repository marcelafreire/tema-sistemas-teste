import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css'


function EditCard({myCards, handleAddCard, id}) {

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

      const cardsDb = localStorage['myCards'];
      const allCards = cardsDb  ? JSON.parse(cardsDb ) : [];
      const cards = allCards.filter(card => card.cardId === id);

      setCard(cards);
      setCarregarCards(false);
    }
  }, [carregarCards, myCards, handleAddCard, id]);


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

    if (event.currentTarget.checkValidity() === true) {

      const cardsDb = localStorage['myCards'];
      let allCards = cardsDb ? JSON.parse(cardsDb ) : [];

      allCards = allCards.map(obj => {
        if (obj.cardId === id) {
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

  function handleTxtCard(evt) {
    const value = evt.target.value;
    setCard({
      ...card,
      [evt.target.name]: value,
    });  }

  return (
    <div className="form">
      <h3 className="text-center">Editar card</h3>
      <Jumbotron className="form">
        <Form onSubmit={edit} noValidate validated={formValidado}>
          
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="nome"
              required
              value={card.name}
              onChange={handleTxtCard} />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres.
            </Form.Control.Feedback>

            <Form.Control
              name="health"
              type="number"
              placeholder="Defesa (escolha uma defesa de 0 a 10)"
              required
              min="0"
              max="10"
              value={card.health}
              onChange={handleTxtCard}
            />
            <Form.Control.Feedback type="invalid">
              Escolha um numero entre 0 e 10.
            </Form.Control.Feedback>

            <Form.Control
              name="attack"
              type="text"
              placeholder="Ataque"
              min="0"
              max="10"
              required
              value={card.attack}
              onChange={handleTxtCard}
            />
            <Form.Control.Feedback type="invalid">
              Escolha um numero entre 0 e 10.
            </Form.Control.Feedback>

            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              required
              value={card.type}
              onChange={handleTxtCard}
              name="type"
            >
              <option value="magia">Magia</option>
              <option value="criatura">Criatura</option>
            </Form.Control>

            <Form.Control.Feedback type="invalid">
              Ecolha um tipo.
            </Form.Control.Feedback> 

            <Form.Label>Classe</Form.Label>
            <Form.Control
              as="select"
              name="playerClass"
              required
              value={card.playerClass}
              onChange={handleTxtCard}
            >
              <option value="Mago">Mago</option>
              <option value="Paladino">Paladino</option>
              <option value="Caçador">Caçador</option>
              <option value="Druida">Druida</option>
              <option value="Qualquer">Qualquer</option>
            </Form.Control>

            <Form.Control.Feedback type="invalid">
              Ecolha uma Classe.
            </Form.Control.Feedback> 

            <Form.Control
              name="description"
              type="text"
              placeholder="Descrição da carta"
              required
              minLength="10"
              maxLength="200"
              value={card.description}
              onChange={handleTxtCard}
            />
            <Form.Control.Feedback type="invalid">
              O card precisa ter uma descrição.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="text-center">
            <Button variant="success" type="submit">
              Editrar
            </Button>
            &nbsp;
            <A href="/" className="btn btn-light" onClick={goBack}>
              Voltar
            </A>
          </Form.Group>
        </Form>

        <Modal show={exibirModal} onHide={closeModal} >
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
