require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const connection = new Pool({
  user: "postgres",
  password: process.env.PASSWORD,
  host: "localhost",
  port: "5432",
  database: "chat",
});

class User {
  static async findByUsername(username) {
    const query = "SELECT * FROM users WHERE username = $1";
    const { rows } = await connection.query(query, [username]);
    return rows[0];
  }
  static async comparePassword(password, hashedPass) {
    const validated = await bcrypt.compare(password, hashedPass);
    return validated;
  }
  static async createUser(username, password) {
    try {
      const query =
        "INSERT INTO users(username, password_hash) VALUES ($1, $2) RETURNING user_id";
      const { rows } = await connection.query(query, [username, password]);
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }
  static async getById(id) {
    const query = "SELECT * FROM users WHERE user_id = $1";
    const { rows } = await connection.query(query, [id]);
    return rows[0];
  }
  static async getAll() {
    const query = "SELECT * FROM users";
    const { rows } = await connection.query(query);
    return rows;
  }
}

module.exports = {
  User,
};
