import { describe, test, expect } from 'vitest';
import { z } from 'zod';
import { streamParseCsv } from './open-parse-csv';

function makeFile(content: string, name = 'test.csv'): File {
	return new File([content], name, { type: 'text/csv' });
}

describe('streamParseCsv', () => {
	const schema = z.object({
		name: z.string(),
		age: z.coerce.number().int().positive()
	});

	test('parses valid CSV rows', async () => {
		const csv = `name,age
Alice,30
Bob,25`;
		const file = makeFile(csv);

		const { records, errors } = await streamParseCsv(file, schema);

		expect(records).toEqual([
			{ name: 'Alice', age: 30 },
			{ name: 'Bob', age: 25 }
		]);
		expect(errors).toEqual([]);
	});

	test('returns errors for invalid rows', async () => {
		const csv = `name,age
Alice,30
Charlie,notanumber`;
		const file = makeFile(csv);

		const { records, errors } = await streamParseCsv(file, schema);

		expect(records).toEqual([{ name: 'Alice', age: 30 }]);
		expect(errors.length).toBe(1);
		expect(errors[0].rowNumber).toBe(3); // header = row 1, invalid row is line 3
		expect(errors[0].message).toMatch(/invalid_type/);
	});
});
