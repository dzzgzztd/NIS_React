import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";
import {selectUserById, updateUserName} from "../slices/UsersSlice";

// Компонент для отображения и редактирования данных пользователя
const UserDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>(); // Получаем id пользователя из URL
    const userId = parseInt(id!, 10); // Преобразуем id в число
    const user = useSelector((state: any) => selectUserById(state, userId)); // Получаем пользователя по id
    const [name, setName] = useState(user ? user.name : ""); // Храним имя пользователя в state
    const dispatch = useDispatch(); // Хук для работы с dispatch

    // Если пользователь не найден, показываем сообщение
    if (!user) {
        return (
            <div className="p-4">
                <h1 className="text-xl font-bold">User Not Found</h1>
                <Link to="/" className="text-blue-500 hover:underline">Back to User List</Link>
            </div>
        );
    }

    // Обработчик для обновления имени пользователя
    const handleUpdate = () => {
        dispatch(updateUserName({id: userId, name}));
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">User Details</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Name:
                </label>
                <input
                    id="name"
                    type="text"
                    className="p-2 border rounded-md w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleUpdate}
            >
                Update Name
            </button>
            <div className="mt-4">
                <Link to="/" className="text-blue-500 hover:underline back-link">Back to User List</Link>
            </div>
        </div>
    );
};

export default UserDetails;
