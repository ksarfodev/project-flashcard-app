import { Route, Switch,Link,useHistory } from "react-router-dom";
import React, { useState,useEffect } from "react";
import { createDeck } from "../utils/api";

function NewDeck(){

  const history = useHistory();

    const initialFormState = {
        name: "",
        description:"",
      };
    

    const [formData, setFormData] = useState({...initialFormState});
    const [newDeck, setNewDeck] = useState({...initialFormState});

    const handleSubmit = (event) => {
        event.preventDefault();
        setNewDeck(formData);
      };

      const handleCancel = (event) => {
        event.preventDefault();
        history.push("/");

      };

      const handleChange = ({ target }) => {

        const value = target.value;
        setFormData({
          ...formData,
          [target.name]: value,
        });
      };

      useEffect(() => {
        if(newDeck.name){
        const abortController = new AbortController(); // Create a new `AbortController`
      
        async function addDeck() {
          try {
            //api
            createDeck(newDeck);
           //console.log("creating new deck",newDeck)
          } catch (error) {
            if (error.name !== "AbortError") {
              throw error;
            }
          }
        }
      
        addDeck();
      
        return () => {
          abortController.abort(); // Cancels any pending request or response
        };
      }
      }, [newDeck]);//when newDeck is set
    
    return(
        <>

        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                </li>
            <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
        </nav>

        <h2>Create Deck</h2>

        <form onSubmit={handleSubmit}>
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

export default NewDeck;