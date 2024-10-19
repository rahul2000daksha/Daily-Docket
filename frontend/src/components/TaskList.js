import React from 'react';
import EditTaskForm from './EditTaskForm';

function TaskList({ tasks, updateTask, deleteTask, updateTaskDetails, editingTask, setEditingTask }) {
  // Determine the screen width for responsive styles
  const isMobile = window.innerWidth <= 600;

  return (
    <div
      className='TaskList'
      style={{
        marginTop: '0vh',
        width: '100%',
        maxHeight: '50vh',
        overflowY: 'scroll', // Only vertical scrolling
        overflowX: 'hidden', // Prevent horizontal scrolling
        scrollbarWidth: 'thin', // For Firefox
        scrollbarColor: '#ccc transparent' // For Firefox
      }}
    >
      <ol style={{ padding: 0, margin: 0 }}>
        {tasks.map((task,index) => (
          <li
            key={task._id}
            style={{
              color: 'white',
              padding: '10px',
              fontSize: isMobile ? '4vw' : '1vw', // Mobile: Larger font, Desktop: Original font size
              display: 'flex',
              flexDirection: 'column', // Stack elements vertically for both mobile and desktop
              alignItems: 'flex-start', // Align items to the start on both mobile and desktop
              justifyContent: 'space-between',
              width: '100%', // Ensure full width on both mobile and desktop
              boxSizing: 'border-box',
            }}
          >
            {editingTask === task._id ? (
              <EditTaskForm task={task} updateTaskDetails={updateTaskDetails} isMobile={isMobile} index={index} />
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : '',
                    flex: '9',
                    fontSize: isMobile ? '4vw' : '1vw', // Mobile: Larger font size
                    wordBreak: 'break-word', // Ensure long titles wrap correctly
                    maxWidth: '100%', // Prevent task title from overflowing
                    marginBottom: '10px', // Space between task title and buttons
                  }}
                > 
                
                 {index + 1 + ').'} {task.title} - {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <div
                  style={{
                    flex: '3',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row', // Stack buttons on mobile, row on desktop
                    alignItems: 'center',
                    justifyContent: isMobile ? 'space-evenly' : 'space-evenly', // Align buttons properly
                    gap: isMobile ? '10px' : '10px', // Adjust gap between buttons on desktop and mobile
                    width: '100%', // Ensure full width for buttons
                  }}
                >
                  <button
                    onClick={() => updateTask(task._id, { completed: !task.completed })}
                    style={{
                      width: isMobile ? '100%' : '25%', // Full width on mobile, auto on desktop
                      fontSize: isMobile ? '3.5vw' : '0.8vw', // Adjust font size for mobile
                      padding: isMobile ? '2vw' : '0.5vw',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: task.completed ? '#818995' : '#0ff308',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => setEditingTask(task._id)}
                    style={{
                      width: isMobile ? '100%' : '25%', // Full width on mobile, auto on desktop
                      fontSize: isMobile ? '3.5vw' : '0.8vw', // Adjust font size for mobile
                      padding: isMobile ? '2vw' : '0.5vw',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#ab279a',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    style={{
                      width: isMobile ? '100%' : '25%', // Full width on mobile, auto on desktop
                      fontSize: isMobile ? '3.5vw' : '0.8vw', // Adjust font size for mobile
                      padding: isMobile ? '2vw' : '0.5vw',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#fe2423',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TaskList;
