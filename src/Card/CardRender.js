import { useHistory,useParams } from "react-router-dom";
import { deleteCard } from "../utils/api";

//Used by Deck.js to display individual cards and handle button press events
function CardRender({ card }) {
  const cardMessage = "Delete this card? You will not be able to recover it.";
  const {deckId} = useParams();
  const history = useHistory();

    //handle card deletion
    async function handleCardDelete(id) {
      if (window.confirm(cardMessage)) {
        await deleteCard(id);
        history.go(0); //refresh page
      }
    }

  //navigate to card edit screen
  function handleCardEdit(id) {
    history.push(`/decks/${deckId}/cards/${id}/edit`);
  }

  return (
    <>
      <div className="card-body">
        <div className="row">
          <p className="col-6 card-text">{card.front}</p>
          <p className="col-6 card-text">{card.back}</p>
        </div>

        <button
          onClick={() => handleCardDelete(card.id)}
          className="mr-2 float-right btn btn-danger"
        >
          Delete
        </button>

        <button
          onClick={() => handleCardEdit(card.id)}
          className="ml-0 mr-2 float-right  btn btn-secondary"
        >
          Edit
        </button>
      </div>
    </>
  );
}

export default CardRender;