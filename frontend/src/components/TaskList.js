import React from 'react';
import EditTaskForm from './EditTaskForm';


function TaskList({ tasks, updateTask, deleteTask, updateTaskDetails, editingTask, setEditingTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {editingTask === task._id ? (
            <EditTaskForm task={task} updateTaskDetails={updateTaskDetails} />
          ) : (
            <>
              <span style={{ textDecoration: task.completed ? 'line-through' : '' }}>
                {task.title} - {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <button onClick={() => { updateTask(task._id, { completed: !task.completed }) }}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => setEditingTask(task._id)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </>
          )
          }
        </li >
      ))
      }
    </ul >
  )
}

export default TaskList