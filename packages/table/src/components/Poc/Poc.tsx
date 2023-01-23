import { FunctionComponent, HTMLAttributes } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: #ff0000;
`;

const Poc: FunctionComponent<HTMLAttributes<HTMLElement>> = ({ children }) => {
  return <Wrapper className="poc">{children}</Wrapper>;
};

export default Poc;
