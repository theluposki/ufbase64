import db from "../db/database.js";
import bcrypt from "bcryptjs";

import { generateUUID } from "../crypto/index.js";
import jwt from "../crypto/jwt.js";
import config from "../config.js";

export default {
  async register(body) {
    const { nickname, email, password } = body;

    const id = generateUUID();
    const id2 = generateUUID();

    let conn;

    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      const userExists = await conn.query(
        "SELECT email FROM users WHERE email=?",
        [email]
      );

      const profileExists = await conn.query(
        "SELECT nickname FROM user_profiles WHERE nickname=?",
        [nickname]
      );

      if (userExists.length > 0 || profileExists.length > 0) {
        return { error: "E-mail ou nome de usuário já existe!" };
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const query1 = `INSERT INTO users (id, email, password) VALUES (?,?,?);`;
      const query2 = `INSERT INTO user_profiles (id, user_id, nickname, bio, picture, links) VALUES (?,?,?,?,?,?);`;

      await conn.query(query1, [id, email, hashPassword]);

      const profileDefault = {
        bio: "",
        picture: `${config.app.baseUrl}/uploads/150x150.svg`,
        links: "[]",
      };

      await conn.query(query2, [
        id2,
        id,
        nickname,
        profileDefault.bio,
        profileDefault.picture,
        profileDefault.links,
      ]);

      await conn.commit();

      return { success: "Usuário registrado com sucesso!" };
    } catch (error) {
      if (conn) {
        await conn.rollback();
      }
      console.log("Erro durante a transação:", error);
      return { error: "Ocorreu um erro durante a transação." };
    } finally {
      if (conn) {
        conn.release();
      }
    }
  },

  async auth(body) {
    const { email, password } = body;

    let conn;

    try {
      conn = await db.getConnection();

      const userExists = await conn.query(
        "SELECT id, email, password FROM users WHERE email=?;",
        [email]
      );

      if (!userExists[0]) return { error: "Usuário não encontrado!" };

      if (!bcrypt.compareSync(password, userExists[0].password))
        return { error: "Senha inválida!" };

      const userId = userExists[0].id;

      const token = jwt.sign(userId);

      const profile = await conn.query(
        `SELECT p.id, p.nickname, p.bio, p.picture, p.links, p.created_at
         FROM users AS u
         INNER JOIN user_profiles AS p ON u.id = p.user_id WHERE u.id = ?;
        `,
        [userId]
      );

      return { user: profile[0], message: "Autenticado com sucesso!", token };
    } catch (error) {
      return { error: "Erro na autenticação" };
    } finally {
      if (conn) conn.release();
    }
  },
};
