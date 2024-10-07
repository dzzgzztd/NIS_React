// Интерфейс, определяющий права доступа
interface myPermissions {
    canRead: boolean;
    canEdit: boolean;
    canDelete: boolean;
}

// Тип, описывающий права для каждой роли
type RolePermissions = {
    admin: myPermissions;
    user: myPermissions;
    guest: myPermissions;
};

// Создаем объект, задающий начальные права
const permissions: RolePermissions = {
    admin: { canRead: true, canEdit: true, canDelete: true },
    user: { canRead: true, canEdit: false, canDelete: false },
    guest: { canRead: true, canEdit: false, canDelete: false }
};

// Функция для изменения прав
function setPermissions(role: keyof RolePermissions, newPermissions: myPermissions): void {
    if (role === 'guest') {
        console.log(`Права для роли 'guest' не могут быть изменены.`);
        return;
    }
    permissions[role] = newPermissions;
}

// Выведем начальные права и попробуем обновить права ролей user и guest
console.log('Исходные права:', permissions);

setPermissions('user', { canRead: true, canEdit: true, canDelete: false });
console.log('Обновленные права для пользователя:', permissions.user);

setPermissions('guest', { canRead: true, canEdit: true, canDelete: true });
console.log('Права для гостя после попытки изменения:', permissions.guest);
