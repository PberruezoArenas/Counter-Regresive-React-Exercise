// Componente home.jsx
import React, { useState, useEffect } from "react";
import Counter from "./counter.jsx";

const Home = () => {
  const [countdownValue, setCountdownValue] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const handleCountdownChange = (event) => {
    const newValue = event.target.value;

    // Permitimos que el input esté vacío para reiniciar el contador hacia adelante
    if (newValue === "") {
      setCountdownValue(1);
      setInputValue("");
    } else if (/^\d{0,6}$/.test(newValue)) {
      setInputValue(newValue);
      setCountdownValue(parseInt(newValue, 10));
    }
  };

  useEffect(() => {
    let intervalId;

    if (countdownValue > 0 && inputValue !== "") {
      intervalId = setInterval(() => {
        setCountdownValue((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      intervalId = setInterval(() => {
        setCountdownValue((prevCountdown) => prevCountdown + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [countdownValue, inputValue]);

  return (
    <div className="text-center">
      <input
        type="text"
        placeholder="Inserta un número"
        value={inputValue}
        onChange={handleCountdownChange}
      />
      <h1>
        <Counter countdownValue={countdownValue} />
      </h1>
    </div>
  );
};

export default Home;
