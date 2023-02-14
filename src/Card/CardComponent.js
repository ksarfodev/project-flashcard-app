//shared component 
function CardComponent({formData,handleSubmit,handleChange,handleCancel}){
    return (
        <>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="front">Front</label>
              <textarea
                name="front"
                onChange={handleChange}
                value={formData.front}
                placeholder="Front side of card"
                className="form-control"
                id="front"
                rows="4"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="front">Back</label>
              <textarea
                name="back"
                onChange={handleChange}
                value={formData.back}
                placeholder="Back side of card"
                className="form-control"
                id="back"
                rows="4"
              ></textarea>
            </div>
            <button
              onClick={handleCancel}
              type="cancel"
              className="mr-2 btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </>
      );
}

export default CardComponent;