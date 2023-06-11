import { Router } from 'express'
import { validateToken } from '../middlewares/validToken.js'
import Profiles from '../model/Profiles.js'

const router = Router()

router.post('/search-by-nickname', async (req,res) => {
  const { nickname } = req.body
  
  if (!nickname) return res.status(400).json({ error: "Nome de usuário é obrigatório." });
  
  try {
    const result = await Profiles.searchByLikeNickname(nickname)

    if(result.error)
      return res.status(400).json(result)
    
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json({ error: 'Error buscar usuário' })
  }
})

export default router