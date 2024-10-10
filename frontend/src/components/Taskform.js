import React, { useState } from 'react'

function Taskform({ createTask }) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmt = (e) => {
        e.preventDefault();
        if(title, dueDate)
        {
            const newTask = {title, dueDate};
            createTask(newTask);
            setTitle('');
            setDueDate('');
        }
    }

    return (
        <form onSubmit={handleSubmt}>
            <input
                type='text'
                placeholder='Task Title'
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                required
            />

            <input
                type='date'
                placeholder='type dueDate'
                value={dueDate}
                onChange={(e) => { setDueDate(e.target.value) }}
                required
            />

            <button type='submit'>Add Task</button>
        </form>
    )
}

export default Taskform