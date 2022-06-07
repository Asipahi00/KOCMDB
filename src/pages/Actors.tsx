import React from 'react';
import { ActorTable } from '../components';
import NavigationBar from '../components/NavigationBar';

export default function Actors() {
  return (
      <div>
        <NavigationBar/>
        <ActorTable/>
      </div>
      
  );
}
