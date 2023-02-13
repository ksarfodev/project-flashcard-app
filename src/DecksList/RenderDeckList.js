import { Route, Switch,Link } from "react-router-dom";

function RenderDeckList({deck:{name,description,cards,id}}){
    return(
        <div className="card">

        <div className="card-body">
            <h5 className="card-title">{name} <small className="text-muted float-right"> {cards.length} cards</small></h5>
           
            <p className="card-text">{description}</p>
     
            <Link to={`/decks/${id}`} className="ml-0 mr-2 btn btn-secondary">View</Link>
            <a href="#" className="ml-0 mr-2 btn btn-primary">Study</a>
            <a href="#" className="mr-2 float-right btn btn-danger">Delete</a>
         </div>
        </div>
    );
}

export default RenderDeckList;