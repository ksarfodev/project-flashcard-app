import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { updateDeck, readDeck } from "../utils/api";

//route:"/decks/:deckId/edit"
function DeckEdit() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const { deckId } = useParams();
  const history = useHistory();

  const [formEditedDeck, setFormEditedDeck] = useState({ ...initialFormState });
  
  //update deck details
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(formEditedDeck);
    history.goBack();
  };

  //cancel update and return to previous screen
  const handleCancel = async (event) => {
    event.preventDefault();
    history.goBack();
  };

  //store user input into FormEditedDeck
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormEditedDeck({
      ...formEditedDeck,
      [target.name]: value,
    });
  };

  // on load, get deck by id from url parameter
  useEffect(() => {
    async function getDeckById() {
      const deckFromAPI = await readDeck(deckId);
      setFormEditedDeck(deckFromAPI);
    }
    getDeckById();
  }, []); 

  return (
    <>
    {/* Nav */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <h2>Update Deck</h2>
    {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            onChange={handleChange}
            value={formEditedDeck.name}
            placeholder="Deck Name"
            type="text"
            className="form-control"
            id="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={formEditedDeck.description}
            placeholder="Brief description of the deck"
            className="form-control"
            id="description"
            rows="4"
          ></textarea>
        </div>

        <button
          onClick={handleCancel}
          type="cancel"
          className="mr-2 btn btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default DeckEdit;