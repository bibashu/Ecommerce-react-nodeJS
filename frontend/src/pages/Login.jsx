import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import Bouton from "components/Bouton";
import shopping from "../assets/imgs/pexels-cottonbro-4068314.jpg";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Envoyer la requête au backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Envoi des données
      });

      console.log(response);
      
      // Si la requête est réussie
      if (response.ok) {
        const data = await response.json();
        // Stocker le token JWT dans localStorage
        localStorage.setItem("token", data.token);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Connexion réussie !",
          showConfirmButton: false,
          timer: 1500,
        });

        // Réinitialiser les champs du formulaire
        setEmail("");
        setPassword("");
        
        navigate("/"); // Redirection après connexion
      } else {
        // Si l'authentification échoue
        const error = await response.text();
        Swal.fire({
          icon: "error",
          title: "Échec de la connexion",
          text: error, // Afficher le message d'erreur du serveur
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${email} n'existe pas`,
        footer: '<a href="/register">Inscrivez-vous</a>',
      });
    }
  }

  return (
    <div
      className="grid justify-items-center h-screen"
      style={{
        backgroundImage: `url(${shopping})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="sm:w-100 w-100 sm:mx-5 bg-slate-100 my-auto h-100 p-10 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-5 text-center " style={{ fontFamily: "Sedan" }}>
          Formulaire de connexion
        </h1>
        <hr />
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p>Avez-vous un compte ? <button className="text-blue-600" onClick={() => navigate('/register')}>S'inscrire</button></p>

          <Bouton type="submit" className="bg-green-500 hover:bg-green-900 mt-3">
            Connexion
          </Bouton>
        </form>
      </div>
    </div>
  );
};

export default Login;
