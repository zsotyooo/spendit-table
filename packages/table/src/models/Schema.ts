// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CellRenderer<T = any> {
  (value: T): JSX.Element;
}

export type ColumnDefinition = {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: CellRenderer;
};

export type Schema = ColumnDefinition[];
