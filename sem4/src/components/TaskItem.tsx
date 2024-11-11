import React from 'react';
import {Task} from './Task';

// Интерфейс пропсов задачи
interface TaskItemProps {
    task: Task;
    onDeleteTask: (taskId: number) => void;
    onToggleTaskCompletion: (taskId: number) => void;
}

// Компонент задачи
const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask, onToggleTaskCompletion }) => {
    const handleDelete = () => onDeleteTask(task.id);
    const handleToggle = () => onToggleTaskCompletion(task.id);

    return (
        <li>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle()}
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
            </span>
            <button className="delete-button" onClick={() => handleDelete()}>
                🗑
            </button>
        </li>
    );
};

export default TaskItem;
