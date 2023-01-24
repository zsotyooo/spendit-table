import { FunctionComponent, HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { CellRenderer, Row, Schema, DataLoader, PageLoader } from "../models";
import Wrapper from "./Wrapper";

const StyledTable = styled.table`
  border-spacing: 0;
  border-collapse: separate;
`;
const StyledTr = styled.tr``;
const StyledTh = styled.th`
  padding: var(--spt-cell-padding);
  border-bottom: 1px solid var(--spt-border-color);
  text-align: left;
`;
const StyledTd = styled.td`
  padding: var(--spt-cell-padding);
  border-bottom: 1px solid var(--spt-border-color);
  text-align: left;
`;

const Table: FunctionComponent<
  {
    schema: Schema;
    data: Row[];
    loadData?: DataLoader;
    loadPage?: PageLoader;
    currentPage: number;
    pageSize: number;
    total: number;
  } & HTMLAttributes<HTMLDivElement>
> = ({
  schema,
  data: dataProp,
  loadData,
  loadPage,
  currentPage: currentPageProp,
  pageSize: pageSizeProp,
  total: totalProp,
  ...htmlProps
}) => {
  if (loadData && loadPage) {
    throw new Error(
      "Using loadData and loadPage at the same time in not allowed!"
    );
  }
  const [data, setData] = useState<Row[]>(dataProp);
  const [pageSize, setPageSize] = useState<number>(pageSizeProp);
  const [currentPage, setCurrentPage] = useState<number>(currentPageProp);
  const [total, setTotal] = useState<number>(totalProp);

  useEffect(() => {
    setData(dataProp);
  }, [dataProp]);

  useEffect(() => {
    setCurrentPage(currentPageProp);
  }, [currentPageProp]);

  useEffect(() => {
    setPageSize(pageSizeProp);
  }, [pageSizeProp]);

  useEffect(() => {
    setTotal(totalProp);
  }, [totalProp]);

  useEffect(() => {
    if (loadData) {
      loadData().then(({ data: loadedData, total: loadedTotal }) => {
        setData(loadedData);
        setTotal(loadedTotal);
      });
    }
  }, [loadData]);

  useEffect(() => {
    if (loadPage) {
      loadPage(currentPage, pageSize).then(
        ({ data: loadedData, total: loadedTotal }) => {
          setData(loadedData);
          setTotal(loadedTotal);
        }
      );
    }
  }, [loadPage, currentPage, pageSize]);

  const page = () => {
    if (loadPage) {
      return data;
    }
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  };

  const getColumnRendererByIndex = (index: number): CellRenderer =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema[index].render ?? ((value: any) => <>{value}</>);
  return (
    <Wrapper {...htmlProps}>
      <StyledTable>
        <thead>
          <StyledTr>
            {schema.map(({ id, label }) => (
              <StyledTh key={id}>{label}</StyledTh>
            ))}
          </StyledTr>
        </thead>
        <tbody>
          {page().map((row, rowIndex) => (
            <StyledTr key={rowIndex}>
              {row.map((value, columnIndex) => (
                <StyledTd key={columnIndex}>
                  {getColumnRendererByIndex(columnIndex)(value)}
                </StyledTd>
              ))}
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
};

export default Table;
