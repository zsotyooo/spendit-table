export type PageData<T> = {
  total: number;
  data: T[];
};

export interface PageLoader<T> {
  (page: number, pageSize: number): Promise<PageData<T>>;
}
