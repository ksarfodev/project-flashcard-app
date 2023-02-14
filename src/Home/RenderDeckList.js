import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

//used by Home.js to render list of decks and handle button events
function RenderDeckList({ deck: { name, description, id, cards }, history }) {
    
  //delete deck by id via api
  const deckDeleteHandler = async (event) => {
    event.preventDefault();
    await deleteDeck(id);
    history.go(0); //refresh
  };

  return (
    //Bootstrap card to display deck
    <div className="card-body">
      <h5 className="card-title">
        {name}{" "}
        <small className="text-muted float-right"> {cards.length} cards</small>
      </h5>

      <p className="card-text">{description}</p>

      <Link to={`/decks/${id}`} className="ml-0 mr-2 btn btn-secondary">
        View
      </Link>
      <Link to={`/decks/${id}/study`} className="ml-0 mr-2 btn btn-primary">
        Study
      </Link>

      <button
        onClick={deckDeleteHandler}
        className="mr-2 float-right btn btn-danger"
      >
        Delete
      </button>
    </div>
  );
}
export default RenderDeckList;
