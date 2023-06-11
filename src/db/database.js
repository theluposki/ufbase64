import mariadb from 'mariadb'
import config from '../config.js'
import { createTables } from './createTables.js';

const pool = mariadb.createPool(config.mariadb);

pool.getConnection()
  .then(conn => {
    console.log('[ DB ] Conexão estabelecida com sucesso.');
    conn.release();
  })
  .catch(err => {
    console.error('[ DB ] Erro ao conectar-se ao banco de dados:', err);
  });

await createTables(pool) 

export default pool