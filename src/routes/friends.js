import { Router } from "express";
import { validateToken } from "../middlewares/validToken.js";
import Friends from "../model/Friends.js";

const router = Router();

router.get("/", validateToken, (req, res) => {
  res.status(200).json([
    {
      id: "c7135139-4467-4202-ba95-c6a6fcc049da",
      user_id: "7a31ff5a-96a6-48fc-bef7-59793c94c09b",
    },
  ]);
});

router.post("/send-request", validateToken, async (req, res) => {
  const { nickname } = req.body

  if(!nickname) return res.status(400).json({ error: "informe o usuário."})

  try {
    const result = await Friends.sendRequest(req.user.id ,req.body);

    if (result.error) return res.status(400).json(result);

    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: "Error ao solicitar amizade" });
  }
});

router.get("/requests", validateToken, async (req, res) => {  
    try {
      const result = await Friends.getRequests(req.user.id);
  
      if (result.error) return res.status(400).json(result);
  
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Error ao buscar pedidos de amizade" });
    }
});


router.post("/add-friend", validateToken, async (req, res) => {
    const { nickname, requestId } = req.body
  
    if(!nickname) return res.status(400).json({ error: "informe o usuário."})
    if(!requestId) return res.status(400).json({ error: "informe o indentificador do pedido."})
    
    try {
      const result = await Friends.addFriend(req.user.id ,req.body);
  
      if (result.error) return res.status(400).json(result);
  
      res.status(201).json(result);
    } catch (e) {
      res.status(400).json({ error: "Error não foi possivel adicionar amizade" });
    }
  });

  router.get("/my", validateToken, async (req, res) => {  
    try {
      const result = await Friends.myFriends(req.user.id);
  
      if (result.error) return res.status(400).json(result);
  
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Error ao buscar amigos" });
    }
});

export default router;
