import {
  StyledRoot,
  StyledTable,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from 'baseui/table-semantic';
import React from 'react';

interface IVerticalTable {
  items: {
    [title: string]: any;
  };
}

const VerticalTable: React.FC<IVerticalTable> = ({ items }) => {
  return (
    <StyledRoot>
      <StyledTable>
        {Object.keys(items).map((key, i) => (
          <StyledTableBodyRow>
            <StyledTableBodyCell>{key}</StyledTableBodyCell>
            <StyledTableBodyCell>{items[key]}</StyledTableBodyCell>
          </StyledTableBodyRow>
        ))}
      </StyledTable>
    </StyledRoot>
  );
};
export default VerticalTable;
