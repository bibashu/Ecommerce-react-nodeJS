import React, { useState, useEffect } from "react";
import Cardproduct from "components/Cardproduct";
import Carous from "components/Carous";
import Tabsproduit from "components/Tabsproduit";
import { productAPI } from "api/product_api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pieds from "components/Pieds";
import Bouton from "components/Bouton";

const Home = () => {
  const navigate = useNavigate()

  const products = useSelector((store) => store.Products.filteredProduct);


  return (
    
    <div>
      <Carous />
      <Tabsproduit />
      <div className="grid grid-cols-1 justify-items-center text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-4 mx-10 md:mx-0">
        {products.map((prod) => (
          <Cardproduct
            key={prod._id}
            title={prod.nom_produit}
            prix={prod.prix}
            img={prod.image}
            id={prod._id}
            description={prod.description}
            onClick={() => navigate(`/detail/${prod._id}`)}
          />
        ))}
      </div>
      <Bouton className="m-auto mt-5 bg-green-600" onClick={() => navigate('/login')}>Voir plus de produit</Bouton>
      {/* <Cardproduct /> */}
      <Pieds />

    </div>
    
  );
};

export default Home;
