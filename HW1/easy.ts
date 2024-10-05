export type MyPick<T, K extends keyof (T)> = { [P in K]: T[P] };

export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

export type Unshift<ArrayType extends any[], Element> = [Element, ...ArrayType];

export type MyExclude<T, U> = { [P in keyof (T) as P extends U ? never : P]: P };