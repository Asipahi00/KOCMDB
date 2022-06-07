import React from 'react';
import { TVShowsTable } from '../components';
import NavigationBar from '../components/NavigationBar';

export default function TVShow() {
  return (
      <div>
        <NavigationBar/>
        <TVShowsTable/>
      </div>
      
  );
}
