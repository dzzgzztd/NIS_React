import React, { useEffect, useState } from 'react';

function getMessageWordForm(num: number): string {
    const mod10 = num % 10;
    const mod100 = num % 100;

    if (mod10 === 1 && mod100 !== 11) {
        return 'сообщение';
    } else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
        return 'сообщения';
    } else {
        return 'сообщений';
    }
}

const MessagesInfo: React.FC = () => {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        // Генерируем случайное число от 1 до 10
        const random = Math.floor(Math.random() * 10) + 1;
        setCount(random);

        // Фиксируем текущую дату/время
        setTime(new Date());
    }, []);

    // Определяем нужную форму слова "сообщение"
    const messageWord = getMessageWordForm(count);
    // Определяем нужную форму слова "непрочитанное"
    const adjective = count === 1 ? 'непрочитанное' : 'непрочитанных';

    // Форматируем дату
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <div>
            У вас {count} {adjective} {messageWord} (сегодня {dateFormatter.format(time)})
        </div>
    );
};

export default MessagesInfo;
