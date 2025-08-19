export type RowError = {
	message: string;
	rowNumber: number;
};

export type ImportStatus = {
	rowErrors?: RowError[];
	status: 'ERROR'| 'SUCCESS';
	filename?: string;
	message: string;
};
