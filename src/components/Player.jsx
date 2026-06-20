import { useState } from 'react';

export default function Player() {
  const [inputName, setInputName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleChangeInput(e) {
    setSubmitted(prev => (prev = false));
    const nameResult = e.target.value;
    setInputName(prevName => (prevName = nameResult));
    console.log(nameResult);
  }

  function handleClick() {
    setSubmitted(prev => (prev = true));
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? `${inputName}!` : 'User, '} </h2>
      <p>
        <input type="text" onChange={handleChangeInput} value={inputName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
