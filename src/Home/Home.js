import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import RenderDeckList from "./RenderDeckList";

//home screen
function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  //on load, get decks via api
  useEffect(() => {
    async function loadDecks() {
      const decksFromAPI = await listDecks();
      setDecks(decksFromAPI);
    }
    loadDecks();
  }, []); 

  return (
    //Display list of Decks
    <ul className="list-group">
      {decks.map((deck, index) => (
        <li key={index} className="list-group-item">
          <RenderDeckList history={history} deck={deck} />
        </li>
      ))}
    </ul>
  );
}

export default Home;