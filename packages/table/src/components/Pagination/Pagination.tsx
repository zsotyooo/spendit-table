import { FunctionComponent, HTMLAttributes } from "react";
import cx from "classnames";
import { Hellip, Wrapper } from "./Elements";
import PageButton from "./PageButton";

const Pagination: FunctionComponent<
  {
    currentPage: number;
    pageSize: number;
    total: number;
    isBusy: boolean;
    distance?: number;
    onPageChange: (value: number) => void;
  } & HTMLAttributes<HTMLDivElement>
> = ({
  currentPage,
  pageSize,
  total,
  isBusy,
  distance = 3,
  onPageChange,
  className,
  ...htmlProps
}) => {
  const numberOfPages = pageSize ? Math.ceil(total / pageSize) : 0;

  const pagesToShow = Array.from(new Array(numberOfPages))
    .map((_, i) => i)
    .filter((page) => {
      const additionToRight =
        currentPage - distance < 0 ? Math.abs(currentPage - distance) : 0;
      const additionToLeft =
        currentPage + distance > numberOfPages
          ? currentPage + distance - numberOfPages + 1
          : 0;
      return (
        page >= currentPage - distance - additionToLeft &&
        page <= currentPage + distance + additionToRight
      );
    });

  return (
    <Wrapper className={cx("spendit-pagination", className)} {...htmlProps}>
      {currentPage > 0 && (
        <>
          <PageButton
            page={0}
            currentPage={currentPage}
            onPageChange={onPageChange}
            isBusy={isBusy}
          >
            ❮❮
          </PageButton>
          {currentPage > distance && <Hellip />}
          <PageButton
            page={currentPage - 1}
            currentPage={currentPage}
            onPageChange={onPageChange}
            isBusy={isBusy}
          >
            ❮
          </PageButton>
        </>
      )}
      {pagesToShow.map((page) => (
        <PageButton
          key={page}
          page={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
          isBusy={isBusy}
        >
          {page + 1}
        </PageButton>
      ))}
      {currentPage < numberOfPages - 1 && (
        <>
          <PageButton
            page={currentPage + 1}
            currentPage={currentPage}
            onPageChange={onPageChange}
            isBusy={isBusy}
          >
            ❯
          </PageButton>
          {currentPage < numberOfPages - distance && <Hellip />}
          <PageButton
            page={numberOfPages - 1}
            currentPage={currentPage}
            onPageChange={onPageChange}
            isBusy={isBusy}
          >
            ❯❯
          </PageButton>
        </>
      )}
    </Wrapper>
  );
};

export default Pagination;
