import { readFileSync } from "node:fs";
import jwt from "jsonwebtoken";

const privateKey = readFileSync("./server.key");
const publicKey = readFileSync('./server.key');

export default {
  sign(userId) {
    return jwt.sign(
      {
        id: userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1h
      },
      privateKey,
      { algorithm: "RS256" }
    );
  },
  verify(token) {
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  }
};
