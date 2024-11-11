import React from 'react';
import TaskItem from './TaskItem';
import {Task} from './Task';

// Интерфейс пропсов для списка задач
interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (taskId: number) => void;
    onToggleTaskCompletion: (taskId: number) => void;
}

// Компонент списка задач
const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleTaskCompletion }) => {
    return (
        <ul>
            {tasks.map((task: Task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDeleteTask={onDeleteTask}
                    onToggleTaskCompletion={onToggleTaskCompletion}
                />
            ))}
        </ul>
    );
};

export default TaskList;
