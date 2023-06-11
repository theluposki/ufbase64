import { randomUUID } from 'node:crypto'

const generateUUID = () => randomUUID()

export default {
  register (email, password) {
    return { 
      message: 'Usuário criado com sucesso!' 
    }
  },
  auth (email, password) {
    return { 
      message: 'Autenticado com sucesso!' 
    }
  }
}