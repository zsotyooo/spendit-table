import { useEffect, useReducer, useState } from "react";
import {
  DataHandlingMode,
  PageData,
  SelectionAction,
  SelectionActionType,
} from "../models";

export function useTableData<T>() {
  const [mode, setMode] = useState<DataHandlingMode | null>(null);
  const [data, setRawData] = useState<T[]>([]);
  const [pageData, setPageRawData] = useState<T[]>([]);
  const [pageSize, setPageSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");

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

  function setPageData(data: T[]) {
    resetSelection();
    setPageRawData(data);
  }

  function setData(data: T[]) {
    setRawData(data);
    setTotal(data.length);
  }

  async function setAsyncData(asyncData: Promise<T[]>) {
    setIsBusy(true);
    try {
      const data = await asyncData;
      setData(data);
      setIsBusy(false);
    } catch (e) {
      setIsBusy(false);
      setError("Error while getting data!");
      throw e;
    }
  }

  async function setAsyncPage(asyncPageData: Promise<PageData<T>>) {
    setIsBusy(true);
    try {
      const { data, total } = await asyncPageData;
      setRawData(data);
      setTotal(total);
      setIsBusy(false);
    } catch (e) {
      setIsBusy(false);
      setError("Error while getting page data!");
      throw e;
    }
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
    error,
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
    setError,
  };
}
