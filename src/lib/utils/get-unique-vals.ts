import type { Datastream } from '$lib/schema/datastream';

export function getUniqueValues<T extends object, K extends keyof T>(items: T[], key: K): T[K][] {
	const uniqueVals = new Set<T[K]>();
	for (const item of items) {
		uniqueVals.add(item[key]);
	}
	return [...uniqueVals];
}
