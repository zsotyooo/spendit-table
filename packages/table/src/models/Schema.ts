export type ColumnDefinition<T> = {
  label: string;
  renderCell?(value: T): JSX.Element;
  renderHead?(value: string): JSX.Element;
};

export type Schema<T extends Record<string, unknown>> = Record<
  keyof T,
  ColumnDefinition<T[keyof T]>
>;
