export class PagingResponse<T> {
  data: T;
  count: number;
  page: number;
  limit: number;
  constructor(data: T, count: number, page: number, limit: number) {
    this.data = data;
    this.count = count;
    this.page = page;
    this.limit = limit;
  }
}
