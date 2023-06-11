import { readFileSync }from "node:fs"

export default {
  certificates: {
    key: readFileSync("./server.key"),
    cert: readFileSync("./server.crt")
  },
  app: {
    port: process.env.APP_PORT || 3000,
    host: process.env.APP_HOST || `https://localhost`
  },
  cors: {
    origin: 'https://localhost:5173',
    credentials: true
  },
  mariadb: {
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 5
  }
}