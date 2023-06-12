import express from 'express'
import cors from 'cors'
import config from './config.js'
import cookieParser from 'cookie-parser';
import routes from './routes/index.js'

const app = express()

app.use(cors(config.cors))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('src/uploads'))

await routes(app)


app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

export { app }