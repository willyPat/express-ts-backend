import { z } from 'zod';
import { Interaction } from './interactions.model';

export const GetInteractionsInputSchema = z.object({
  pastorId: z.string().min(1, 'Pastor ID is required'),
  page: z
    .string()
    .regex(/^\d+$/, 'Page must be a positive integer')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Page must be greater than 0'),
  limit: z
    .string()
    .regex(/^\d+$/, 'Limit must be a positive integer')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Limit must be greater than 0'),
});

export interface GetInteractionsOutputDTO {
  pastorId: string;
  total: number;
  page: number;
  limit: number;
  data: Interaction[];
}
