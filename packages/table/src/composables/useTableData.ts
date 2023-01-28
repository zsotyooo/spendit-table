import { useEffect, useReducer, useState } from "react";
import {
  DataHandlingMode,
  PageData,
  Row,
  SelectionAction,
  SelectionActionType,
} from "../models";

export function useTableData() {
  const [mode, setMode] = useState<DataHandlingMode | null>(null);
  const [data, setRawData] = useState<Row[]>([]);
  const [pageData, setPageRawData] = useState<Row[]>([]);
  const [pageSize, setPageSize] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const [selectedDataIndexes, dispatchSelect] = useReducer(function (
    state: number[],
    action: SelectionAction
  ) {
    const { type } = action;

    switch (type) {
      case SelectionActionType.Reset:
        return [];
      case SelectionActionType.SetAll:
        return [...pageData.keys()];
      case SelectionActionType.Set:
        return state.includes(action.index)
          ? state
          : [...state, action.index].sort((a, b) => a - b);
      case SelectionActionType.Remove:
        return [...state].filter((item) => item !== action.index);
    }
  },
  []);

  useEffect(() => {
    if (!mode) {
      return;
    }
    if (mode === DataHandlingMode.PageAsnc) {
      setPageData(data);
      return;
    }
    if (
      [DataHandlingMode.FullData, DataHandlingMode.FullDataAsync].includes(mode)
    ) {
      setPageData([
        ...data.slice(currentPage * pageSize, (currentPage + 1) * pageSize),
      ]);
    }
  }, [data, currentPage, pageSize]);

  function setPageData(data: Row[]) {
    resetSelection();
    setPageRawData(data);
  }

  function setData(data: Row[]) {
    setRawData(data);
    setTotal(data.length);
  }

  function setAsyncData(asyncData: Promise<Row[]>) {
    setIsBusy(true);
    asyncData.then((data) => {
      setData(data);
      setIsBusy(false);
    });
  }

  function setAsyncPage(asyncPageData: Promise<PageData>) {
    setIsBusy(true);
    asyncPageData.then(({ data, total }) => {
      setRawData(data);
      setTotal(total);
      setIsBusy(false);
    });
  }

  function resetSelection() {
    dispatchSelect({ type: SelectionActionType.Reset });
  }

  function setAllSelection() {
    dispatchSelect({ type: SelectionActionType.SetAll });
  }

  function setSelection(dataIndex: number) {
    dispatchSelect({ type: SelectionActionType.Set, index: dataIndex });
  }

  function removeSelection(dataIndex: number) {
    dispatchSelect({ type: SelectionActionType.Remove, index: dataIndex });
  }

  function isAllSelected() {
    return pageData.length === selectedDataIndexes.length;
  }

  function isSelected(dataIndex: number) {
    return selectedDataIndexes.includes(dataIndex);
  }

  function getSelectedData() {
    return selectedDataIndexes.map(
      (selectedDataIndex) => pageData[selectedDataIndex]
    );
  }

  return {
    mode,
    data,
    pageData,
    selectedDataIndexes,
    pageSize,
    currentPage,
    total,
    isBusy,
    setMode,
    setData,
    setAsyncData,
    setAsyncPage,
    setPageSize,
    setCurrentPage,
    setTotal,
    setIsBusy,
    resetSelection,
    setAllSelection,
    setSelection,
    removeSelection,
    isAllSelected,
    isSelected,
    getSelectedData,
  };
}
