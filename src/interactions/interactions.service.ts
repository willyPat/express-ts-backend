import { Interaction } from './interactions.model';
import { mockInteractions } from './data/mockInteractions';

/**
 * Fetch paginated engagement data filtered by pastorId, sorted by date (oldest to newest).
 * Im doing some sorting and filtering that would be made by DB queries if we had one
 */
export const getPaginatedEngagements = async (
  pastorId: string,
  page: number,
  limit: number
): Promise<{ data: Interaction[]; total: number }> => {
  const filteredInteractions = mockInteractions.filter(
    (engagement) => engagement.pastorId === pastorId
  );

  const sortedInteractions = filteredInteractions.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const total = sortedInteractions.length;

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = sortedInteractions.slice(start, end);

  return {
    data: paginatedData,
    total,
  };
};
