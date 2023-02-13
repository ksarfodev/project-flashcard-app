
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";
import RenderDeck from "./RenderDeckList";
import Deck from "../Deck/Deck";

 function DecksList(){

const [decks, setDecks] = useState([]);

 useEffect(() => {

    const abortController = new AbortController(); // Create a new `AbortController`
  
    async function loadDecks() {
      try {
        const decksFromAPI = await  listDecks();
        setDecks(decksFromAPI);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
  
    loadDecks();
  
    return () => {
     // console.log("cleanup");
      abortController.abort(); // Cancels any pending request or response
    };
  }, []);//do once

    return(

          <ul style={{listStyleType: "none"}} className="list-group">
              {
              decks.map((deck,index)=>(
              
                  <li key={index}><RenderDeck deck={deck}/></li>
          
              ))
              }
          </ul>
       
    );
}

export default DecksList;