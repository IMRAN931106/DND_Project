import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from './components/DragandDrap';
// import Example from './components/example';

function App() {
  return (
    <div className="App">
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  </div>
  );
}

export default App;
