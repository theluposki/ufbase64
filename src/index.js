import * as dotenv from 'dotenv'
import https from "node:https"
import { app } from './app.js'
import config from './config.js'

dotenv.config()

const server = https.createServer(config.certificates, app)

server.listen(config.app.port, () => {
  console.log(`APP Listening at 🚀${config.app.host}:${config.app.port}`)
})