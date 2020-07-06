import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import * as rota from './Routes';

function App() {
  return (
    <div>
      <Switch>
        {rota.renderReceitasFeitas()}
        {rota.renderComidas()}
        {rota.renderBebibdas()}
        {rota.renderPerfil()}
        {rota.renderIngredientesB()}
        {rota.renderIngredientesA()}
        {rota.renderExplorar()}
        {rota.renderBarra()}
        {rota.renderAreaA()}
        {rota.renderAreaB()}
        {rota.renderFavoritas()}
        {rota.renderProgressA()}
        {rota.renderProgressB()}
        {rota.renderComidasId()}
        {rota.renderBebidasId()}
        {rota.renderExplorarTipo()}
      </Switch>
    </div>
  );
}

export default App;
