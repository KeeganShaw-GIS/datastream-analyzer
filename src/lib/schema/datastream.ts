import { z } from 'zod';

export const datastreamSchema = z.object({
	DatasetName: z.string().min(1),
	MonitoringLocationID: z.string().min(1),
	MonitoringLocationName: z.string().min(1),
	MonitoringLocationLatitude: z.coerce.number().max(90).min(-90),
	MonitoringLocationLongitude: z.coerce.number().max(180).min(-180),
	MonitoringLocationType: z.string().optional(),
	ActivityType: z.string(),
	ActivityMediaName: z.string().min(1),
	CharacteristicName: z.string().min(1),
	ResultValue: z.coerce.number().optional(),
	ResultUnit: z.string().optional()
});

export type Datastream = z.infer<typeof datastreamSchema>;
