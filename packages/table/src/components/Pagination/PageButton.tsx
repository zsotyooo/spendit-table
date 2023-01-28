import { FunctionComponent, HTMLAttributes, useCallback } from "react";
import cx from "classnames";
import { Button } from "./Elements";

const PageButton: FunctionComponent<
  {
    page: number;
    currentPage: number;
    isBusy: boolean;
    onPageChange: (value: number) => void;
  } & HTMLAttributes<HTMLButtonElement>
> = ({ page, currentPage, onPageChange, isBusy, children }) => {
  const handlePageButtonClick = useCallback(() => {
    onPageChange(page);
  }, [page]);
  return (
    <Button
      type="button"
      role="button"
      onClick={handlePageButtonClick}
      className={cx("spendit-pagination__button", {
        "is-current": currentPage === page,
      })}
      disabled={isBusy}
    >
      {children}
    </Button>
  );
};

export default PageButton;
