import usersRouter from './users.js'
import profilesRouter from './profiles.js'
import friendsRouter from './friends.js'

const v1 = '/v1'

async function routes (app) {
  app.use(`${v1}/users`, usersRouter)
  app.use(`${v1}/profiles`, profilesRouter)
  app.use(`${v1}/friends`, friendsRouter)
}

export default routes