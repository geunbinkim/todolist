"use client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Todo {
  id: number;
  descryption: string;
  isComplete: boolean;
}

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [desc, setDesc] = useState<string>("");
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const makeNextId = () => {
    if (todoList.length === 0) return 1;
    todoList.sort((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      else return 0;
    });
    return todoList[0].id + 1;
  };
  const onAdd = () => {
    setTodoList([
      ...todoList,
      {
        id: makeNextId(),
        descryption: input,
        isComplete: false,
      },
    ]);
    setInput("");
  };

  const onCheck = (_todo: Todo) => {
    setTodoList([
      ...todoList.map((todo) => {
        if (todo.id === _todo.id)
          return { ...todo, isComplete: !todo.isComplete };
        return todo;
      }),
    ]);
  };

  const onEditModal = (_todo: Todo) => {
    setEditDialogOpen(true);
    setTodo(_todo);
  };

  const onDeleteModal = (_todo: Todo) => {
    setDeleteDialogOpen(true);
    setTodo(_todo);
  };

  const onEdit = () => {
    if (!todo) return;
    setTodoList([
      ...todoList.map((todoItem) => {
        if (todoItem.id === todo.id)
          return {
            ...todo,
            descryption: desc,
          };
        return todoItem;
      }),
    ]);
    onCancel();
  };

  const onDelete = () => {
    if (!todo) return;
    setTodoList([
      ...todoList.filter((todoItem) => {
        return todoItem.id !== todo.id;
      }),
    ]);

    onCancel();
  };

  const onCancel = () => {
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Container maxWidth={"md"} sx={{ mt: 10 }}>
        <InputBase
          sx={{ ml: 1, width: 800 }}
          placeholder="Create your Todo"
          inputProps={{ "aria-label": "create your todo" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            onAdd();
          }}
        >
          <AddBoxIcon />
        </IconButton>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100} align="center">
                  Complete
                </TableCell>
                <TableCell width={500} align="center">
                  Todo
                </TableCell>
                <TableCell width={100} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList.map((todo: Todo) => {
                return (
                  <TableRow key={todo.id}>
                    <TableCell>
                      <Checkbox
                        checked={todo.isComplete}
                        onChange={() => onCheck(todo)}
                      />
                    </TableCell>
                    <TableCell
                      style={
                        todo.isComplete
                          ? { textDecoration: "line-through" }
                          : { textDecoration: "none" }
                      }
                    >
                      {todo.descryption}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => onEditModal(todo)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDeleteModal(todo)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog open={editDialogOpen}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Descrption</DialogContentText>
          <TextField
            autoFocus
            required
            variant="standard"
            onChange={(e) => setDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onEdit()}>Edit</Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDelete()}>Delete</Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
