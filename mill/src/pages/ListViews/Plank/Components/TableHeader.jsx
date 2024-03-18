import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeader = ({ columnsTemplate, visibleColumns }) => (
  <TableHead>
    <TableRow>
      {columnsTemplate.map(({ label }, index) =>
        visibleColumns[index] ? ( // Only render if the column is marked as visible
          <TableCell
            key={label}
            align="left"
            className={index === 0 ? "stickyColumnHeader" : ""}
          >
            {label}
          </TableCell>
        ) : null
      )}
    </TableRow>
  </TableHead>
);

export default TableHeader;
