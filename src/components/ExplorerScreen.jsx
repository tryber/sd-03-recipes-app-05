import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function ExplorerScreen() {
  return (
    <div>
      <h3>Explorar</h3>
      <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
      <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>

      <Footer />
    </div>
  );
}
