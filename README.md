# project-flashcard-app

## WebApp Layout
* Layout/Index.js contains the routes to various pages
  * "Create Deck" button navigates to the Create Deck screen
  * Home screen 
    * The home screen lists decks created
    * The user can view, study or delete the entire deck
  * The Create Deck screen accepts a "name" and brief description
    * There's a navigation menu allowing return to Home screen
    * The user can submit the new deck or cancel
  * Pressing the "View" button on the home screen navigates to a screen that displays a unique deck
    * The user can study, edit or add cards to a particular deck
    * The user can delete the deck and will be presented with a popup warning before confirming deletion
    * All cards belonging to the particular deck are displayed with the front and back content visible side-by-side
      * The cards can be edited or deleted
  * The Edit deck screen is similar to the create Deck screen
    * The Edit deck screen will populate pre-existing Deck information and allow updates and commits
    * The Create deck screen allows entry of a deck name and brief description
  * The Create Card and Edit card screens behave similar to the Create/Edit deck screens but apply to individual cards
  * The Study screen allows the user to navigate through a collection of flashcards for a particular deck
    * The user must flip each card to reveal the answer before advancing to the next
    * The user can restart by advancing to the first card or exit the Study screen
