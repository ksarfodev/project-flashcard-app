import { useParams,Link, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import DeckRender from "./DeckRender";


function Deck(){

    const {deckId} = useParams();

    const [deck, setDeck] = useState({});

    const[deckToEdit,setDeckToEdit] = useState({});


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

//   useEffect(() => {

//     const abortController = new AbortController(); // Create a new `AbortController`
  
//     async function modifyDeck() {
//       try {
 
//         console.log("modifying deck")
//       // await updateDeck(deckToEdit);
     

//       } catch (error) {
//         if (error.name !== "AbortError") {
//           throw error;
//         }
//       }
//     }
  
//     modifyDeck();
  
//     return () => {
//      // console.log("cleanup");
//       abortController.abort(); // Cancels any pending request or response
//     };

//   }, [deckToEdit]);//whenever deckId changes

  function handleEdit(updatedDeck){
    setDeckToEdit(updatedDeck);
  }

    return (
   <Switch>
    <Route>
        <DeckRender handleEdit={handleEdit} deck={deck}/>
    </Route>
    <Route>
        
    </Route>
   </Switch>
  
    );
}

export default Deck;