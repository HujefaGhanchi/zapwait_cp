import React, { useEffect } from 'react';
import Footer from './components/Footer';
import socket from './socket';

const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div className="App">
      <h1>WebSocket Connection Example</h1>
      {/* Other components */}
      <Footer />
    </div>
  );
};

export default App;