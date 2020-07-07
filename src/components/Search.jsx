import React from 'react';

function SerachBar() {
  return (
    <div>
      {/* <Filter /> */}
      <input
        type="text"
        placeholder="Buscar receita"
        data-testid="search-input"
        className="input-search"
        // value={state}
        // onChange={(e) => setState(e.target.value)}
      />
      <button data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
}

export default SerachBar;
