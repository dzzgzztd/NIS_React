export type DeepPartial<T> = T extends object ? {
    [P in keyof (T)]?: DeepPartial<T[P]>;
} : T;

export type MyCapitalize<T extends string> =
    T extends `${infer First}${infer Rest}`
        ? `${Uppercase<First>}${Rest}`
        : T;

export type DeepMutable<T> = T extends object ? {
    -readonly [P in keyof (T)]: DeepMutable<T[P]>;
} : T;

export type ParseURLParams<StringElem extends string> =
    StringElem extends `${infer _Start}:${infer Param}${infer Rest}`
        ? Param | ParseURLParams<Rest>
        : never;
