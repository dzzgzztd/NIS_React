import React, {useState, useEffect} from 'react';
import './App.css';

const UserForm: React.FC = () => {
    // Состояния для значений полей формы
    const [values, setValues] = useState({name: '', email: '', password: ''});

    // Состояния для ошибок валидации
    const [errors, setErrors] = useState({name: '', email: '', password: ''});

    // Состояния для отслеживания того, тронуты ли поля
    const [touched, setTouched] = useState({name: false, email: false, password: false});

    // Флаг, показывающий, валидна ли форма
    const [isFormValid, setIsFormValid] = useState(false);

    // Функция для валидации конкретного поля
    const validate = (field: keyof typeof values, value: string): string => {
        switch (field) {
            case 'name':
                return value.length >= 3 ? '' : 'Имя должно содержать хотя бы 3 символа'; // Имя должно быть длиной минимум 3 символа
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Введите правильный email'; // Проверка email на валидность
            case 'password':
                return value.length >= 6 ? '' : 'Пароль должен быть не менее 6 символов'; // Пароль должен быть длиной минимум 6 символов
            default:
                return '';
        }
    };

    // Обработчик изменения значений полей
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        // Обновляем значение поля
        setValues((prev) => ({...prev, [name]: value}));

        // Проверяем валидность поля
        setErrors((prev) => ({...prev, [name]: validate(name as keyof typeof values, value)}));
    };

    // Обработчик потери фокуса (blur)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name} = e.target;

        // Помечаем поле как "тронутое"
        setTouched((prev) => ({...prev, [name]: true}));

        // Проверяем валидность поля при потере фокуса
        setErrors((prev) => ({
            ...prev,
            [name]: validate(name as keyof typeof values, values[name as keyof typeof values]),
        }));
    };

    // Проверка валидности всей формы при изменении значений или ошибок
    useEffect(() => {
        const noErrors = Object.values(errors).every((error) => error === ''); // Проверяем, что нет ошибок
        const allFieldsFilled = Object.values(values).every((value) => value !== ''); // Проверяем, что все поля заполнены
        setIsFormValid(noErrors && allFieldsFilled); // Устанавливаем состояние валидности формы
    }, [errors, values]);

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращаем стандартное поведение браузера

        // Помечаем все поля как "тронутые"
        setTouched({name: true, email: true, password: true});

        // Проверяем ошибки перед отправкой
        const newErrors = {
            name: validate('name', values.name),
            email: validate('email', values.email),
            password: validate('password', values.password),
        };
        setErrors(newErrors);

        // Если ошибок нет, выводим сообщение об успешной отправке
        if (Object.values(newErrors).every((error) => error === '')) {
            alert('Форма успешно отправлена');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Поле для имени */}
            <div>
                <label htmlFor="name">Имя</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {/* Вывод ошибки, если поле тронуто и есть ошибка */}
                {touched.name && errors.name && <small style={{color: 'red'}}>{errors.name}</small>}
            </div>

            {/* Поле для email */}
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {/* Вывод ошибки, если поле тронуто и есть ошибка */}
                {touched.email && errors.email && <small style={{color: 'red'}}>{errors.email}</small>}
            </div>

            {/* Поле для пароля */}
            <div>
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {/* Вывод ошибки, если поле тронуто и есть ошибка */}
                {touched.password && errors.password && (
                    <small style={{color: 'red'}}>{errors.password}</small>
                )}
            </div>

            {/* Кнопка отправки */}
            <button type="submit" disabled={!isFormValid}>
                Отправить
            </button>
        </form>
    );
};

export default UserForm;
