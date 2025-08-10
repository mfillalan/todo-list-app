'use client';

import { Task } from "@/types/Task";
import { useEffect, useState } from "react"


interface TaskListProps {
}

const TaskList: React.FunctionComponent<TaskListProps> = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch tasks');
                return res.json();
            })
            .then(data => setTasks(data))
            .catch(err => setError(err.message));
    }, []);
    
    if (error) {
        return <div className="text-red-500 text-center">Error: {error}</div>
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            {tasks.map(task => (
                <div key={task.id} className="p-4 border-b flex justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-gray-600">{task.description}</p>
                    </div>
                    <div>
                        <button className="text-blue-500 mr-2">Edit</button>
                        <button className="text-red-500">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );

};

export default TaskList;