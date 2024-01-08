export class AssertionError extends Error {
	public constructor(message: string) {
		super(`Assertion failed: "${message}"`);
	}
}

export function assert(condition: boolean, message: string): asserts condition {
	if (condition === false) {
		throw new AssertionError(message);
	}
}

export function assertNotNullish<T extends {}>(
	value: T | null | undefined,
	name: string,
): asserts value is T {
	assert(value !== null && value !== undefined, `${name} is nullish`);
}
