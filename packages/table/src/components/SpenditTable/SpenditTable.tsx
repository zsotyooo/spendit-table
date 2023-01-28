import {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useEffect,
} from "react";
import cx from "classnames";
import {
  CellRenderer,
  Row,
  Schema,
  PageLoader,
  HeadCellRenderer,
  DataHandlingMode,
} from "../../models";
import { Pagination, PaginationInfo } from "../Pagination";
import { isPromise } from "../../helpers";
import { useTableData } from "../../composables";
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
import GlobalStyle from "../GlobalStyle";
import { AllCheckbox, Checkbox } from "../Selection";

type CommonProps = HTMLAttributes<HTMLDivElement> & {
  schema: Schema;
  currentPage: number;
  pageSize: number;
  selectable?: boolean;
  onSelectionChange?: (rows: Row[]) => void;
  infoText?: string;
  pagerPageDistance?: number;
};

const SpenditTable: FunctionComponent<
  | (CommonProps & { data: Row[] | Promise<Row[]>; loadPage?: undefined })
  | (CommonProps & { data?: undefined; loadPage: PageLoader })
> = ({
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
}) => {
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
  } = useTableData();

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

  const getColumnRendererByIndex = (index: number): CellRenderer =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema[index].render ?? ((value: any) => <>{value}</>);

  const getColumnHeadRendererByIndex = (index: number): HeadCellRenderer =>
    schema[index].renderHead ?? ((value: string) => <>{value}</>);

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
            {schema.map(({ id, label }, columnIndex) => (
              <Th
                key={id}
                className={cx("spendit-table__th", `spendit-table__th--${id}`)}
              >
                {getColumnHeadRendererByIndex(columnIndex)(label)}
              </Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {pageData
            .map((row, rowIndex) => ({ row, id: rowIndex }))
            .map(({ row, id }) => (
              <Tr key={id}>
                {selectable && (
                  <Td>
                    <Checkbox
                      name={`row[${currentPage}][${id}]`}
                      title={`Select row #${id + 1}`}
                      checked={isSelected(id)}
                      dataIndex={id}
                      onSelectionChange={handleToggleSelectOne}
                      isBusy={isBusy}
                    />
                  </Td>
                )}
                {row.map((value, columnIndex) => (
                  <Td
                    key={`${currentPage}__${schema[columnIndex].id}`}
                    className={cx(
                      "spendit-table__td",
                      `spendit-table__td--${schema[columnIndex].id}`
                    )}
                  >
                    {getColumnRendererByIndex(columnIndex)(value)}
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
};

export default SpenditTable;
