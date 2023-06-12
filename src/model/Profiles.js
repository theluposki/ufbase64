import db from "../db/database.js";
import config from "../config.js";
import { access, unlink, constants } from "node:fs";

export default {
  async searchByLikeNickname(nickname, userId) {
    let conn;

    try {
      conn = await db.getConnection();

      const users = await conn.query(
        `SELECT up.id, up.nickname, up.picture
        FROM user_profiles AS up
        LEFT JOIN friends AS f ON up.user_id = f.user2_id AND f.user1_id = ?
        WHERE up.nickname LIKE ?
        AND f.id IS NULL
        AND up.user_id <> ?;
        `,
        [userId, `${nickname}%`, userId]
      );
      return users;
    } catch (error) {
      if (error) return { error: "Não foi possivel buscar esse usuário." };
    } finally {
      if (conn) conn.release();
    }
  },

  async editProfile(body, userId, avatar) {
    const { bio, links } = body;

    const picture = `${config.app.baseUrl}/uploads/${avatar.filename}`;

    let conn;
    try {
      conn = await db.getConnection();

      const myProfile = await conn.query("SELECT picture FROM user_profiles WHERE user_id=?;", [userId]);

      const oldImage = myProfile[0].picture.split("/uploads/")[1];

      const filePath = `src/uploads/${oldImage}`;

      access(filePath, constants.F_OK, (error) => {
        if (error) {
          console.error("[ FS ] O arquivo não existe ou não é acessível.");
          return;
        }
        unlink(filePath, (error) => {
          if (error) {
            console.error(
              "[ FS ] Ocorreu um erro ao deletar o arquivo:",
              error
            );
            return;
          }
          console.log("[ FS ] Arquivo deletado com sucesso.");
        });
      });

      const profile = await conn.query(
        `
        UPDATE user_profiles
        SET bio = ?, picture = ?, links = ?
        WHERE user_id = ?;
        `,
        [bio, picture, links, userId]
      );

      console.log(profile.affectedRows);

      if (profile.affectedRows === 1)
        return { message: "perfil editado com sucesso!" };
    } catch (error) {
      if (error) return { error: "Não foi editar esse usuário." };
    } finally {
      if (conn) conn.release();
    }
  },

  async getMyProfile(userId) {
    let conn;
    try {
      conn = await db.getConnection();

      const profile = await conn.query(
        `SELECT
          id,
          nickname,
          bio,
          picture,
          links,
          created_at,
          updated_at
          FROM user_profiles WHERE user_id=?;`,
        [userId]
      );

      if (!profile[0])
        return { error: "Não foi possivel encontrar seu perfil!" };
      return profile[0];
    } catch (error) {
      if (error) return { error: "Não foi possivel buscar perfil!" };
    } finally {
      if (conn) conn.release();
    }
  },
};
