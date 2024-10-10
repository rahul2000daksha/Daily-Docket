import React, { useState } from 'react';
import axios from 'axios';

export default function EditTaskForm({ task, updateTaskDetails }) {
    const [title, setTitle] = useState(task.title);
    const [dueDate, setDueDate] = useState(task.dueDate);


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
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
            />
            <input
                type="date"
                value={dueDate ? dueDate.slice(0, 10) : ''} // Format date for input
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
            />
            <button onClick={handleEdit}>Save Changes</button>
        </div>
    )
}
