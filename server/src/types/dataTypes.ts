export type User = {
  id: number;
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface Task {
  id: number;
  title: string;
  subtasks: {
    id: number;
    title: string;
    isCompleted: boolean;
  }[];
}

export type Column = {
  id: number;
  name: string;
  tasks: Task[]; // add explicit type annotation here
};
