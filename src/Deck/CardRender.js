import { Route, Switch,Link,useHistory } from "react-router-dom";

function CardRender({ card ,handleDelete,handleEdit }) {

  return (
    <>
        <div className="card-body">
          <div className="row">
            <p className="col-6 card-text">{card.front}</p>
            <p className="col-6 card-text">{card.back}</p>
          </div>

          <button onClick={() => handleDelete(card.id)} className="mr-2 float-right btn btn-danger">
            Delete
          </button>

          <button onClick={() => handleEdit(card.id)} className="ml-0 mr-2 float-right  btn btn-secondary">
            Edit
          </button>
        </div>
    </>
  );
}


export default CardRender;
