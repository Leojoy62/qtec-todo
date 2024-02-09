import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: priority,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const handleEditChange = (event) => {
    setEditedTaskText(event.target.value);
  };

  const saveEditedTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editedTaskText } : task
      )
    );
    setEditingTaskId(null);
  };

  const priorityColors = {
    low: "#4CAF50",
    medium: "#FFC107",
    high: "#F44336",
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleChange}
        />
        <select value={priority} onChange={handlePriorityChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>
      <div className="task-list">
        <h2>Tasks</h2>
        <p>Total tasks: {tasks.length}</p>
        <p>Completed tasks: {tasks.filter((task) => task.completed).length}</p>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "completed" : ""}
              style={{ borderColor: priorityColors[task.priority] }}
            >
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => saveEditedTask(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <div className="flex">
                    <span>{task.text}</span>
                    <div className="actions">
                      <button onClick={() => toggleTaskCompletion(task.id)}>
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                      <button onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                      <button
                        onClick={() => startEditingTask(task.id, task.text)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
