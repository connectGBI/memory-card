import React, { useState, useEffect } from 'react';

function Clock({ gameActive }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;
    if (gameActive) {
      intervalId = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);  // Reset seconds when game is not active
    }
    return () => clearInterval(intervalId);  // Cleanup on unmount or gameActive change
  }, [gameActive]);

  return (
    <div>
      <h2>Time: {seconds}</h2>
    </div>
  );
}

export default Clock;
