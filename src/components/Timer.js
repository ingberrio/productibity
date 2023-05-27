import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(1500); // 25 minutos en segundos
  const [timerRunning, setTimerRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const beepSound = useRef(new Audio('../assets/audio/mixkit-alert-bells-echo-765.wav')).current;
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);

  useEffect(() => {
    if (timerRunning) {
      startTimeRef.current = Date.now() - elapsedTimeRef.current;
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const remainingSeconds = Math.max(0, 1500 - Math.floor(elapsedTime / 1000));
        setTimeRemaining(remainingSeconds);
        elapsedTimeRef.current = elapsedTime;

        if (remainingSeconds === 0) {
          beepSound.play();
          if (pomodoroCount % 2 === 0) {
            setTimeRemaining(300); // Iniciar temporizador de 5 minutos
          } else {
            setTimeRemaining(1500); // Reiniciar temporizador a 25 minutos
          }
          setPomodoroCount(prevCount => prevCount + 1);
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [timerRunning, beepSound, pomodoroCount]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    startTimeRef.current = null;
    elapsedTimeRef.current = 0;
    setTimeRemaining(1500);
    setPomodoroCount(0);
    setTimerRunning(false);
  };

  const formattedTime = `${Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0')}:${(timeRemaining % 60)
    .toString()
    .padStart(2, '0')}`;

  const progressBarWidth = `${(timeRemaining / 1500) * 100}%`; // 1500 segundos = 25 minutos

  return (
    <div className="timer-container">
      <div className="timer">
        <div className="timer-label">{formattedTime}</div>
        <div className="timer-bar" style={{ transform: `scaleX(${progressBarWidth})` }}></div>
      </div>
      <div className="timer-controls">
        <button className="start-btn" onClick={timerRunning ? pauseTimer : startTimer}>
          {timerRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="reset-btn" onClick={resetTimer}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Timer;
