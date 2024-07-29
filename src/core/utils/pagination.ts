export const DEFAULT_LIMIT = 10;
export const DEFAULT_OFFSET = 0;

export type PaginationRequest = {
  count: number;
  offset: number;
  limit: number;
};

export type PaginationResponse = {
  total_page: number;
  current_page: number;
  limit: number;
  offset: number;
};

export const toPaginationResponse: (
  data: PaginationRequest
) => PaginationResponse = (data: {
  count: number;
  offset: number;
  limit: number;
}) => {
  const totalPage = Math.ceil(data.count / data.limit);
  const currentPage = data.count === 0 ? 0 : data.offset / data.limit + 1;
  return {
    total_page: totalPage,
    current_page: currentPage,
    limit: data.limit,
    offset: data.offset,
  };
};
