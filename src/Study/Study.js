import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NotEnoughCards from "./NotEnoughCards";
import StudyView from "./StudyView";
import { readDeck } from "../utils/api";

//route:"/decks/:deckId/study"
function Study() {
  const restartMessage = "Reset cards? Click 'cancel' to return the home page.";

  const history = useHistory();
  const { deckId } = useParams();

  const [totalCards, setTotalCards] = useState(0);
  const [cardSide, setCardSide] = useState("");
  const [cardBeingStudied, setCardBeingStudied] = useState(0);
  const [nextBtnEnable, setNextBtnEnable] = useState(false);
  const [deck, setDeck] = useState({});

  //on load, get deck by id
  useEffect(() => {
    async function getDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    }
    getDeck();
  }, []);

  //whevever the deck updates, refresh totalCards and set card to display front
  useEffect(() => {
    //dont attempt to flip a card or set otal value if deck is invalid
    if (deck.cards && deck.cards.length !== 0) {
      setTotalCards(deck.cards.length);
      setCardSide(deck.cards[cardBeingStudied].front);
    }
  }, [deck]);

  //run when corresponding index id of card being studied increments
  useEffect(() => {
    if (deck.cards) {
      //show front of card
      setCardSide(deck.cards[cardBeingStudied].front);
      //hide next button
      setNextBtnEnable(false);
    }
  }, [cardBeingStudied]);

  //logic for flipping card
  function handleFlip() {
    const { cards } = deck;
    //the front of the card is being shown
    if (cardSide === cards[cardBeingStudied].front) {
      //show the back of the card
      setCardSide(cards[cardBeingStudied].back);
      //enable the next button so it appears
      setNextBtnEnable(true);
    } else {
      //back of card is visible, show the front
      setCardSide(cards[cardBeingStudied].front);
    }
  }

  function handleNext() {
    //console.log("current card #",currentCard)
    if (cardBeingStudied < deck.cards.length - 1) {
      setCardBeingStudied((currentValue) => currentValue + 1);
    }

    //check if the value of cardBeingStudied exceeds the number of cards
    if (cardBeingStudied > deck.cards.length - 2) {
      //if true, give user option to restart and set cardBeingStudied to 0
      //or cancel by going to the Home screen
      window.confirm(restartMessage)
        ? setCardBeingStudied(0)
        : history.push("/");
    }
  }

  //design requirements specify there must be at least 3 cards in deck
  if (deck.cards && deck.cards.length < 3) {
    return <NotEnoughCards deck={deck} deckId={deckId} />;
  }
  return (
    //display study view containing 3 or more cards
    <StudyView
      deck={deck}
      cardSide={cardSide}
      deckId={deckId}
      currentCard={cardBeingStudied}
      totalCards={totalCards}
      handleFlip={handleFlip}
      handleNext={handleNext}
      proceed={nextBtnEnable}
    />
  );
}

export default Study;
