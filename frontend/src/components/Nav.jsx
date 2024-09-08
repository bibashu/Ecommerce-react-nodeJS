import { Button, Navbar } from "flowbite-react";
import logo from "../assets/imgs/logo-removebg-preview.png";
import Bouton from "./Bouton";
import { useNavigate } from "react-router-dom";

export default function Nav({ data }) {
  console.log(data);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar fluid rounded className="">
      <Navbar.Brand href="/">
        <img
          src={logo}
          className="h-20"
          alt="logo"
        />
        
      </Navbar.Brand>
      <div className="flex md:order-2">
        {data ? (
          <Bouton onClick={handleLogout}  gradientDuoTone="redToYellow">
            Déconnexion
          </Bouton>
        ) : (
          <>
            <Bouton onClick={() => navigate("/login")} className="mr-1 md:mr-3" gradientDuoTone="greenToBlue">
              Se connecter
            </Bouton>
            <Bouton onClick={() => navigate("/register")} gradientDuoTone="pinkToOrange">
              Inscription
            </Bouton>
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="">
        <Navbar.Link className="text-lg font-bold" href="/" active>
          Accueil
        </Navbar.Link>
        <Navbar.Link className="text-lg font-bold" href="#">
          Produits
        </Navbar.Link>
        <Navbar.Link className="text-lg font-bold" href="#">
          Profil
        </Navbar.Link>
        <Navbar.Link className="text-lg font-bold" href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
