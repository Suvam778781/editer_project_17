import logo from './logo.svg';
import './App.css';
import { GrapeJSEditor } from './components/EditCompo';
import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
function App() {
  return (
    <div className="App">
      <GrapeJSEditor/>
    </div>
  );
}

export default App;
