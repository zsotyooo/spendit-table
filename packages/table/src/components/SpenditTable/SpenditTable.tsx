import { useCallback, useEffect } from "react";
import cx from "classnames";
import { DataHandlingMode } from "../../models";
import { isPromise } from "../../helpers";
import { useTableData } from "../../composables";
import { Pagination, PaginationInfo } from "../Pagination";
import GlobalStyle from "../GlobalStyle";
import { AllCheckbox, Checkbox } from "../Selection";
import type { Props } from "./Props";
import {
  ErrorWrapper,
  PaginationInfoWrapper,
  PaginationPagerWrapper,
  PaginationWrapper,
  Table,
  Td,
  Th,
  Tr,
} from "./Elements";

function SpenditTable<T extends Record<string, unknown>>({
  schema,
  data: dataProp,
  loadPage,
  currentPage: currentPageProp,
  pageSize: pageSizeProp,
  selectable = false,
  pagerPageDistance,
  onSelectionChange,
  className,
  infoText,
  ...htmlProps
}: Props<T>) {
  const {
    pageData,
    isBusy,
    currentPage,
    pageSize,
    total,
    selectedDataIndexes,
    error,
    setMode,
    setData,
    setAsyncData,
    setAsyncPage,
    setCurrentPage,
    setPageSize,
    setAllSelection,
    resetSelection,
    setSelection,
    removeSelection,
    isAllSelected,
    isSelected,
    getSelectedData,
  } = useTableData<T>();

  useEffect(() => {
    if (loadPage) {
      setMode(DataHandlingMode.PageAsnc);
      return;
    }
    if (isPromise(dataProp)) {
      setMode(DataHandlingMode.FullDataAsync);
      setAsyncData(dataProp);
      return;
    }
    setMode(DataHandlingMode.FullData);
    setData(dataProp);
  }, [loadPage, dataProp]);

  useEffect(() => {
    setCurrentPage(currentPageProp);
  }, [currentPageProp]);

  useEffect(() => {
    setPageSize(pageSizeProp);
  }, [pageSizeProp]);

  useEffect(() => {
    if (loadPage) {
      setAsyncPage(loadPage(currentPage, pageSize));
    }
  }, [loadPage, currentPage, pageSize]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(getSelectedData());
    }
  }, [onSelectionChange, selectedDataIndexes.length]);

  const handleToggleSelectAll = useCallback((allSelected: boolean) => {
    if (allSelected) {
      setAllSelection();
      return;
    }
    resetSelection();
  }, []);

  const handleToggleSelectOne = useCallback(
    (selected: boolean, dataIndex: number) => {
      if (selected) {
        setSelection(dataIndex);
        return;
      }
      removeSelection(dataIndex);
    },
    []
  );

  return (
    <GlobalStyle className={cx("spendit-table", className)} {...htmlProps}>
      {error && <ErrorWrapper>{error}</ErrorWrapper>}
      <Table className={cx("spendit-table__table", { "is-busy": isBusy })}>
        <thead>
          <Tr>
            {selectable && (
              <Th
                className={cx(
                  "spendit-table__th",
                  "spendit-table__th--select",
                  "is-checkbox"
                )}
              >
                <AllCheckbox
                  title="Select all"
                  checked={isAllSelected()}
                  name={`all[${currentPage}]`}
                  onSelectionChange={handleToggleSelectAll}
                  isBusy={isBusy}
                />
              </Th>
            )}
            {Object.keys(schema)
              .map((columnId) => ({ columnId, definition: schema[columnId] }))
              .map(({ columnId, definition: { label, renderHead } }) => (
                <Th
                  key={columnId}
                  className={cx(
                    "spendit-table__th",
                    `spendit-table__th--${columnId}`
                  )}
                >
                  {renderHead ? renderHead(label) : label}
                </Th>
              ))}
          </Tr>
        </thead>
        <tbody>
          {pageData.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {selectable && (
                <Td>
                  <Checkbox
                    name={`row[${currentPage}][${rowIndex}]`}
                    title={`Select row #${rowIndex + 1}`}
                    checked={isSelected(rowIndex)}
                    dataIndex={rowIndex}
                    onSelectionChange={handleToggleSelectOne}
                    isBusy={isBusy}
                  />
                </Td>
              )}
              {Object.keys(row)
                .map((dataId) => ({
                  dataId,
                  definition: schema[dataId],
                }))
                .map(({ dataId, definition: { renderCell } }) => (
                  <Td
                    key={`${currentPage}__${dataId}`}
                    className={cx(
                      "spendit-table__td",
                      `spendit-table__td--${dataId}`
                    )}
                  >
                    {renderCell
                      ? // Type assignment is needed, because TS is not smart enogh to figure it out
                        renderCell(row[dataId] as T[keyof T])
                      : (row[dataId] as string)}
                  </Td>
                ))}
            </Tr>
          ))}
        </tbody>
      </Table>
      <PaginationWrapper className="spendit-table__pagination">
        <PaginationInfoWrapper>
          <PaginationInfo
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            isBusy={isBusy}
            text={infoText}
          />
        </PaginationInfoWrapper>
        <PaginationPagerWrapper>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={total}
            isBusy={isBusy}
            distance={pagerPageDistance}
            onPageChange={setCurrentPage}
          />
        </PaginationPagerWrapper>
      </PaginationWrapper>
    </GlobalStyle>
  );
}

export default SpenditTable;
