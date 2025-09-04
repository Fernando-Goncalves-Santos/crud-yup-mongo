import { poolPromise } from "../db/db.ts";
import { type Request, type Response } from "express";
import userSchema from "../yup/yupSchema.ts";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .query("SELECT id, nome, email FROM Usuarios");
      return res.status(200).json(result.recordset);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar ussuários: ${error}` });
    }
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    const newUser = { name, email, password, phone };

    const parsedUser = userSchema.cast(newUser);

    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("nome", parsedUser.name)
        .input("email", parsedUser.name)
        .input("senha", password)
        .input("phone", phone)
        .query(
          "INSERT INTO Usuarios (nome, email, senha, phone) VALUES (@nome, @email, @senha, @phone)"
        );

      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao criar usuário: ${error}` });
    }
  }

  static async removeUser(req: Request, res: Response) {
    const id = req.params.id;

    const pool = await poolPromise;

    try {
      const selectResult = await pool
        .request()
        .input("id", id)
        .query("SELECT nome FROM Usuarios WHERE id = @id");

      if (selectResult.recordset.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await pool
        .request()
        .input("id", id)
        .query("DELETE FROM Usuarios WHERE id = @id");

      return res
        .status(200)
        .json({ message: `Usuário de id: ${id} removido com sucesso` });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erro ao excluir usuário", error: err });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const pool = await poolPromise;

    try {
      const selectResult = await pool
        .request()
        .input("id", id)
        .query("SELECT nome FROM Usuarios WHERE id = @id");

      if (selectResult.recordset.length === 0) {
        res.status(404).json({ message: "Usuário não encontrado" });
      }

      await pool
        .request()
        .input("id", id)
        .input("name", name)
        .input("email", email)
        .input("phone", phone)
        .query(
          `UPDATE Usuarios SET nome = @name, email = @email, phone = @phone WHERE id = @id`
        );

      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar o usuário" });
    }
  }
}
