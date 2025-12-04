import { z } from 'zod';

export const StatisticalDtoSchema = z.object({
	type: z.enum(['SuggestionList', 'BlogList', 'RecordList']),
	value: z.number().min(0, '值不能为空'),
	increment: z.number().min(0, '值不能为空'),
});

export type StatisticalDto = z.infer<typeof StatisticalDtoSchema>;
