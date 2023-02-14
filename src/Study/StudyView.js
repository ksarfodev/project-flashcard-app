import { Link } from "react-router-dom";

//view used by Study.js to display flash cards while in study mode
function StudyView({
  deck,
  cardSide,
  deckId,
  currentCard,
  totalCards,
  handleFlip,
  handleNext,
  proceed,
}) {
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
        {/* Card */}
      <h2>{deck.name}: Study</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentCard + 1} of {totalCards}
          </h5>
          {cardSide}
        </div>
        <div>
          <button onClick={handleFlip} className="ml-3 mb-3 btn btn-secondary">
            Flip
          </button>
          {proceed && (
            <button onClick={handleNext} className="ml-3 mb-3 btn btn-primary">
              Next{" "}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default StudyView;
