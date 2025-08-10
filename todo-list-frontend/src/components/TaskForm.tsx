'use client';

import { Task } from "@/types/Task";
import { useState } from "react";


interface TaskFormProps {

}

const TaskForm: React.FunctionComponent<TaskFormProps> = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: Omit<Task, 'id' | 'isCompleted'> = { title, description };
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });
            if (!res.ok) throw new Error('Failed to create task');
            setTitle('');
            setDescription('');
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-x1 font-bold mb-4">Add Task</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Task Title"
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="w-full p-2 mb-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;