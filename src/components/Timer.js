import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(1500); // 25 minutos en segundos
  const [timerRunning, setTimerRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [intervalType, setIntervalType] = useState('work'); // Tipo de intervalo: trabajo o pausa
  const beepSound = useRef(new Audio('../assets/audio/mixkit-alert-bells-echo-765.wav')).current;
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);
  const initialTimeRef = useRef(1500); // Tiempo inicial del intervalo

  useEffect(() => {
    if (timerRunning) {
      startTimeRef.current = Date.now() - elapsedTimeRef.current;
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const remainingSeconds = Math.max(0, initialTimeRef.current - Math.floor(elapsedTime / 1000));
        setTimeRemaining(remainingSeconds);
        elapsedTimeRef.current = elapsedTime;

        if (remainingSeconds === 0) {
          beepSound.play();
          if (intervalType === 'work') {
            // Finalizó un intervalo de trabajo
            setPomodoroCount(prevCount => prevCount + 1);
            if (pomodoroCount % 4 === 3) {
              // Después de cuatro intervalos de trabajo, tomar una pausa larga
              setTimeRemaining(900); // 15 minutos en segundos
              initialTimeRef.current = 900; // Actualizar el tiempo inicial
              setIntervalType('longBreak');
            } else {
              // Tomar una pausa corta
              setTimeRemaining(300); // 5 minutos en segundos
              initialTimeRef.current = 300; // Actualizar el tiempo inicial
              setIntervalType('shortBreak');
            }
          } else {
            // Finalizó un intervalo de pausa
            setTimeRemaining(1500); // Reiniciar temporizador a 25 minutos
            initialTimeRef.current = 1500; // Actualizar el tiempo inicial
            setIntervalType('work');
          }
          startTimeRef.current = Date.now(); // Reiniciar el tiempo de inicio
          elapsedTimeRef.current = 0; // Reiniciar el tiempo transcurrido
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [timerRunning, beepSound, pomodoroCount, intervalType]);

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
    initialTimeRef.current = 1500;
    setPomodoroCount(0);
    setIntervalType('work');
    setTimerRunning(false);
  };

  const formattedTime = `${Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0')}:${(timeRemaining % 60)
    .toString()
    .padStart(2, '0')}`;

  const progressBarWidth = `${(timeRemaining / (intervalType === 'work' ? 1500 : intervalType === 'shortBreak' ? 300 : 900)) * 100}%`; // El tiempo total del intervalo depende del tipo de pausa

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
