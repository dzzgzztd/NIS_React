import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectUsers} from "../slices/UsersSlice";

// Компонент для отображения списка пользователей
const UserList: React.FC = () => {
    const users = useSelector(selectUsers); // Получаем список пользователей из состояния

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">User List</h1>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id} className="p-2 border rounded-md">
                        <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline">
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;