import { FunctionComponent, HTMLAttributes } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    --spt-border-color: #000000;
    --spt-color: #000000;
    --spt-cell-padding: 0.5rem 0.75rem;
  }
`;

const StyledWrapper = styled.div`
  color: var(--spt-color);
`;

const Wrapper: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <StyledWrapper className="spendit-table">
      {children}
      <GlobalStyle />
    </StyledWrapper>
  );
};

export default Wrapper;
