import db from "../db/database.js";
import { generateUUID } from "../crypto/index.js";

export default {
  async sendRequest(userId, body) {
    const { nickname } = body;

    const id = generateUUID();
    let conn;

    try {
      conn = await db.getConnection();

      const FriendUser = await conn.query(
        `SELECT u.id, up.user_id, up.nickname, up.picture 
         FROM user_profiles AS up 
         INNER JOIN users AS u ON u.id = up.user_id
         WHERE up.nickname = ?;`,
        [nickname]
      );

      if (FriendUser[0].user_id === userId)
        return { error: "Você não pode adicionar você mesmo!" };

      const checkIfYouHaveAlreadyOrdered = await conn.query(
        `SELECT * FROM friend_requests WHERE sender_id = ? AND recipient_id = ?`,
        [userId, FriendUser[0].user_id]
      );

      if (checkIfYouHaveAlreadyOrdered[0])
        return { error: "Já tem um pedido, aguardando aprovação." };
      if (
        checkIfYouHaveAlreadyOrdered[0] &&
        checkIfYouHaveAlreadyOrdered[0].status === "approved"
      )
        return { error: "Seu pedido ja foi aceito." };

      const requestFriend = await conn.query(
        `
        INSERT INTO friend_requests (id, sender_id, recipient_id)
        VALUES (?,?,?);
        `,
        [id, userId, FriendUser[0].user_id]
      );

      if (requestFriend.affectedRows === 1)
        return { message: "Pedido enviado com sucesso!", status: 201 };
    } catch (error) {
      if (error) return { error: "Não foi possivel solicitar." };
    } finally {
      if (conn) conn.release();
    }
  },

  async getRequests(userId) {
    let conn;

    try {
      conn = await db.getConnection();

      const requestFriends = await conn.query(
        `SELECT fr.id, up.nickname, up.picture, fr.status 
          FROM user_profiles AS up 
          INNER JOIN friend_requests AS fr 
          ON up.user_id = fr.sender_id 
          WHERE fr.recipient_id = ?
          AND fr.status = 'pending';`,
        [userId]
      );

      return requestFriends;
    } catch (error) {
      if (error) return { error: "Não foi possivel solicitar." };
    } finally {
      if (conn) conn.release();
    }
  },

  async addFriend (userId, body) {
    return { userId, body }
  }
};
