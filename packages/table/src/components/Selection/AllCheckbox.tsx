import {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
} from "react";
import cx from "classnames";
import { Input } from "./Elements";

const AllCheckbox: FunctionComponent<
  {
    checked: boolean;
    isBusy: boolean;
    onSelectionChange: (value: boolean) => void;
  } & InputHTMLAttributes<HTMLInputElement>
> = ({ checked, isBusy, onSelectionChange, ...htmlAttrs }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSelectionChange(event.target.checked);
    },
    [onSelectionChange]
  );
  return (
    <Input
      type="checkbox"
      checked={checked}
      value="all"
      onChange={handleChange}
      className={cx("spendit-selection__checkbox")}
      disabled={isBusy}
      {...htmlAttrs}
    />
  );
};

export default AllCheckbox;
