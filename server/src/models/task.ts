import Client from "../database";
import { Column, Task } from "../types/dataTypes";
import { groupBy } from "lodash";

interface TaskProps {
  data: {
    title: string;
    id: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  };
  columnId: number;
}

class TaskStore {
  async create({ data, columnId }: TaskProps): Promise<Task> {
    const { title, subtasks } = data;
    console.log(data.title, columnId);
    try {
      const conn = await Client.connect();
      const firstCall =
        "INSERT INTO tasks (title, column_id) VALUES($1, $2) RETURNING *";
      const firstCallResult = await conn.query(firstCall, [title, columnId]);
      console.log("title at 17", title);
      const task = firstCallResult.rows[0];

      if (subtasks) {
        subtasks.forEach(async (subtask) => {
          const secondCall =
            "INSERT INTO subtasks (title, completed, task_id) VALUES($1, $2, $3) RETURNING *";
          const secondCallResult = await conn.query(secondCall, [
            subtask.title,
            false,
            task.id,
          ]);
          const subtasks = secondCallResult.rows[0];
          console.log("subtask at 39", subtasks);
        });
      }

      conn.release();

      return task;
    } catch (err) {
      throw new Error(`unable to create task (${title}): ${err}`);
    }
  }

  async getUserTasks(colId: number): Promise<Task | null> {
    try {
      const conn = await Client.connect();
      const sql = `
      SELECT
        c.id AS column_id,
        c.title AS column_title,
        t.id AS task_id,
        t.title AS task_title,
        st.id AS subtask_id,
        st.title AS subtask_title
      FROM columns c
      LEFT JOIN tasks t ON c.id = t.column_id
      LEFT JOIN subtasks st ON t.id = st.task_id
      WHERE c.id = $1
    `;
      const result = await conn.query(sql, [colId]);

      if (result.rows.length) {
        const columnRows = result.rows;
        const column: Column = {
          id: columnRows[0].column_id,
          name: columnRows[0].column_title,
          tasks: [],
        };

        // group the rows by task
        const taskGroups = groupBy(columnRows, "task_id");

        for (const taskId in taskGroups) {
          if (taskGroups.hasOwnProperty(taskId)) {
            const taskRows = taskGroups[taskId];
            const task: Task = {
              id: taskRows[0].task_id,
              title: taskRows[0].task_title,
              subtasks: [],
            };

            // add subtasks to task
            taskRows.forEach((row: any) => {
              if (row.subtask_id) {
                task.subtasks.push({
                  id: row.subtask_id,
                  title: row.subtask_title,
                  isCompleted: row.subtask_completed,
                });
              }
            });

            // add task to column
            if (task.id !== null) {
              column.tasks.push(task);
            }
          }
        }
        const data = result.rows[0];

        conn.release();
        return data;
      }

      conn.release();
      return null;
    } catch (err) {
      throw new Error(`unable to delete task (${colId}): ${err}`);
    }
  }

  async deleteTask(id: number): Promise<Task> {
    console.log("id at 52", id);
    try {
      const conn = await Client.connect();
      const sql =
        "WITH deleted_subtasks AS (DELETE FROM subtasks WHERE (task_id) = ($1) RETURNING *) DELETE FROM tasks WHERE id = ($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      console.log("id at 58", id);
      const data = result.rows[0];

      conn.release();

      return data;
    } catch (err) {
      throw new Error(`unable to delete task (${id}): ${err}`);
    }
  }
}

export default TaskStore;
