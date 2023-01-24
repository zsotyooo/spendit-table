import { Row } from "./Row";

export interface DataLoader {
  (): Promise<{
    total: number;
    data: Row[];
  }>;
}
