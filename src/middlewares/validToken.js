import jwt from '../crypto/jwt.js';
import dateExp from '../util/dateExp.js';

async function validateToken(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token);
      const now = Date.now().valueOf() / 1000;

      if (decoded.exp < now)
        return res
          .status(401)
          .json({ message: "Falha na autenticação: token expirado" });

      req.user = {
        id: decoded.id,
        exp: dateExp(decoded.exp),
      };

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Falha na autenticação: token inválido" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Falha na autenticação: cookie do token ausente" });
  }
}

export { validateToken };
