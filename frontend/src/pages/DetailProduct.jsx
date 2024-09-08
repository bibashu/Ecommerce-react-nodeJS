import Bouton from 'components/Bouton';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailProduct() { 
  console.log();
  const navigate = useNavigate()
  const { productId } = useParams();
  const products = useSelector((store) => store.Products.productList);

  const product = useSelector((store) =>
    store.Products.productList.find((product) => product._id === productId)
  );
  


  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full mt-12'>
<div className='mx-10' >
  <img className='rounded-2xl' src={product.image} alt="" />
</div>
<div className='mx-10 flex flex-col gap-5 mt-7 md:mt-0 mb-5'>
  <h1 className='text-3xl font-bold text-center '>Informations Produit</h1>
  <h2 className='text-lg' ><span className='font-bold'>Nom du produit:</span> {product.nom_produit}</h2>
  <h2 className='text-lg' ><span className='font-bold'>Prix:</span> {product.prix} FCFA</h2>
  <h2 className='text-lg'  ><span className='font-bold'>Description:</span> {product.description}</h2>
  <h2 className='text-lg'  ><span className='font-bold'>Date d'ajout:</span> {new Date(product.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</h2>
  <Bouton onClick={() => navigate(`/partenaire/${product.Partenaire}`)} className="bg-green-600 ">Contacter le partenaire</Bouton>

</div>
      </div>
    </div>
  );
}
