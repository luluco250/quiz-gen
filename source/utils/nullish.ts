import { assertNotNullish } from "./assert";

export function isNullish(value: {} | null | undefined): value is {} {
	return value !== null && value !== undefined;
}

export function throwIfNullish<T extends {}>(
	value: T | null | undefined,
	name: string,
): T {
	assertNotNullish(value, name);
	return value;
}
