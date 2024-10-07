// Функция processValue принимает значение типа string, number или boolean
// Возвращает строку капсом, квадрат числа или обратное значение в зависимости от типа переданного параметра
function processValue(value: string | number | boolean): string | number | boolean {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (typeof value === 'number') {
        return value * value;
    } else return !value;
}

// Вызовы функции для строки, числа и булевого значения
console.log(processValue("hello"));
console.log(processValue(3));
console.log(processValue(true));