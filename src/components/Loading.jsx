import React from 'react';
import Gif from '../images/foodLoading.gif';

export default function Loading() {
  return (
    <section className="body">
      <img src={Gif} alt="Loading" className="img-loading" />
    </section>
  );
}
