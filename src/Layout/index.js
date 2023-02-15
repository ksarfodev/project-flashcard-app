import React, { useEffect,useState } from "react";
import { Route, Switch,Link} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import Deck from "../Deck/Deck";
import DeckEdit from "../Deck/DeckEdit";
import NewDeck from "../Deck/NewDeck";
import Home from "../Home/Home";
import Study from "../Study/Study";
import CardEdit from "../Card/CardEdit";
import NewCard from "../Card/NewCard";


//starting point
function Layout() {

  const [decks, setDecks] = useState([]);

  //on load, get decks using api
  useEffect(()=> {
    const abortController = new AbortController(); // Create a new `AbortController`

    async function loadDecks() {
      try {
        const decksFromAPI = await listDecks();
        setDecks(decksFromAPI);

      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    
    return () => {
      abortController.abort(); // Cancels any pending request or response
    };
  }
  loadDecks();
 
  },[]);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
          {/* Home Screen */}
            <Link
              to="/decks/new"
              className="ml-0 mb-2 btn btn-secondary btn-lg"
            >
              <i className="plus-circle"></i> Create Deck
            </Link>
            <Home />
          </Route>
           {/* Create Deck */}
          <Route exact path={"/decks/new"}>
            <NewDeck />
          </Route>
          {/* Individual Deck */}
          <Route exact path={"/decks/:deckId"}>
            <Deck  />
          </Route>
          {/* Edit Deck */}
          <Route exact path={"/decks/:deckId/edit"}>
            <DeckEdit />
          </Route>
          {/* Create Card */}
          <Route exact path={"/decks/:deckId/cards/new"}>
            <NewCard />
          </Route>
          {/* Edit Card */}
          <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
            <CardEdit />
          </Route>
          {/* Study Screen */}
          <Route exact path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
