import { Row } from "./Row";

export interface PageLoader {
  (page: number, pageSize: number): Promise<{
    total: number;
    data: Row[];
  }>;
}
