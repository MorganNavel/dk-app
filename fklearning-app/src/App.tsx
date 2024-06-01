import React from 'react';
import logo from './logo.svg';
import './App.css';
import Greet from './components/Greet';

function App() {
  return (
    <div className="App">
      <Greet name="Morgan" messageCount={15}/>
    </div>
  );
}

export default App;
