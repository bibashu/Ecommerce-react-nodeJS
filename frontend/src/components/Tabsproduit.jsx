import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProduct } from "store/products/products_slice";

const Tabsproduit = () => {
  const [seletedCategory, setSeletedCategory] = useState("Tous");
  const dispatch = useDispatch();
  const products = useSelector((store) => store.Products.productList);

  useEffect(() => {
    // Display all products when the component first renders
    if (seletedCategory === "Tous") {
      handleCategoryChange("Tous"); // Call the function to show all products by default
    }
  }, [products]); // Runs when 'products' is updated

  const handleCategoryChange = (category) => {
    setSeletedCategory(category);
    const filteredProducts =
      category === "Tous"
        ? products
        : products.filter((product) => product.category === category);

    console.log(filteredProducts);

    // Dispatch action to update the filtered products in the store
    dispatch(setFilteredProduct(filteredProducts));
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-serif mt-10 text-pretty mb-7">Liste des produits</h1>
      <div 
        aria-label="Pills"
        className="flex justify-center gap-10 py-5"
        variant="pills"
      >
        <button
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          title="Tous"
          onClick={() => handleCategoryChange('Tous')}
        >
          Tous
        </button>
        <button
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          title="montre"
          onClick={() => handleCategoryChange('montre')}
        >
          Montre
        </button>
        <button
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          title="chaussure"
          onClick={() => handleCategoryChange('chaussure')}
        >
          Chaussure
        </button>
        <button
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          title="pantalon"
          onClick={() => handleCategoryChange('vetement')}
        >
          Vetement
        </button>
      </div>
    </div>
  );
};

export default Tabsproduit;
