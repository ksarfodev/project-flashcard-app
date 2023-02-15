import { Link } from "react-router-dom";
import React from "react";

//view used by Study.js to notify the user of having less than 3 cards
function NotEnoughCards({ deck, deckId }) {
  return (
    <>
      {/* Nav */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      {/* Cards */}
      <h2 className="mt-4 mb-3">{deck.name}: Study</h2>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {deck.cards.length} cards
        in this deck.
      </p>
      <Link
        to={`/decks/${deckId}/cards/new`}
        className="ml-0 mr-2 btn btn-primary"
      >
        Add Cards
      </Link>
    </>
  );
}

export default NotEnoughCards;
