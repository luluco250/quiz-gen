import { assertNotNullish } from "./assert";

export function isNullish<T extends NonNullable<unknown>>(
	value: T | null | undefined,
): value is T {
	return value !== null && value !== undefined;
}

export function throwIfNullish<T extends NonNullable<unknown>>(
	value: T | null | undefined,
	name: string,
): T {
	assertNotNullish(value, name);
	return value;
}
