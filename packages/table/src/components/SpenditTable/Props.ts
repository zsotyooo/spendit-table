import type { HTMLAttributes } from "react";
import type { PageLoader, Schema } from "../../models";

type CommonProps<T extends Record<string, unknown>> =
  HTMLAttributes<HTMLDivElement> & {
    schema: Schema<T>;
    currentPage: number;
    pageSize: number;
    selectable?: boolean;
    onSelectionChange?: (rows: T[]) => void;
    infoText?: string;
    pagerPageDistance?: number;
  };

export type Props<T extends Record<string, unknown>> =
  | (CommonProps<T> & {
      data: T[] | Promise<T[]>;
      loadPage?: undefined;
    })
  | (CommonProps<T> & { data?: undefined; loadPage: PageLoader<T> });
