import {
  onGetLocalData,
  onDragAndDrop,
  onSetActiveColumn,
  onEditBoard,
  onDeleteBoard,
  onAddTask,
  onAddNewColumn,
  onAddNewBoard,
  onPopulateUserData,
} from "@/actions/dataSliceActions";
import { createSlice } from "@reduxjs/toolkit";

export interface ActiveBoard {
  activeBoardIndex: number;
  activeBoardTitle: string;
  // Add other properties if needed
}

export interface DataState {
  data: BoardsEntity[];
  activeColIndex: number;
}
export interface BoardsEntity {
  name: string;
  isActive: boolean;
  columns: ColumnsEntity[];
}
export interface ColumnsEntity {
  id: any;
  name: string;
  tasks: TasksEntity[];
}
export interface TasksEntity {
  title: string;
  description: string;
  id: any;
  status: string;
  subtasks: SubtasksEntity[];
}
export interface SubtasksEntity {
  title: string;
  isCompleted: boolean;
}

const initialState: DataState = {
  data: [],
  activeColIndex: 0,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getLocalData: (state, action) => onGetLocalData(state, action),
    populateUserData: (state, action) => onPopulateUserData(state, action),
    dragAndDrop: (state, action) => onDragAndDrop(state, action),
    setActiveColumn: (state, action) => {
      const activeColumn = onSetActiveColumn(state, action);
      state.activeColIndex = activeColumn;
    },
    editBoard: (state, action) => onEditBoard(state, action),
    deleteBoard: (state, action) => onDeleteBoard(state, action),
    addTask: (state, action) => onAddTask(state, action),
    addNewColumn: (state, action) => onAddNewColumn(state, action),
    addNewBoard: (state, action) => onAddNewBoard(state, action),
  },
});

export const {
  getLocalData,
  dragAndDrop,
  setActiveColumn,
  editBoard,
  deleteBoard,
  addTask,
  addNewColumn,
  addNewBoard,
  populateUserData,
} = dataSlice.actions;

export default dataSlice.reducer;
