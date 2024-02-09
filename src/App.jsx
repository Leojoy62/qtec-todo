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
  const [priorityFilter, setPriorityFilter] = useState("all");

  //set tasks in local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleFilterChange = (event) => {
    setPriorityFilter(event.target.value);
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

  //Priority filtering
  const priorityFilteredTaks =
    priorityFilter === "all"
      ? tasks
      : tasks.filter((task) => task.priority === priorityFilter);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-green-600 w-full my-4 flex justify-between px-2">
        <h1 className="my-5 text-center text-white font-bold  text-2xl">
          QTEC Todo
        </h1>
        <div className="self-center">
          <label className="font-semibold">Filter by Priority:</label>
          <select
            className="rounded-lg p-2 bg-green-600 text-white"
            value={priorityFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center mb-3">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleChange}
          className="input input-bordered input-success  h-12"
        />
        <select
          className="ml-2 border-2 border-green-600 rounded-lg h-12"
          value={priority}
          onChange={handlePriorityChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="btn btn-success text-white" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="flex gap-4">
        <h2 className="text-xl font-semibold">Total Tasks: {tasks.length}</h2>
        <div className="flex gap-1">
          <p className="bg-green-600 p-1 text-white rounded">Low</p>
          <p className="bg-yellow-400 p-1 text-white rounded">Med</p>
          <p className="bg-red-600 p-1 text-white rounded">High</p>
        </div>
        <h2 className="text-xl font-semibold">
          Completed Tasks: {tasks.filter((task) => task.completed).length}
        </h2>
      </div>

      <div className="mt-5 w-3/5">
        <ul>
          {priorityFilteredTaks.map((task) => (
            <li
              key={task.id}
              className="border-2 mb-2 px-2 py-3 rounded-lg "
              style={{ borderColor: priorityColors[task.priority] }}
            >
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={handleEditChange}
                  />
                  <button
                    className="btn btn-sm bg-green-600 text-white"
                    onClick={() => saveEditedTask(task.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <div className="flex justify-between">
                      <h1>{task.text}</h1>
                      <p style={{ color: task.completed ? "green" : "red" }}>
                        {task.completed ? "Completed" : "Incomplete"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm bg-green-600 text-white"
                        onClick={() => toggleTaskCompletion(task.id)}
                      >
                        {task.completed ? "Incomplete" : "Complete"}
                      </button>
                      <button
                        className="btn btn-sm bg-red-600 text-white"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm bg-yellow-500 text-white"
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
{
  /* <div className="flex">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleChange}
          className="input input-bordered input-success  h-12"
        />
        <select
          className="ml-2 border-2 border-green-600 rounded-lg h-12"
          value={priority}
          onChange={handlePriorityChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex">
          <label>Filter by Priority:</label>
          <select
            className="ml-2 border-2 border-green-600 rounded-lg h-12"
            value={priorityFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div> */
}
