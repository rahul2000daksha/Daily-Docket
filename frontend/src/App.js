import { useEffect, useState } from 'react';
import './app.css';
import Taskform from './components/Taskform';
import TaskList from './components/TaskList';
import axios from 'axios';




function App() {

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const getTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);

    } catch (error) {
      console.error('Error Fetching Tasks', error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);



  // Create new Task
  const createTask = async (task) => {
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error('Error Creating New Task', error);
    }
  }

  // Updating Task

  const updateTask = async (id, updatedTask) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  const updateTaskDetails = async (updatedTask) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    setEditingTask(null); 
  }

  //Deleting Task

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`)
      setTasks(tasks.filter((task) => (task._id !== id)));
    } catch (error) {

    }
  }

  return (
    <div>
      <h1> Daily Docket</h1>
      <Taskform createTask={createTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} updateTaskDetails ={updateTaskDetails} editingTask={editingTask} setEditingTask ={setEditingTask} />
    </div>
  );
}

export default App;
