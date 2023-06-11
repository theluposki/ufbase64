import mariadb from 'mariadb'
import config from '../config.js'

const pool = mariadb.createPool(config.mariadb);

pool.getConnection()
  .then(conn => {
    console.log('Conexão estabelecida com sucesso.');
    conn.release();
  })
  .catch(err => {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  });

export default pool