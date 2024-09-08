import React from "react";
import { Button } from "flowbite-react";

const Bouton = ({ children, className, gradientDuoTone, onClick, type }) => {
  return (
    
      <Button gradientDuoTone={gradientDuoTone} type={type} onClick={onClick} className={className} pill>
        {children}
      </Button>
    
  );
};

export default Bouton;
