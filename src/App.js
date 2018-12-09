import React, { Component } from 'react';
import Kasir from './container/Kasir';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <h1>Aplikasi POS Sederhana</h1>
        </div>
        <Kasir />
      </div>
    );
  }
}

export default App;
