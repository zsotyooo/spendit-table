// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CellRenderer<T = any> {
  (value: T): JSX.Element;
}

export interface HeadCellRenderer {
  (value: string): JSX.Element;
}

export type ColumnDefinition = {
  id: string;
  label: string;
  render?: CellRenderer;
  renderHead?: HeadCellRenderer;
};

export type Schema = ColumnDefinition[];
