import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

//route:"/decks/new"
function NewDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialFormState });
  
  //api call to create a new deck based on form data
  const createNewDeck = async (event) => {
    event.preventDefault();
    await createDeck(formData);
    history.goBack();
  };

  //cancel and return to Home screen
  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/");
  };

  //process form data per user input
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  return (
    <>
    {/* Nav */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h2>Create Deck</h2>
      {/* Form */}
      <form onSubmit={createNewDeck}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
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
            value={formData.description}
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

export default NewDeck;
