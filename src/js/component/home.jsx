import React, { useState, useEffect } from "react";
import Counter from "./counter.jsx";

const Home = () => {
  const [countdownValue, setCountdownValue] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [alertNumber, setAlertNumber] = useState("");
  const [newAlertNumber, setNewAlertNumber] = useState("");

  const handleCountdownChange = (event) => {
    const newValue = event.target.value;
  
    if (newValue === "") {
      setCountdownValue(1);
      setInputValue("");
    } else if (/^\d{0,6}$/.test(newValue)) {
      setInputValue(newValue);
      setCountdownValue(parseInt(newValue, 10));
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleRestart = () => {
    setIsPaused(false);
    setCountdownValue(1);
    setInputValue("");
  };

  const handleAlertNumberChange = (event) => {
    const newAlertNumber = event.target.value;
  
    // Limitar a números y máximo 6 dígitos
    if (/^\d{0,6}$/.test(newAlertNumber)) {
      setNewAlertNumber(newAlertNumber);
    }
  };

  const applyAlertNumberChange = () => {
    setAlertNumber(newAlertNumber);
  };

  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setCountdownValue((prevCountdown) => {
          if (prevCountdown === parseInt(alertNumber, 10)) {
            alert(`¡El contador alcanzó ${alertNumber}!`);
          }

          if (prevCountdown > 0 && inputValue !== "") {
            return prevCountdown - 1;
          } else {
            // Reiniciar el input si llega a 0
            setInputValue("");
            return prevCountdown + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPaused, inputValue, alertNumber]);

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
      <button onClick={handlePause}>Pausar</button>
      <button onClick={handleResume}>Reanudar</button>
      <button onClick={handleRestart}>Reiniciar</button>

      <div>
        <label>Establecer número de alerta:</label>
        <input
          type="text"
          placeholder="Número de alerta"
          value={newAlertNumber}
          onChange={handleAlertNumberChange}
        />
        <button onClick={applyAlertNumberChange}>Aplicar Cambio</button>
      </div>
    </div>
  );
};

export default Home;
