import { Button, Drawer } from "flowbite-react";
import { useState, useEffect } from "react";
import { productAPI } from "./api/product_api";
import Layout from "Layout/Layout";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProductList } from "store/products/products_slice";
import { partenaireAPI } from "api/patenaire_api";
import { setPartenaireList } from "store/partenaire/patenaire_slice";

export function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState(null); // État pour stocker les données utilisateur
  const dispatch = useDispatch();

  const handleClose = () => setIsOpen(false);

  // Récupération des produits
  async function fetchAllProduct() {
    try {
      const productList = await productAPI.fetchALL();
      dispatch(setProductList(productList));
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  // Récupération des partenaires
  async function fetchAllPartenaire() {
    try {
      const partenaireList = await partenaireAPI.fetchALL();
      dispatch(setPartenaireList(partenaireList));
    } catch (error) {
      console.error("Erreur lors de la récupération des partenaires :", error);
    }
  }

  // Récupération des informations du profil utilisateur
  async function fetchUserProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Stocker les données de l'utilisateur
        console.log("Données de l'utilisateur :", data);
      } else {
        console.error("Erreur lors de la récupération du profil :", await response.text());
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  }

  // Utilisation de useEffect pour charger les produits, partenaires et profil utilisateur
  useEffect(() => {
    fetchAllProduct();
    fetchAllPartenaire();
    fetchUserProfile();
  }, []);

  return (
    <div className="mx-0 md:mx-16">
      <Layout data={userData} />
      <Outlet data={userData} />
    </div>
  );
}
