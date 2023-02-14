import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api";
import CardComponent from "../Card/CardComponent";

//route:"/decks/:deckId/cards/new"
function NewCard() {
  const initialFormState = {
    front: "",
    back: "",
    deckId: 0,
  };

  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  //on load, get deck by id
  useEffect(() => {
    async function getDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    }
    getDeck();
  }, []); 

  //set formData from user input 
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  //api call to create a new card
  const handleSave = (event) => {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData({...initialFormState});
  };

  //navigate to Deck screen by id 
  const handleDone = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      {/* Nav */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      {/* Form */}
      <h2>{deck.name}: Add Card</h2>

      <CardComponent formData={formData} handleSubmit={handleSave}
      handleChange={handleChange} handleCancel={handleDone}/>
    </>
  );
}

export default NewCard;
