import Header from "./Header";
import NotFound from "./NotFound";
import DecksList from "../DecksList/DecksList";
import NewDeck from "../NewDeck/NewDeck";
import Deck from "../Deck/Deck";
import DeckEdit from "../DeckEdit/DeckEdit";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NewCard from "../NewCard/NewCard";
import CardEdit from "../CardEdit/CardEdit";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Link
              to="/decks/new"
              className="ml-0 mb-2 btn btn-secondary btn-lg"
            >
              <i className="plus-circle"></i> Create Deck
            </Link>
            <DecksList />
          </Route>
          <Route exact path={"/decks/new"}>
            <NewDeck />
          </Route>
          {/* <Route> */}
          <Route exact path={"/decks/:deckId"}>
            <Deck />
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <DeckEdit />
          </Route>
          <Route exact path={"/decks/:deckId/cards/new"}>
            <NewCard />
          </Route>
          <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
            <CardEdit />
          </Route>
    
          {/* </Route> */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
