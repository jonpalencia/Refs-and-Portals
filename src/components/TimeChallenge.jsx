import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimeChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeStarted, setTimeStarted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  const handleStart = () => {
    timer.current = setTimeout(() => {
      setTimeExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);
    setTimeStarted(true);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
    setTimeStarted(false);
  };

  return (
    <>
      <ResultModal ref={dialog} result={'lost'} targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        {timeExpired && <p>You lost...</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timeStarted ? handleStop : handleStart}>
            {timeStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timeStarted ? 'active' : ''}>
          {timeStarted ? 'Time is running...' : 'Time inactive'}
        </p>
      </section>
    </>
  );
}
