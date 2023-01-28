import {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
} from "react";
import cx from "classnames";
import { Input } from "./Elements";

const Checkbox: FunctionComponent<
  {
    checked: boolean;
    isBusy: boolean;
    dataIndex: number;
    onSelectionChange: (isSelected: boolean, dataIndex: number) => void;
  } & InputHTMLAttributes<HTMLInputElement>
> = ({ checked, isBusy, dataIndex, onSelectionChange, ...htmlAttrs }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSelectionChange(event.target.checked, dataIndex);
    },
    [onSelectionChange]
  );
  return (
    <Input
      type="checkbox"
      checked={checked}
      value={dataIndex}
      onChange={handleChange}
      className={cx("spendit-selection__checkbox")}
      disabled={isBusy}
      {...htmlAttrs}
    />
  );
};

export default Checkbox;
