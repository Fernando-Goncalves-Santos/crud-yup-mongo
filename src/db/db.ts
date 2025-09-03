import sql from "mssql";

const config: sql.config = {
  user: "sa",
  password: "SuaSenha123!",
  server: "localhost",
  database: "master",
  options: {
    trustServerCertificate: true,
  },
};

export const poolPromise: Promise<sql.ConnectionPool> = sql
  .connect(config)
  .then((pool) => {
    console.log("Conectado ao SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Erro de conexão:");
    throw err;
  });
