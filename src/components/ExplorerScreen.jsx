import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../style/Explorer.css';
import Header from './Header';

export default function ExplorerScreen() {
  return (
    <div className="body">
      <Header title="Explorar" />
      <section className="btn-group">
        <Link data-testid="explore-food" to="/explorar/comidas">
          <button type="button" className="btn">Explorar Comidas</button>
        </Link>
        <Link data-testid="explore-drinks" to="/explorar/bebidas">
          <button type="button" className="btn">Explorar Bebidas</button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}
