import axios from "axios";
import Bouton from "components/Bouton";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ContactPartenaire() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [userID, setUserID] = useState(null);

  const navigate = useNavigate();
  const { partenaireId } = useParams();
  const partenaires = useSelector((store) => store.Partenaire.partenaireList);

  const partenaire = useSelector((store) =>
    store.Partenaire.partenaireList.find(
      (partenaire) => partenaire._id === partenaireId
    )
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserID(decodedToken.id); // Extract userID from token
      console.log(decodedToken.id); // Ensure userID is correctly retrieved
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userID) {
      console.error("User ID not found. Please log in.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/message", {
        nom,
        prenom,
        email,
        message,
        userID, // Include userID in the request body
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Message envoyé avec succés",
        showConfirmButton: false,
        timer: 3000,
      });
      // setEmail("")
      // setMessage("")
      // setNom("")
      // setPrenom("")
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  }

  return (
    <div>
      <h1 className="mb-5 text-3xl text-center font-serif text-gray-900 dark:text-white md:text-2xl lg:text-4xl">
        <span className="">Contact Partenaire</span>
      </h1>

      <div className="grid justify-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col justify-center max-w-sm p-6 w-[300px] text-center h-[200px] bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Email
          </h5>

          {partenaire && partenaire.email && (
            <p className="font-normal text-gray-700 dark:text-gray-400 text-2xl">
              {partenaire.email}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center max-w-sm p-6 w-[300px] text-center h-[200px] bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Nom du Partenaire
          </h5>
          {partenaire && partenaire.email && (
            <p className="font-normal text-gray-700 dark:text-gray-400 text-2xl">
              {partenaire.nom_partenaire}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center max-w-sm p-6 w-[300px] text-center h-[200px] bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Téléphone
          </h5>
          {partenaire && partenaire.phone && (
            <p className="font-normal text-gray-700 dark:text-gray-400 text-2xl">
              {partenaire.phone}
            </p>
          )}
        </div>
      </div>
      <hr className="mt-10" />
      <h1 className="mb-5 text-3xl text-center font-serif">
        Ou contactez par message
      </h1>

      <div className="border-b border-gray-900/10 pb-12 shadow-2xl mb-5 rounded-lg bg-slate-50 px-10 py-12">
        <h2 className="text-pretty font-semibold leading-7 text-gray-900">
          Informations Personnelles
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Utilisez une adresse permanente où vous pouvez recevoir du courrier.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="prenom"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  required
                  onChange={(e) => setPrenom(e.target.value)}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="nom"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nom
              </label>
              <div className="mt-2">
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  onChange={(e) => setNom(e.target.value)}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Adresse Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-5">
              <label
                htmlFor="message"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2 ">
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows="5"
                  cols="2"
                  autoComplete="message"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
          <Bouton type="submit" className="bg-green-400 mt-5">
            Envoyer message
          </Bouton>
        </form>
      </div>
    </div>
  );
}
