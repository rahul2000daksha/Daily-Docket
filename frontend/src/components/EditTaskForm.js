import React, { useState } from 'react';
import axios from 'axios';

export default function EditTaskForm({ task, updateTaskDetails, isMobile, index }) {

    const [title, setTitle] = useState(task.title);
    const [dueDate, setDueDate] = useState(task.dueDate);

    const style1 = {
        marginTop: '0px',
        width: '10%',
        minWidth: '120px',
        fontSize: '0.8vw',
        textAlign: 'center',
        padding: '5px 10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#ffb600',
        color: 'black',
        fontWeight: 'bold'
    }
    const style2 = {
        marginTop: '0px',
        width: '50%',
        fontSize: '3vw',
        textAlign: 'center',
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#ffb600',
        color: 'black',
        fontWeight: 'bold'
    }

    const inputStyle = {
        padding: '4px',
        borderRadius: '4px',
        border: '1px solid red',
        width: '80%', // Full width for responsiveness
        marginBottom: '10px', // Space between inputs
        fontSize: '1rem',
    }


    const handleEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
                title,
                dueDate,
                completed: task.completed, // Maintain current completed status
            });
            updateTaskDetails(response.data); // Update the task list in the parent component
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div style={{ padding: '10px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <div style={{width:'100%',marginLeft: isMobile ? '8px' : '20px'}}>
                <span> {index + 1 + ').'} </span>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    style={inputStyle}

                />
            </div>
            <input
                type="date"
                value={dueDate ? dueDate.slice(0, 10) : ''} // Format date for input
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
                style={inputStyle}

            />
            <button onClick={handleEdit} style={isMobile ? style2 : style1}>Save Changes</button>
        </div>
    )
}
