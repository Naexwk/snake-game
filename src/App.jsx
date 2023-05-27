import * as React from 'react';
import './style.css';
import Board from './Board';

export default function App() {
  return (
    <div>
      <Board size={20}></Board>
    </div>
  );
}
