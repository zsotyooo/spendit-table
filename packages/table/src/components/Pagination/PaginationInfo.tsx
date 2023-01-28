import { FunctionComponent, HTMLAttributes, useMemo } from "react";
import cx from "classnames";
import { InfoWrapper } from "./Elements";

const PaginationInfo: FunctionComponent<
  {
    currentPage: number;
    pageSize: number;
    total: number;
    text?: string;
    isBusy: boolean;
  } & HTMLAttributes<HTMLDivElement>
> = ({
  currentPage,
  pageSize,
  total,
  text = "Showing %from% to %to% of %total%",
  isBusy,
  className,
  ...htmlProps
}) => {
  const from = useMemo(() => {
    return currentPage * pageSize + 1;
  }, [currentPage, pageSize]);

  const to = useMemo(() => {
    const nextPageEnd = from + pageSize - 1;
    return nextPageEnd < total ? nextPageEnd : total;
  }, [from, pageSize, total]);

  return !isBusy ? (
    <InfoWrapper
      className={cx("spendit-pagination-info", className)}
      {...htmlProps}
    >
      {text
        .replaceAll("%from%", from.toString())
        .replaceAll("%to%", to.toString())
        .replaceAll("%total%", total.toString())}
    </InfoWrapper>
  ) : (
    <></>
  );
};

export default PaginationInfo;
