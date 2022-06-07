import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/Actors">Actors</Link>
    </li>
    <li>
      <Link to="/Movies">Movies</Link>
    </li>
  </div>
  );
}
export default navbar;