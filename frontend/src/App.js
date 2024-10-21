import { useEffect, useState } from 'react';
import Taskform from './components/Taskform';
import TaskList from './components/TaskList';
import axios from 'axios';
import myImage from './imges/bg.jpg';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const getTasks = async () => {
    try {
      const res = await axios.get('https://daily-docket.onrender.com/api/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error Fetching Tasks', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (task) => {
    try {
      const res = await axios.post('https://daily-docket.onrender.com/api/tasks', task);
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error('Error Creating New Task', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const res = await axios.put(`https://daily-docket.onrender.com/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const updateTaskDetails = async (updatedTask) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    setEditingTask(null);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://daily-docket.onrender.com/api/tasks/${id}`);
      setTasks(tasks.filter((task) => (task._id !== id)));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App" style={{
      margin: 0,
      padding: 0,
      backgroundImage: `url(${myImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative'
    }}>
      <style>{`
        .heading {
          color: white;
          font-size: clamp(8vw, 5vw, 3rem);
          position: absolute;
          z-index: 999;
          text-align: center;
          width: 100%;
          top: 8%;
          transform: translateY(-100%);
          text-decoration: underline;
            text-decoration-color: yellow;
            text-decoration-thickness: 4px;
            text-underline-offset: 0.2em;
        }

        .task-container {
          z-index: 2;
          width: 80%;
          max-width: 400px;
          background-color: rgba(0, 0, 0, 0.7);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 20%;
          border-radius: 10px;
        }

        @media (max-width: 768px) {
          .heading {
            font-size: 8vw;
            top: 10%;
          }

          .TaskList-container {
            max-height: 40vh;
            width: 100%;
          }

        }

        @media (max-width: 480px) {
          .heading {
            font-size: 15vw;
            top: 12%;
            color: #ffb600;
            text-decoration: underline;
            text-decoration-color: yellow;
            text-decoration-thickness: 4px;
            text-underline-offset: 0.2em;
          }

          .TaskList-container {
            max-height: 30vh;
          }
        }
      `}</style>

      <h1 className="heading">Daily Docket</h1>
      
      <div className="task-container">
        <Taskform createTask={createTask} />
        <TaskList className="TaskList-container" tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} updateTaskDetails={updateTaskDetails} editingTask={editingTask} setEditingTask={setEditingTask} />
      </div>
    </div>
  );
}

export default App;
