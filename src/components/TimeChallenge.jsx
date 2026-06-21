import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimeChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const isTimeActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // If timer has expired this will execute.
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.openModal();
  }

  const handleReset = function () {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 10);
    }, 10);
  };

  const handleStop = () => {
    dialog.current.openModal();
    clearInterval(timer.current);
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        timeRemaining={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={isTimeActive ? handleStop : handleStart}>
            {isTimeActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={isTimeActive ? 'active' : ''}>
          {isTimeActive ? 'Time is running...' : 'Time inactive'}
        </p>
      </section>
    </>
  );
}
