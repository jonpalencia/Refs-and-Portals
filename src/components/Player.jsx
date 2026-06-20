import { useState, useRef } from 'react';

export default function Player() {
  const playerName = useRef(); // Use the useRef and attach it to the elements so you can get the actual element itself to do manipulation or get the values for that element
  const [inputName, setInputName] = useState('');

  function handleClick() {
    setInputName(prev => (prev = playerName.current.value));
  }

  return (
    <section id="player">
      <h2>Welcome {inputName ? `${inputName}!` : 'User,'} </h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
