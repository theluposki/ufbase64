import { readFile } from 'fs';

const filePath = './create_tables.sql';

function readSQLFile(filePath) {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function executeSQLCommands(connection, sqlCommands) {
  try {
    for (const sqlCommand of sqlCommands) {
      await connection.query(sqlCommand);
    }
    console.log('[ DB ] Tabelas criadas com sucesso.');
  } catch (error) {
    console.error('[ DB ] Ocorreu um erro ao criar as tabelas:', error.message);
  }
}

async function createTables(connection) {
  try {
    const sqlScript = await readSQLFile(filePath);
    const sqlCommands = sqlScript.split(';').map((command) => command.trim()).filter((command) => command);
    await executeSQLCommands(connection, sqlCommands);
  } catch (error) {
    console.error('[ DB ] Ocorreu um erro ao criar as tabelas:', error.message);
  }
}

export { createTables }
