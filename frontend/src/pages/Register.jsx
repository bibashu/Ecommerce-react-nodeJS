import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Bouton from "components/Bouton";
import shopping from "../assets/imgs/pexels-cottonbro-4068314.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Incription avec success",
        showConfirmButton: false,
        timer: 3000
      });
      navigate("/login")
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${email} n'existe pas`,
        footer: '<a href="/register">Inscrivez-vous</a>'
      });
    }
  };
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
        <h1
          className="text-3xl font-bold mb-5 text-center "
          style={{ fontFamily: "Sedan" }}
        >
          Formulaire d'inscription
        </h1>
        <hr />
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p>Avez-vous un compte ? <button className="text-blue-600" onClick={() => navigate('/login')}>Se connecter</button></p>
          <Bouton
            className="bg-green-500 hover:bg-green-900 mt-3"
            type="submit"
          >
            S'inscrire
          </Bouton>
        </form>
      </div>
    </div>
  );
};

export default Register;
