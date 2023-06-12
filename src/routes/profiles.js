import { Router } from 'express'
import { validateToken } from '../middlewares/validToken.js'
import Profiles from '../model/Profiles.js'
import { upload } from '../util/upload.js'

const router = Router()

router.post('/search-by-nickname', validateToken, async (req,res) => {
  const { nickname } = req.body
  
  if (!nickname) return res.status(400).json({ error: "Nome de usuário é obrigatório." });
  
  try {
    const result = await Profiles.searchByLikeNickname(nickname, req.user.id)

    if(result.error)
      return res.status(400).json(result)
    
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json({ error: 'Error buscar usuário' })
  }
})


router.post('/edit-profile', validateToken, upload.single('picture'), async (req, res) => {
  try {
    const result = await Profiles.editProfile(req.body, req.user.id, req.file);

    if (result.error)
      return res.status(400).json(result);

    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: 'Erro na edição do perfil' });
  }
});



router.get('/my', validateToken, async (req, res) => {
  try {
    const result = await Profiles.getMyProfile(req.user.id);

    if (result.error)
      return res.status(400).json(result);

    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: 'Erro na busca do perfil' });
  }
});


export default router