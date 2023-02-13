import { Route, Switch,Link,useHistory ,useParams} from "react-router-dom";
import React, { useState,useEffect } from "react";
import { readCard,updateCard } from "../utils/api";



function CardEdit(){

  const history = useHistory();
  const initialFormState = {
    front: "",
    back:"",
  };

    

    const [formData, setFormData] = useState({...initialFormState});
    const [updatedCard, setUpdatedCard] = useState({...initialFormState});
    const [card, setCard] = useState({});
    const {cardId} = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        setUpdatedCard(formData);
      };

      const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();

      };

      const handleChange = ({ target }) => {
       console.log("handling change...")
        const value = target.value;
        setFormData({
          ...formData,
          [target.name]: value,
        });
      };

      useEffect(()=>{
        setFormData({...formData,...card});
        console.log(formData)

      },[card])

      useEffect(() => {
   
        const abortController = new AbortController(); // Create a new `AbortController`
      
        async function getCardById() {
          try {
            //api
            const cardFromAPI = await readCard(cardId);
      
             setCard(cardFromAPI);

          } catch (error) {
            if (error.name !== "AbortError") {
              throw error;
            }
          }
        }
      
        getCardById();

        return () => {
          abortController.abort(); // Cancels any pending request or response
        };
      }, []);//when updatedDeck is set
    
   //update
   useEffect(() => {

    const abortController = new AbortController(); // Create a new `AbortController`
  
    async function modifyCard() {
      try {
        //api
       // updateCard(updatedCard);
       console.log("updating new deck",updatedCard)
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
  
    modifyCard();
  
    return () => {
      abortController.abort(); // Cancels any pending request or response
    };
  }, [updatedCard]);//when newDeck is set
     
    return(
        <>

        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                </li>
            <li className="breadcrumb-item active" aria-current="page">{card.name}</li>
            <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
        </ol>
        </nav>

        <h2>Update Deck</h2>

        <form  onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="front">Font</label>
            <textarea  name="front" onChange={handleChange} value={formData.front} placeholder="Front side of card" className="form-control" id="front" rows="4"></textarea>
        </div>

        <div className="form-group">
            <label htmlFor="front">Back</label>
            <textarea  name="back" onChange={handleChange} value={formData.back} placeholder="Back side of card" className="form-control" id="back" rows="4"></textarea>
        </div>

        <button onClick={handleCancel} type="cancel" className="mr-2 btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </>
    );
}

export default CardEdit;