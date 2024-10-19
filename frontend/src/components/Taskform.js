import React, { useState } from 'react';

function Taskform({ createTask }) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && dueDate) {
            const newTask = { title, dueDate };
            createTask(newTask);
            setTitle('');
            setDueDate('');
        }
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Task Title'
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                required
                style={styles.input}
            />

            <input
                type='date'
                placeholder='Type Due Date'
                value={dueDate}
                onChange={(e) => { setDueDate(e.target.value) }}
                required
                style={styles.input}
            />

            <button type='submit' style={styles.button}>Add Task</button>
        </form>
    );
}

// Responsive styles
const styles = {
    form: {
      
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: '20vh',
        padding: '10px', // Add padding for better spacing
        boxSizing: 'border-box', // Include padding in width/height calculations
    },
    input: {
        padding: '4px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '80%', // Full width for responsiveness
        marginBottom: '10px', // Space between inputs
        fontSize: '1rem', // Adjust font size
    },
    button: {
        width: '50%', // Full width for responsiveness
        minWidth: '150px',
        fontSize: '1rem', // Adjust font size
        padding: '4px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#ab279a',
        color: 'White',
        fontWeight: 'bold',
        cursor: 'pointer', // Change cursor to pointer for button
    }
};

export default Taskform;
