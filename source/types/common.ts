export type Type<T> = { new (...args: unknown[]): T };

export type NotNullish<T = unknown> = NonNullable<T>;
