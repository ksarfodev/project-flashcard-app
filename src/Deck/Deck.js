import CardRender from "../Card/CardRender";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck } from "../utils/api";

//route:"/decks/:deckId"
function Deck() {
  const deckMessage = "Delete this deck? You will not be able to recover it.";
  const { deckId } = useParams();
  const history = useHistory();

  //destructure single deck
  const [{ id, name, description, cards }, setDeck] = useState({});

  //api call to delete deck by id. Then navigate to Home
  const deckDeleteHandler = async (event) => {
    event.preventDefault();
    if (window.confirm(deckMessage)) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  //on load, get deck by id
  useEffect(() => {
    async function getDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    }
    getDeck();
  }, []);

  //check that cards is not undefined, page might be loading
  if (cards) {
    return (
      <>
        {/* Nav */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>
        {/* Deck info */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>

            <p className="card-text">{description}</p>

            <Link
              to={`/decks/${id}/edit`}
              className="ml-0 mr-2 btn btn-secondary"
            >
              Edit
            </Link>
            <Link
              to={`/decks/${id}/study`}
              className="ml-0 mr-2 btn btn-primary"
            >
              Study
            </Link>
            <Link
              to={`/decks/${id}/cards/new`}
              className="ml-0 mr-2 btn btn-primary"
            >
              Add Cards
            </Link>
            <button
              onClick={deckDeleteHandler}
              className="mr-2 float-right btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>

        {/* List of Cards */}
        <h2 className="mt-4 mb-3">Cards</h2>
        <ul className="mb-3 list-group">
          {cards.map((card, index) => (
            <li key={index} className="list-group-item">
              <CardRender card={card} />
            </li>
          ))}
        </ul>
      </>
    );
  }
  return <p>Loading...</p>;
}

export default Deck;
