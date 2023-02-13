import { Route, Switch,Link,useHistory,useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";

function Study() {

    const initialValue = 0;

    const [cardId, setCardId] = useState(0);
    const [totalCards,setTotalCards] = useState(0);

    const [cardSide,setCardSide] = useState('');
    const {deckId} = useParams();
    const history = useHistory();

  
    const [currentCard,setCurrentCard] = useState(initialValue);

    const [proceed,setProceed] = useState(false);


    function handleEdit(cardId){
      history.push(`/decks/${deckId}/cards/${cardId}/edit`);
    }

    const [deck, setDeck] = useState({});

   // const{cards} = deck;

   useEffect(() => {
    console.log(deck.cards)
    if(deck.cards && deck.cards.length !== 0){
       setTotalCards(deck.cards.length);
       setCardSide(deck.cards[currentCard].front);

       console.log(cardSide)
       console.log(currentCard)
    }

  }, [deck])

  useEffect(()=>{
    if(deck.cards){
        setCardSide (deck.cards[currentCard].front);
        setProceed(false);
    }

  },[currentCard])

    useEffect(() => {
        const abortController = new AbortController(); // Create a new `AbortController`
        async function getDeck() {
          try {
           const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);

          } catch (error) {
            if (error.name !== "AbortError") {
              throw error;
            }
          }
        }
      
        getDeck();

        return () => {
         // console.log("cleanup");
          abortController.abort(); // Cancels any pending request or response
        };
    
      }, []);//whenever deckId changes


   function handleFlip(){
     const {cards} = deck;
    if(cardSide === cards[currentCard].front){
        setCardSide(cards[currentCard].back);
        setProceed(true);
    }else{
        setCardSide (cards[currentCard].front);
       // setProceed(false);
    }
   }

   function handleNext(){
    //console.log("current card #",currentCard)
    if(currentCard < deck.cards.length-1)
    {
        setCurrentCard((currentValue) => ++currentValue);
    }

    if(currentCard > deck.cards.length-2 )
    {
        if (window.confirm("Reset cards?  Click 'cancel' to return the home page.")) {
            setCurrentCard(0);
        }else{
           history.push("/");
        }
    }
    
   }



   if(deck.cards && deck.cards.length < 3)
   {
   // setCardSide(deck.cards[currentCard].front);

  return (
    <>
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
       <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
       <Link to={`/decks/${deckId}/cards/new`}  className="ml-0 mr-2 btn btn-primary">
            Add Cards
          </Link>

    
    </>
  );
   }
   return (
    <>
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
    <h2>{deck.name}: Study</h2>
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentCard + 1 } of {totalCards}
            
          </h5>
          {cardSide}

         
        </div>
        <div>
        <button onClick={handleFlip} className="ml-3 mb-3 btn btn-secondary">
            Flip
          </button> 
          {proceed && ( <button onClick={handleNext} className="ml-3 mb-3 btn btn-primary">
         Next </button> )} 
          
          
        </div>
     
      </div>
    </>
   );
}




export default Study;
