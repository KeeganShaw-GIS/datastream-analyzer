import type { Datastream } from '$lib/schema/datastream';
import type { ColumnDef } from '@tanstack/table-core';

export const datastreamColumns: ColumnDef<Datastream>[] = [
	{
		accessorKey: 'MonitoringLocationID',
		header: 'Monitoring Location ID'
	},
	{
		accessorKey: 'MonitoringLocationName',
		header: 'Monitoring Location'
	},

	{
		accessorKey: 'MonitoringLocationLatitude',
		header: 'Lat'
	},
	{
		accessorKey: 'MonitoringLocationLongitude',
		header: 'Long'
	},
	{
		accessorKey: 'ActivityMediaName',
		header: 'Media Type'
	},
	{
		accessorKey: 'CharacteristicName',
		header: 'Characteristic'
	},
	{
		accessorKey: 'ResultValue',
		header: 'Value'
	},
	{
		accessorKey: 'ResultUnit',
		header: 'Unit'
	}
];
