import React from 'react';
import Timer from './components/Timer';
import Task from './components/Task';
import './style.css';


function Productibity() {
  return (
    <div className="App">
      <header>
        <h1 className="logo">Productibity</h1>
      </header>

      <main>
      
        <Timer />
        
        <Task />
        
      </main>
    </div>
  );
}

export default Productibity;
