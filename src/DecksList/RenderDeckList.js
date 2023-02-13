import { Route, Switch,Link,useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { deleteDeck } from "../utils/api";

function RenderDeckList({deck:{name,description,cards,id}}){

    const history = useHistory();

    const[deckToDelete,setDeckToDelete] = useState(0);
    const deckMessage = "Delete this deck? You will not be able to recover it.";

    function handleDeckDelete(){
        if (window.confirm(deckMessage)) {
          setDeckToDelete(id);
  
         history.push("/"); 
       
        }
      }

      useEffect(() => {

      
        if(deckToDelete > 0){
        const abortController = new AbortController(); // Create a new `AbortController`
      
        async function deleteDeckById() {
          try {
    
          console.log("deleting deck...",id)
           await deleteDeck(id);
         
    
          } catch (error) {
            if (error.name !== "AbortError") {
              throw error;
            }
          }
        }
        deleteDeckById();
      
        return () => {
          //console.log("cleanup");
  
          abortController.abort(); // Cancels any pending request or response
        };
    }
    
      }, [deckToDelete]);//whenever deckId changes
  
    return(
        <div className="card">

        <div className="card-body">
            <h5 className="card-title">{name} <small className="text-muted float-right"> {cards.length} cards</small></h5>
           
            <p className="card-text">{description}</p>
     
            <Link to={`/decks/${id}`} className="ml-0 mr-2 btn btn-secondary">View</Link>
            <Link to={`/decks/${id}/study`}   className="ml-0 mr-2 btn btn-primary">Study</Link>
            <button onClick={handleDeckDelete} className="mr-2 float-right btn btn-danger">
            Delete
          </button>
         </div>
        </div>
    );
}

export default RenderDeckList;