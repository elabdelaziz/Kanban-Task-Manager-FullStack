import Client from "../database";
import bcrypt from "bcrypt";
import config from "../config";
import { groupBy } from "lodash";
import { User, Board, Task, Column } from "../types/dataTypes";
const hashPass = (pass: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${pass}${config.pepper}`, salt);
};

class UserStore {
  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (email, user_name, first_name, last_name, password) VALUES($1, $2, $3, $4, $5) RETURNING *";

      const result = await conn.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPass(u.password),
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.first_name}): ${err}`);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at getting users${(error as Error).message}`);
    }
  }

  async getSingleUser(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error at getting specific user${(err as Error).message}`
      );
    }
  }

  async updateSingleUser(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING *`;
      const result = await conn.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPass(u.password),
        u.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update single user${(err as Error).message}`);
    }
  }

  async deleteSingleUser(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM users WHERE id=($1) RETURNING *`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete single user${(err as Error).message}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = `
      SELECT
      u.id,
      u.email,
      u.user_name,
      u.first_name,
      u.last_name,
      u.password,
      b.id AS board_id,
      b.title AS board_title,
      c.id AS column_id,
      c.title AS column_title,
      t.id AS task_id,
      t.title AS task_title,
      st.id AS subtask_id,
      st.title AS subtask_title
      FROM users u
      LEFT JOIN boards b ON u.id = b.user_id
      LEFT JOIN columns c ON b.id = c.board_id
      LEFT JOIN tasks t ON c.id = t.column_id
      LEFT JOIN subtasks st ON t.id = st.task_id
      WHERE u.email = $1
    `;
      const result = await conn.query(sql, [email]);

      if (result.rows.length) {
        const { password: hashedPasswordFromDB } = result.rows[0];

        // compare user password
        const isValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashedPasswordFromDB
        );

        if (isValid) {
          const user: any = {
            id: result.rows[0].id,
            email: result.rows[0].email,
            user_name: result.rows[0].user_name,
            first_name: result.rows[0].first_name,
            last_name: result.rows[0].last_name,
            boards: [],
          };

          // group the rows by board
          const boardGroups = groupBy(result.rows, "board_id");

          for (const boardId in boardGroups) {
            if (boardGroups.hasOwnProperty(boardId)) {
              const boardRows = boardGroups[boardId];
              const board: Board = {
                id: boardRows[0].board_id,
                name: boardRows[0].board_title,
                columns: [],
              };

              // group the rows by column
              const columnGroups = groupBy(boardRows, "column_id");

              for (const columnId in columnGroups) {
                if (columnGroups.hasOwnProperty(columnId)) {
                  const columnRows = columnGroups[columnId];
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
                      taskRows.forEach((row) => {
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

                  // add column to board
                  if (column.id !== null) {
                    board.columns.push(column);
                  }
                }
              }

              // add board to user
              if (board.id !== null) {
                user.boards.push(board);
              }
            }
          }

          conn.release();
          return user;
        }
      }

      conn.release();
      return null;
    } catch (err) {
      throw new Error(
        `There's a problem logging in: ${(err as Error).message}`
      );
    }
  }
}
export default UserStore;
