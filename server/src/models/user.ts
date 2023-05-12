import Client from "../database";
import bcrypt from "bcrypt";
import config from "../config";

const hashPass = (pass: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${pass}${config.pepper}`, salt);
};

export type User = {
  id: string;
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
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
      const sql = "SELECT password FROM users WHERE email=$1";
      const result = await conn.query(sql, [email]);

      if (result.rows.length) {
        const { password: hashedPasswordFromDB } = result.rows[0];

        // compare user password
        const isValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashedPasswordFromDB
        );

        if (isValid) {
          const userInfo = await conn.query(
            "SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)",
            [email]
          );
          return userInfo.rows[0];
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
