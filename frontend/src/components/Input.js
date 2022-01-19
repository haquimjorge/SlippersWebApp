import { React, useState } from "react";

function Input() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <div className="input-contenedor-home">
        <label htmlFor="search">Search :</label>
        <input
          value={searchInput}
          type="text"
          id="search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" value="">
          Ok
        </button>
      </div>
    </>
  );
}

export default Input;
