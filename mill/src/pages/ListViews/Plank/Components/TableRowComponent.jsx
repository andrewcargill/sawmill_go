import { TableCell, TableRow } from "@mui/material";

const TableRowComponent = ({ data, columnsTemplate, visibleColumns, getValueByPath }) => (
    <TableRow>
      {columnsTemplate.map(({ label, dataKey }, index) => visibleColumns[index] && (
        <TableCell
          key={label}
          align="left"
          className={index === 0 ? "stickyColumn" : ""}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {getValueByPath(data, dataKey)}
        </TableCell>
      ))}
    </TableRow>
  );
  

export default TableRowComponent;
  