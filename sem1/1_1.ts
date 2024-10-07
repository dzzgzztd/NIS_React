// Перечисление для представленияя пола
enum Gender {
    MALE = 'Мужской',
    FEMALE = 'Женский',
}

// Функция для описания человека
// Принимает имя (name), возраст (age), список хобби (hobbies) и пол (gender)
// Возвращает строку с информацией о человеке
function describePerson(name: string, age: number, hobbies: string[], gender: Gender) {
    return `${name}, ${age} лет, любит: ${hobbies.join(', ')}. Пол: ${gender}`
}

// Вызов функции с параметрами из примера
console.log(describePerson('Денис', 25, ['чтение', 'спорт'], Gender.MALE))
