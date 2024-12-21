import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/styles.css';

const TaskPage = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${user}`)) || [];
    setTasks(storedTasks);
  }, [user]);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user}`, JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (newTask) {
      const updatedTasks = [...tasks, { title: newTask, completed: false }];
      saveTasks(updatedTasks);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    saveTasks(updatedTasks);
  };

  return (
    <div className="task-container">
      <h1>{user}'s Tasks</h1>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? 'completed' : ''}
          >
            <span onClick={() => toggleTaskCompletion(index)}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
