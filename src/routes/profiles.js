import { Router } from 'express'

const router = Router()

router.get('/', (req,res) => {
  res.status(200).json([
    { 
      id: 'c7135139-4467-4202-ba95-c6a6fcc049da',
      user_id:'7a31ff5a-96a6-48fc-bef7-59793c94c09b',
      name: 'luposki',
      bio: 'Software engineer',
      picture: 'https://i.pravatar.cc/150?img=33',
      links: ['theluposki.com'],
      created_at: Date.now(),
      updated_at: Date.now()
    },
  ])
})

export default router