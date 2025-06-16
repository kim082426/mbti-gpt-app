import React, { useState } from 'react';
import Chat from './components/Chat';

export default function App() {
  const [started, setStarted] = useState(false);
  return (
    <div className="app-container">
      {!started ? (
        <button className="start-btn" onClick={() => setStarted(true)}>
          상담 시작
        </button>
      ) : (
        <Chat />
      )}
    </div>
  );
}
