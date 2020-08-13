declare module 'types' {
  export type Accessors<T> = { [K in keyof T]: () => T[K] };
}
