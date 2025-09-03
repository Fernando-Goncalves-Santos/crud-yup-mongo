import { poolPromise } from "../db/db.ts";

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
  phone: string;
}

export async function criarTabelaUsuarios(): Promise<void> {
  const pool = await poolPromise;
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuarios' AND xtype='U')
    CREATE TABLE Usuarios (
      id INT IDENTITY(1,1) PRIMARY KEY,
      nome NVARCHAR(100) NOT NULL,
      email NVARCHAR(100) NOT NULL UNIQUE,
      senha NVARCHAR(255) NOT NULL,
      phone NVARCHAR(255) NOT NULL
    )
  `);
  console.log("Tabela 'Usuarios' criada ou já existia");
}

export async function criarUsuario(usuario: Usuario): Promise<void> {
  const pool = await poolPromise;
  await pool
    .request()
    .input("nome", usuario.nome)
    .input("email", usuario.email)
    .input("senha", usuario.senha)
    .query(
      "INSERT INTO Usuarios (nome, email, senha) VALUES (@nome, @email, @senha)"
    );
}

export async function listarUsuarios() {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .query("SELECT id, nome, email FROM Usuarios");
  return result.recordset;
}
