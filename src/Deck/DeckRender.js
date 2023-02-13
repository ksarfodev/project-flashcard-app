import { Route, Switch,Link,useHistory,useParams } from "react-router-dom";
import CardRender from "./CardRender";
import React, { useEffect, useState } from "react";
import { deleteCard,deleteDeck } from "../utils/api";
import Study from "../Study/Study";

function DeckRender({ deck: { id,name, description, cards } }) {



    const [cardId, setCardId] = useState(0);
    const[deckToDelete,setDeckToDelete] = useState(0);
    const {deckId} = useParams();

    const message = "Delete this card? You will not be able to recover it.";
    const deckMessage = "Delete this deck? You will not be able to recover it.";
    const history = useHistory();

    function handleDeckDelete(){
      if (window.confirm(deckMessage)) {
        setDeckToDelete(id);

        history.push("/"); 
     
      }
    }

    function handleDelete(cardId){

    
      
        if (window.confirm(message)) {
            setCardId(cardId);

            history.go(0); //refresh
         
           //console.log("handling delete",id);
          }

    }

    function handleEdit(cardId){
      history.push(`/decks/${deckId}/cards/${cardId}/edit`);
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

    useEffect(() => {

      
        if(cardId > 0){
        const abortController = new AbortController(); // Create a new `AbortController`
      
        async function deleteCardById() {
          try {
    
          console.log("deleting...",cardId)
           await deleteCard(cardId);
         
    
          } catch (error) {
            if (error.name !== "AbortError") {
              throw error;
            }
          }
        }
        deleteCardById();
      
        return () => {
          //console.log("cleanup");
  
          abortController.abort(); // Cancels any pending request or response
        };
    }
    
      }, [cardId]);//whenever deckId changes
    

   // console.log(cards)
   if(cards)
   {

   
  return (
    <>
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

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {name}
          </h5>

          <p className="card-text">{description}</p>

          <Link to={`/decks/${id}/edit`}  className="ml-0 mr-2 btn btn-secondary">
            Edit
          </Link>
          <Link to={`/decks/${id}/study`}  className="ml-0 mr-2 btn btn-primary">
            Study
          </Link>
          <Link to={`/decks/${id}/cards/new`}  className="ml-0 mr-2 btn btn-primary">
            Add Cards
          </Link>
          <button onClick={handleDeckDelete} className="mr-2 float-right btn btn-danger">
            Delete
          </button>
        </div>
      </div>
      
          {/* Cards */}
          <h2 className="mt-4 mb-3">Cards</h2>
                <ul className="mb-3 list-group">
                    {
                      cards.map((card,index)=>(
                      <li key={index} className="list-group-item">
                          <CardRender handleEdit={handleEdit} handleDelete={handleDelete} card={card}/>
                      </li>
                      ))
                    }
                </ul>
    </>
  );
}
return <p>Loading...</p>;
}


export default DeckRender;
