import React from "react";

const CategoryForm = ({handleSubmit, name, setName}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
          <button className="btn btn-outline-primary mt-4">Upload</button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
