import React, { useState } from "react";
import { AbilityContext } from "./AbilityContext";
import { defineAbilityFor } from "./ability";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [role, setRole] = useState("user");
  const ability = defineAbilityFor(role);

  const addTask = () => {
    if (ability.can("create", "Task") && newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    if (ability.can("delete", "Task")) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  return (
    <AbilityContext.Provider value={ability}>
      <div className="App">
        <h1>Task Manager using CASL</h1>
        <div className="role-selector">
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>
            <FaPlus /> Add Task
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              {ability.can("delete", "Task") && (
                <button onClick={() => deleteTask(index)}>
                  <FaTrashAlt /> Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </AbilityContext.Provider>
  );
}

export default App;
