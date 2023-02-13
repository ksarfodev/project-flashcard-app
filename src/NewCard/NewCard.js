import { Route, Switch,Link,useHistory ,useParams} from "react-router-dom";
import React, { useState,useEffect } from "react";
import { createCard,readDeck } from "../utils/api";

function NewCard(){

  const history = useHistory();

    const initialFormState = {
        front: "",
        back:"",
        deckId: 0,
      };
    

    const [formData, setFormData] = useState({...initialFormState});
    const [newCard, setNewCard] = useState({...initialFormState});
    const [deck, setDeck] = useState({});

    const {deckId} = useParams();

    const handleSave = (event) => {
        event.preventDefault();
        setNewCard(formData);
      };

      const handleDone= (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}`);

      };

      const handleChange = ({ target }) => {

        const value = target.value;
        setFormData({
          ...formData,
          [target.name]: value,
        });
      };

      useEffect(() => {
        if(newCard.front){
        const abortController = new AbortController(); // Create a new `AbortController`
      
        async function addNewCard() {
          try {
            //api
           createCard(deckId,newCard);
           console.log("creating new card", newCard)
           setFormData({
            ...initialFormState
          });
          } catch (error) {
            if (error.name !== "AbortError") {
              throw error;
            }
          }
        }
      
        addNewCard();
      
        return () => {
          abortController.abort(); // Cancels any pending request or response
        };
      }
      }, [newCard]);//when newDeck is set

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
    
    return(
        <>

        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item active">
                <Link to="/">Home</Link>
                </li>
            <li className="breadcrumb-item active" aria-current="page">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
            <li className="breadcrumb-item" aria-current="page">Add Card</li>
        </ol>
        </nav>

        <h2>{deck.name}: Add Card</h2>

        <form onSubmit={handleSave}>
  
        <div className="form-group">
            <label htmlFor="front">Font</label>
            <textarea  name="front" onChange={handleChange} value={formData.front} placeholder="Front side of card" className="form-control" id="front" rows="4"></textarea>
        </div>

        <div className="form-group">
            <label htmlFor="front">Back</label>
            <textarea  name="back" onChange={handleChange} value={formData.back} placeholder="Back side of card" className="form-control" id="back" rows="4"></textarea>
        </div>

        <button onClick={handleDone}  className="mr-2 btn btn-secondary">Done</button>
        <button  type="submit" className="btn btn-primary">Save</button>
      </form>
      </>
    );
}

export default NewCard;