import db from "../db/database.js";

export default {
  async searchByLikeNickname(nickname) {
    let conn;

    try {
      conn = await db.getConnection();

      const users = await conn.query(
        `SELECT up.id, up.nickname, up.picture 
         FROM user_profiles AS up 
         WHERE up.nickname like ?`,
        [`${nickname}%`]
      );
      return users;
    } catch (error) {
      if (error) return { error: "Não foi possivel buscar esse usuário." };
    } finally {
      if (conn) conn.release();
    }
  },
};
