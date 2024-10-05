// Дополнительный тип для перевода строковых типов из snake_case в camelCase
export type SnakeToCamel<S extends string> =
    S extends `${infer First}_${infer Second}`
        ? `${First}${Capitalize<Second>}`
        : S;

export type Camelize<ObjectType> = {
    [P in keyof (ObjectType) as SnakeToCamel<P & string>]:
    ObjectType[P] extends object
        ? Camelize<ObjectType[P]>
        : ObjectType[P];
};

export type DeepPick<T, Paths> = Paths extends keyof (T)
    ? { [P in Paths]: T[P] }
    : Paths extends `${infer Key}.${infer Rest}`
        ? Key extends keyof (T)
            ? { [K in Key]: DeepPick<T[K], Rest> }
            : never
        : never;
