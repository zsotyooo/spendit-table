import { FunctionComponent, HTMLAttributes } from "react";
import styled, { createGlobalStyle } from "styled-components";

const Style = createGlobalStyle`
  html {
    --spt-border-color: #d6d3d1;
    --spt-text-color: #1c1917;
    --spt-cell-padding: 0.5rem 0.75rem;
    --spt-pagination-padding: 1.5rem 0;
    --spt-pagination-button-padding: 0.25rem 0.5rem;
    --spt-pagination-button-margin: 0 0.125rem;
    --spt-pagination-button-text-color: #1c1917;
    --spt-pagination-button-background: #d6d3d1;
    --spt-pagination-button-text-color-hover: #1c1917;
    --spt-pagination-button-background-hover: #a8a29e;
    --spt-pagination-current-button-text-color: #ffffff;
    --spt-pagination-current-button-background: #0ea5e9;
    --spt-checkbox-accent-color: #0ea5e9;
  }
`;

const Wrapper = styled.div`
  color: var(--spt-text-color);
`;

const GlobalStyle: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <Wrapper className="spendit-table">
      {children}
      <Style />
    </Wrapper>
  );
};

export default GlobalStyle;
