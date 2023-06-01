import { DataState, TasksEntity } from "@/reducers/dataSlice";
import { AnyAction, createAsyncThunk, current } from "@reduxjs/toolkit";
import instance from "@/utils/axiosInstance";

export const onGetLocalData = (state: DataState, action: AnyAction) => {
  return { ...state, data: action.payload };
};

export const onPopulateUserData = (state: DataState, action: AnyAction) => {
  return { ...state, data: action.payload };
};

export const onDragAndDrop = (state: DataState, action: AnyAction) => {
  const { colIndex, prevColIndex, taskIndex, droppableAreaIndex } =
    action.payload;
  const board = state.data.find((board) => board.isActive);
  const prevCol = board!.columns.find((_col, i) => i === prevColIndex);
  const task = prevCol!.tasks.splice(taskIndex, 1)[0];
  const dropBoard = board!.columns.find((_col, i) => i === colIndex);

  if (dropBoard && task) {
    dropBoard.tasks.splice(droppableAreaIndex, 0, task);
  }
};

export const onSetActiveColumn = (state: DataState, action: AnyAction) => {
  const boardIndex = action.payload;
  const activeBoard = state.data.find((b) => b.isActive);
  const board = state.data.find((_b, i) => i === boardIndex);
  if (board) {
    if (activeBoard) activeBoard.isActive = false;
    board.isActive = true;
    return boardIndex;
  }
};

export const onEditBoard = (state: DataState, action: AnyAction) => {
  const payload = action.payload;
  const board = state.data.find((board) => board.isActive);
  if (board) {
    if (board.name !== payload.name) board.name = payload.name;
    if (board.columns !== payload.columns) board.columns = payload.columns;
  }
};

export const onDeleteBoard = (state: DataState, _action: AnyAction) => {
  const board = state.data.find((board) => board.isActive);
  state.data.splice(state.data.indexOf(board!), 1);
};

export const onAddTask = (state: DataState, action: AnyAction) => {
  const data = action.payload.task;
  const board = state.data.find((board, i) => i === state.activeColIndex);
  const selectedColumn = board?.columns.find((col) => col.name === data.status);

  if (selectedColumn) {
    selectedColumn.tasks.push(data);
  } else {
    throw new Error("cannot add task to redux state");
  }
};

// export const onAddTask = createAsyncThunk(
//   "tasks/addTask",
//   async (task: TasksEntity, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as DataState;
//       const activeBoard = state.data.find(
//         (board, i) => i === state.activeColIndex
//       );
//       const selectedColumn = activeBoard?.columns.find(
//         (col) => col.name === task.status
//       );

//       if (selectedColumn) {
//         selectedColumn.tasks.push(task);
//         await instance.post("/api/tasks", [task, selectedColumn.id]);
//         return task;
//       } else {
//         throw new Error("Selected column not found.");
//       }
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

export const onAddNewColumn = (state: DataState, action: AnyAction) => {
  const data = action.payload.title;
  const board = state.data.find((board) => board.isActive);
  board?.columns.push({
    id: board?.columns.length + 1,
    name: data,
    tasks: [],
  });
};

export const onAddNewBoard = (state: DataState, action: AnyAction) => {
  const data = action.payload.board;
  state.data.push(data);
};
