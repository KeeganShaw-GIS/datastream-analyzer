import Papa from 'papaparse';
import { z } from 'zod';
import type { RowError } from '../../routes/data-viewer/schema';

export type StreamParseCsvOutput<T> = {
	records: T[];
	errors: RowError[];
};

export async function streamParseCsv<T>(
	file: File,
	schema: z.ZodType<T>
): Promise<StreamParseCsvOutput<T>> {
	const records: T[] = [];
	const errors: RowError[] = [];

	const text = await file.text();

	const parsed = Papa.parse<Record<string, string>>(text, {
		header: true,
		skipEmptyLines: true
	});

	parsed.data.forEach((row, idx) => {
		const result = schema.safeParse(row);
		if (result.success) {
			records.push(result.data);
		} else {
			result.error.issues.forEach((i) => {
				errors.push({ rowNumber: idx + 2, message: `(${i.code}): ${i.path}: ${i.message}` });
			});
		}
	});

	return { records, errors };
}
