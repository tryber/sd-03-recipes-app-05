import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../style/Explorer.css';

export default function ExplorerScreen() {
  return (
    <div className="body">
      <section className="btn-group">
        <Link data-testid="explore-food" className="" to="/explorar/comidas"><button className="btn">Explorar Comidas</button></Link>
        <Link data-testid="explore-drinks" className="" to="/explorar/bebidas"><button className="btn">Explorar Bebidas</button></Link>
      </section>
      <Footer />
    </div>
  );
}
