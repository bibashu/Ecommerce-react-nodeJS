import React, { useState } from "react";
import { Card } from "flowbite-react";
import montre from "../assets/imgs/montre.png";
import { useNavigate } from "react-router-dom";
const Cardproduct = ({ title,description, prix, img, id, onClick}) => {
  
  const [isCardHovered, setIsCardHovered] = useState(false);
  return (
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img class="rounded-t-lg " src={img} alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
         {description}
        </p>
       <button className="bg-green-700 text-white p-3 rounded-xl hover:bg-green-500" onClick={onClick} >Contacter </button>
      </div>
    </div>
  );
};

export default Cardproduct;
