import React from "react";
import { Tabs } from "flowbite-react";


const TabItem = ({children, title, onClick}) => {
  return (
    <button title={title}  onClick={onClick} > 
      {/* <p className="text-sm text-gray-500 dark:text-gray-400" ></p> */}
    </button>
  );
};

export default TabItem;
