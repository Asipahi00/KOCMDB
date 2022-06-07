import React from 'react';
import { MoviesTable } from '../components';
import NavigationBar from '../components/NavigationBar';

export default function Movies() {
  return (
      <div>
        <NavigationBar/>
        <MoviesTable/>
      </div>
      
  );
}
