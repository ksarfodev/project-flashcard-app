import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readCard, updateCard, readDeck } from "../utils/api";
import CardComponent from "../Card/CardComponent";

//route:"/decks/:deckId/cards/:cardId/edit"
function CardEdit() {
  const initialFormState = {
    front: "",
    back: "",
  };

  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialFormState });
  const [card, setCard] = useState({});
  const { cardId } = useParams();
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  //on load, get deck by id via api
  useEffect(() => {
    async function getDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    }
    getDeck();
  }, []);

//whenever deck changes, update the card
  useEffect(() => {
    async function getCard() {
      const cardFromAPI = await readCard(cardId);
      setCard(cardFromAPI);
    }
    getCard();
  }, [deck]); 

  //whenever card changes, populate the form
  useEffect(() => {
    setFormData({...formData,...card});
  }, [card]); 

   //update card
  const handleSubmit = (event) => {
    event.preventDefault();
     updateCard(formData);
     history.goBack();
  };

  //cancel card edit
  const handleCancel = (event) => {
    event.preventDefault();
     history.goBack();
  };

  //update formData as user enters data
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  return (
    <>
      Nav
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deck.id}`}>Deck {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      {/* Form */}
      <h2>Edit Card</h2>
      <CardComponent formData={formData} handleSubmit={handleSubmit}
      handleChange={handleChange} handleCancel={handleCancel}/>
    </>
  );
}

export default CardEdit;
