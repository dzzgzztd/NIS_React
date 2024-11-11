import { Component, createRef, ChangeEvent } from 'react';

// Интерфейс для свойств TaskManager'а
interface TaskManagerProps {
    onAddTask: (task: string) => void;
}

// Интерфейс для состояния TaskManager'a
interface TaskManagerState {
    taskInput: string;
}

// Компонент TaskManager
class TaskManager extends Component<TaskManagerProps, TaskManagerState> {
    private inputRef = createRef<HTMLInputElement>();

    // Конструктор для инициализации состояния компонента
    constructor(props: TaskManagerProps) {
        super(props);
        this.state = { taskInput: '' };
    }

    // Обработчик изменений в строке ввода
    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ taskInput: e.target.value });
    };

    // Обработчик добавления задачи
    handleAddTask = () => {
        const { onAddTask } = this.props;
        onAddTask(this.state.taskInput);
        this.setState({ taskInput: '' });
        this.inputRef.current?.focus();
    };

    render() {
        return (
            <div>
                <input
                    ref={this.inputRef}
                    type="text"
                    value={this.state.taskInput}
                    onChange={this.handleChange}
                    placeholder="Введите задачу"
                />
                <button onClick={this.handleAddTask}>Добавить</button>
            </div>
        );
    }
}

export default TaskManager;
