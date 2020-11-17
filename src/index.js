import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  SortableContainer,
  SortableHandle,
  SortableElement
} from "react-sortable-hoc";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import arrayMove from "array-move";

const DragHandle = SortableHandle(({ style, data }) => (
  <span style={{ ...style, ...{ cursor: "move" } }}>{data}</span>
));

const TableBodySortable = SortableContainer(({ children }) => (
  <TableBody>{children}</TableBody>
));

TableBodySortable.muiName = "TableBody";

const Row = SortableElement(({ data }) => {
  return (
    <TableRow>
      <TableCell style={{ width: "5%" }}></TableCell>
      <TableCell>{data.id}</TableCell>
      <TableCell>
        <DragHandle data={data.name} />
      </TableCell>
      <TableCell>{data.status}</TableCell>
    </TableRow>
  );
});

const SortableTable = () => {
  const [peoples, setPeoples] = useState([
    {
      id: 1,
      name: "People 1",
      status: "enabled"
    },
    {
      id: 2,
      name: "People 2",
      status: "disabled"
    },
    {
      id: 3,
      name: "People 3",
      status: "enabled"
    }
  ]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setPeoples(arrayMove(peoples, oldIndex, newIndex));
  };

  return (
    <Table>
      <TableHead displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableCell style={{ width: "5%" }}>&nbsp;</TableCell>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBodySortable onSortEnd={onSortEnd} useDragHandle>
        {peoples.map((row, index) => {
          return <Row index={index} key={row.id} data={row} />;
        })}
      </TableBodySortable>
    </Table>
  );
};

const App = () => {
  return (
    <div>
      <h3>
        Material-ui Table sortable component with rows drag-n-drop support
      </h3>
      <SortableTable />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
