import { Row } from "./Row";

export type PageData = {
  total: number;
  data: Row[];
};

export interface PageLoader {
  (page: number, pageSize: number): Promise<PageData>;
}
