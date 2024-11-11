import React, { useState, useRef } from 'react';
import TaskManager from './components/TaskManager';
import TaskList from './components/TaskList';
import {Task} from './components/Task'
import './styles/App.css';

const App: React.FC = () => {
    // Состояние для хранения списка задач
    const [tasks, setTasks] = useState<Task[]>([]);
    // Состояние для последней добавленной задачи
    const [currentTask, setCurrentTask] = useState<string | null>(null);
    // Ссылка на предыдущую задачу
    const prevTask = useRef<string | null>(null);

    // Обработчик добавления новой задачи
    const addTask = (task: string) => {
        if (task) {
            const newTask: Task = { id: Date.now(), text: task, completed: false };
            setTasks([newTask, ...tasks]);
            setCurrentTask(task);
            prevTask.current = currentTask;
        }
    };

    // Обработчик удаления задачи
    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    // Обработчик выполнения задачи
    const toggleTaskCompletion = (taskId: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="app">
            <h1>Список задач</h1>
            <TaskManager onAddTask={addTask} />
            <TaskList
                tasks={tasks}
                onDeleteTask={deleteTask}
                onToggleTaskCompletion={toggleTaskCompletion}
            />
            <div className="task-info">
                <p>Текущая задача: {currentTask || 'Нет'}</p>
                <p>Предыдущая задача: {prevTask.current || 'Нет'}</p>
            </div>
        </div>
    );
};

export default App;
