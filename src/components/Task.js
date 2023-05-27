import React, { useState } from 'react';

const Task = () => {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (taskInput.trim() !== '') {
      setTaskList([...taskList, { name: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
  };

  return (
    <div className="task-container">
      <h2 className="logo">Tareas</h2>
      <br />
      <form className="task-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="task-input"
          placeholder="Adicione una tarea"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button type="submit" className="add-task-btn">
          +
        </button>
      </form>
      <ul className="task-list">
        {taskList.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <span className={task.completed ? 'completed' : ''}>{task.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
