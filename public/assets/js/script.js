// Variables globales
let timerInterval;
let timerRunning = false;
let timeRemaining = 1500; // 25 minutos en segundos
let pomodoroCount = 0;

// Objeto de creado para reproducir el beep cuando finalice el contador
var beep = new Audio("assets/audio/mixkit-alert-bells-echo-765.wav"); 

// Selección de elementos del DOM
const timerBar = document.querySelector('.timer-bar');
const timerLabel = document.querySelector('.timer-label');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const taskForm = document.querySelector('.task-form');
const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');

// Event listener para el formulario de tareas
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskName = taskInput.value;
  if (taskName !== '') {
    addTask(taskName);
    taskInput.value = '';
  }
});

// Event listener para el botón de inicio
startBtn.addEventListener('click', function() {
  if (timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

// Event listener para el botón de reinicio
resetBtn.addEventListener('click', resetTimer);

// Función para agregar una tarea a la lista
function addTask(taskName) {
  const taskItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const br = document.createElement('br');
  checkbox.type = 'checkbox';
  taskItem.textContent = taskName;
  label.textContent = taskName;
  
  taskList.appendChild(checkbox);
  taskList.appendChild(label);
  taskList.appendChild(br);
}

// Función para iniciar el temporizador
function startTimer() {
  timerRunning = true;
  startBtn.textContent = 'Pausar';
  timerInterval = setInterval(updateTimer, 1000);
}

// Función para pausar el temporizador
function pauseTimer() {
  timerRunning = false;
  startBtn.textContent = 'Continuar';
  clearInterval(timerInterval);
}

// Función para reiniciar el temporizador
function resetTimer() {
  timerRunning = false;
  startBtn.textContent = 'Iniciar';
  clearInterval(timerInterval);
  timeRemaining = 1500; // Reiniciar a 25 minutos en segundos
  updateTimerDisplay();
}

// Función para actualizar el temporizador
// Función para actualizar el temporizador
function updateTimer() {
  timeRemaining--;
  if (timeRemaining >= 0) {
    updateTimerDisplay();
    if (timeRemaining === 0) {
      if (pomodoroCount % 2 === 0) {
        beep.play();
      } else if (pomodoroCount % 2 !== 0 && timeRemaining === 0) {
        beep.play();
      }
    }
  } else {
    clearInterval(timerInterval);
    timerRunning = false;
    startBtn.textContent = 'Iniciar';
    if (pomodoroCount % 2 === 0) {
      // Iniciar temporizador de 5 minutos
      timeRemaining = 300;
      updateTimerDisplay();
      beep.play();
      pomodoroCount++;
    } else {
      // Reiniciar temporizador a 25 minutos
      timeRemaining = 1500;
      updateTimerDisplay();
      beep.play();
      pomodoroCount++;
    }
    if (!timerRunning) {
      startTimer();
    }
  }
}


// Función para actualizar la visualización del temporizador en la interfaz
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
  timerLabel.textContent = formattedTime;
  const progressBarWidth = (timeRemaining / 1500) * 100; // 1500 segundos = 25 minutos
  timerBar.style.transform = `scaleX(${progressBarWidth / 100})`;
}

// Función auxiliar para agregar ceros a los dígitos individuales del temporizador
function padZero(num) {
  return num.toString().padStart(2, '0');
}

