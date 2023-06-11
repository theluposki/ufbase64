import { Router } from 'express'
import User from '../model/User.js'

const router = Router()

router.get('/', (req,res) => {
  res.status(200).json([
    { 
      name: 'user 01', 
      email: 'user01@mail.com',
      password: '1234'
    }
  ])
})

router.post('/', async (req,res) => {
  const { nickname, email, password } = req.body
  
  if (!nickname) return res.status(400).json({ error: "Nome de usuário é obrigatório." });
  if (!email) return res.status(400).json({ error: "E-mail é obrigatório." });
  if (!password) return res.status(400).json({ error: "Senha é obrigatória." });
  
  try {
    const result = await User.register(req.body)

    if(result.error)
      return res.status(400).json(result)
    
    res.status(201).json(result)
  } catch (e) {
    res.status(400).json({ error: 'Error ao criar usuário.' })
  }
})

export default router