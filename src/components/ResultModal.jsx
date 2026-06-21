import React, { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ResultModal(props) {
  const { ref, targetTime, timeRemaining, onReset } = props;
  const dialog = useRef();
  const formattedTime = (timeRemaining / 1000).toFixed(2);
  const hasLost = timeRemaining <= 0;
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      //* Here you can define your own callback method to be exposed and used it on the parent. As shown in the example below:
      openModal() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      <h2>
        {!hasLost
          ? `🎉 Awsome! Your score: ${score}`
          : `🚨 Time's Up! You Lose. `}
      </h2>
      <p>
        The target time was {targetTime} second{targetTime > 1 ? 's' : ''}.
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedTime} seconds left.</strong>
      </p>
      <form method="dialog">
        <button onClick={onReset}>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal'),
  );
}
