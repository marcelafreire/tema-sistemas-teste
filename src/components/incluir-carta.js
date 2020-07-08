import React, { useState } from "react";
import { navigate, A } from "hookrouter";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import Card from "../models/cards-model";
import 'bootstrap/dist/css/bootstrap.min.css';


function IncluirCard() {
  const [card, setCard] = useState({
    name: "",
    health: "",
    attack: "",
    type: "",
    playerClass: "",
    description: "",
  });
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);


  function cadastrar(event) {
    event.preventDefault();
    setFormValidado(true);
    if (event.currentTarget.checkValidity() === true) {
      // obtem as tarefas
      const cardsDb = localStorage["myCards"];
      const allCards = cardsDb ? JSON.parse(cardsDb) : [];
      // persiste a tarefa
      if (allCards.length < 31) {
        allCards.push(
          new Card(
            new Date().getTime(),
            card.name,
            card.health,
            card.attack,
            card.type,
            card.playerClass,
            card.description
          )
        );
      }
      localStorage["myCards"] = JSON.stringify(allCards);
      setExibirModal(true);
    }
  }

  function handleTxtCard(evt) {
    evt.persist();
    const value = evt.target.value;
    setCard({
      ...card,
      [evt.target.name]: value,
    });
  }

  function handleFecharModal() {
    navigate("/meus-cards");
    setExibirModal(false)
  }

  return (
    <div className="form">
      <h3>Adicionar novo card</h3>
      <Jumbotron>
        <Form validated={formValidado} noValidate onSubmit={cadastrar}>
          <Form.Group>
            <Form.Control
              name="name"
              type="text"
              placeholder="Nome"
              required
              value={card.name}
              onChange={handleTxtCard}
            />
            <Form.Control.Feedback type="invalid">
              Adicione um nome.
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
            <Button  type="submit">
              Cadastrar
            </Button>
            &nbsp;
            <A href="/" className="btn btn-light">
              Voltar
            </A>
          </Form.Group>
        </Form>
        <Modal
          show={exibirModal}
          onHide={handleFecharModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Card adicionado com sucesso!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  );
}

export default IncluirCard;
