
import { describe, test, expect } from 'vitest';
import { getUniqueValues } from './get-unique-vals';

describe('getUniqueValues', () => {
	test('works with strings', () => {
		const items = [{ a: 'x' }, { a: 'y' }, { a: 'x' }];
		expect(getUniqueValues(items, 'a')).toEqual(['x', 'y']);
	});

	test('works with numbers', () => {
		const items = [{ a: 1 }, { a: 2 }, { a: 1 }];
		expect(getUniqueValues(items, 'a')).toEqual([1, 2]);
	});

	test('works with booleans', () => {
		const items = [{ a: true }, { a: false }, { a: true }];
		expect(getUniqueValues(items, 'a')).toEqual([true, false]);
	});

	test('returns empty array for empty input', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(getUniqueValues([], 'a' as any)).toEqual([]);
	});
});
