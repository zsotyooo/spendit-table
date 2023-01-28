import styled from "styled-components";

export const Wrapper = styled.div``;

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  margin: var(--spt-pagination-button-margin);
  padding: var(--spt-pagination-button-padding);
  color: var(--spt-pagination-button-text-color);
  background: var(--spt-pagination-button-background);
  box-shadow: 3px 1px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid #ffffff;
  border-radius: 5px;
  font-weight: 400;
  &.is-current {
    cursor: default;
    color: var(--spt-pagination-current-button-text-color);
    background: var(--spt-pagination-current-button-background);
  }
  &:not(.is-current):not(:disabled):hover {
    color: var(--spt-pagination-button-text-color-hover);
    background: var(--spt-pagination-button-background-hover);
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export const InfoWrapper = styled.div`
  font-size: 0.85rem;
  white-space: nowrap;
`;

export const Hellip = styled.span`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0.25rem;
  &:after {
    content: "...";
  }
`;
