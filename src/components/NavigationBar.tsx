import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div id = 'navbar'>
    <li>
      <Link to="/">Home Page</Link>
    </li>
    <li>
      <Link to="/Actors">Actors</Link>
    </li>
    <li>
      <Link to="/Movies">Movies</Link>
    </li>
    <li>
      <Link to="/TVShows">TV Shows</Link>
    </li>
  </div>
  );
}
export default navbar;