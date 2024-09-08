import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from 'components/Nav';

import Pieds from 'components/Pieds';

const Layout = ({ data, children }) => {
 

  return (
    <>
      <Nav data={data} /> 
      {children}
    </>
  );
}

export default Layout;
