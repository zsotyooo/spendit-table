import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  padding: var(--spt-cell-padding);
  border-bottom: 1px solid var(--spt-border-color);
  text-align: left;
  &.is-checkbox {
    width: 1.5rem;
  }
`;

export const Td = styled.td`
  padding: var(--spt-cell-padding);
  border-bottom: 1px solid var(--spt-border-color);
  text-align: left;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  align-items: center;
  padding: var(--spt-pagination-padding);
`;

export const PaginationInfoWrapper = styled.div`
  flex: 0;
`;

export const PaginationPagerWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ErrorWrapper = styled.div`
  color: red;
`;
