import React from 'react';
import { useLocation } from 'react-router-dom';
// import * as apiC from '../service/cocktailAPI';
// import * as apiM from '../service/mealAPI';
// import { useFilterAPI } from '../contexts/filterAPI';
// import Filter from './filter';

// // const { filter } = useFilterAPI();
// const [state, setState] = useState('');
// const [setProduct] = useState({});

// const location = useLocation();
// const path = location.pathname.slice(1).split('/')[0];

// const nome = () => setProduct(path === 'comidas' ? apiM.getByName(state)
// : apiC.getByName(state));
// const pl = () => setProduct(path === 'comidas' ? apiM.filterByFirst(state)
// : apiC.filterByFirst(state));
// const ingredientes = () => setProduct(path === 'comidas' ? apiM.filterByIngredient(state)
// : apiC.filterByIngredient(state));

// function fetchProduct() {
//   switch (filter) {
//     case 'nome':
//       nome();
//       break;
//     case 'PL':
//       pl();
//       break;
//     case 'ingrediente':
//       ingredientes();
//       break;
//     default:
//       console.warn('O filter deve ser igual a nome, pl ou ingrediente!');
//   }
// }

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
