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
  const { email, password } = req.body
  
  if(!email || !password) 
    return res.status(400).json({ error: 'Usuário e senha são obrigatorios' })
  
  try {
    const result = await User.register(email, password)
    
    res.status(201).json(result)
  } catch (e) {
    res.status(400).json({ error: 'Error ao criar usuário.' })
  }
})

export default router