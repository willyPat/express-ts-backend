import { Request, Response } from 'express';
import { getPaginatedEngagements } from './interactions.service';
import { GetInteractionsInputSchema, GetInteractionsOutputDTO } from './interactions.dto';

const RESULTS_LIMIT = 300;

export const getInteractionsForPastor = async (req: Request, res: Response): Promise<void> => {
  const validationResult = GetInteractionsInputSchema.safeParse({
    pastorId: req.params.pastorId,
    page: req.query.page || '1',
    limit: req.query.limit || RESULTS_LIMIT, // Default to 300 items per page
  });

  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((err) => err.message).join(', ');
    res.status(400).json({ error: `Validation failed: ${errors}` });
    return;
  }


  const input = validationResult.data;

  try {
    const { data, total } = await getPaginatedEngagements(input.pastorId, input.page, input.limit);

    const output: GetInteractionsOutputDTO = {
      pastorId: input.pastorId,
      total,
      page: input.page,
      limit: input.limit,
      data,
    };

    res.status(200).json(output);
  } catch (error) {
    console.error(`Error fetching interactions for pastorId ${input.pastorId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
