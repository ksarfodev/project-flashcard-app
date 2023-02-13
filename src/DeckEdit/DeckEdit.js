import { Route, Switch,Link,useHistory ,useParams} from "react-router-dom";
import React, { useState,useEffect } from "react";
import { readDeck,updateDeck } from "../utils/api";



function DeckEdit(){

  const history = useHistory();
  const initialFormState = {
    name: "",
    description:"",
  };

    

    const [formData, setFormData] = useState({...initialFormState});
    const [updatedDeck, setUpdatedDeck] = useState({...initialFormState});
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        setUpdatedDeck(formData);
        history.goBack();
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
        setFormData({...formData,...deck});
        console.log(formData)

      },[deck])

      useEffect(() => {
   
        const abortController = new AbortController(); // Create a new `AbortController`
      
        async function getDeckById() {
          try {
            //api
            const deckFromAPI = await readDeck(deckId);
      
             setDeck(deckFromAPI);

          } catch (error) {
            if (error.name !== "AbortError") {
              throw error;
            }
          }
        }
      
        getDeckById();

        return () => {
          abortController.abort(); // Cancels any pending request or response
        };
      }, []);//when updatedDeck is set
    
   //update
   useEffect(() => {
if(updatedDeck.name){
    const abortController = new AbortController(); // Create a new `AbortController`
  
    async function modifyDeck() {
      try {
        //api
        updateDeck(updatedDeck);
       console.log("updating new deck",updatedDeck)
  
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
  
    modifyDeck();
  
    return () => {
      abortController.abort(); // Cancels any pending request or response
    };
  }
  }, [updatedDeck]);//when newDeck is set
     
    return(
        <>

        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                </li>
            <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
        </nav>

        <h2>Update Deck</h2>

        <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name" onChange={handleChange} value={formData.name} placeholder="Deck Name" type="text" className="form-control" id="name" />
        </div>

        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea  name="description" onChange={handleChange} value={formData.description} placeholder="Brief description of the deck" className="form-control" id="description" rows="4"></textarea>
        </div>

        <button onClick={handleCancel} type="cancel" className="mr-2 btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </>
    );
}

export default DeckEdit;