import express from "express";
import { UserController } from "./controllers/UserController.ts";
import { criarTabelaUsuarios } from "./model/User.ts";

const app = express();

app.use(express.json());

app.get("/users", UserController.getUsers);
app.post("/users", UserController.createUser);
app.delete("/users/:id", UserController.removeUser);
app.put("/users/:id", UserController.updateUser);

app.listen(3000, () => {
  criarTabelaUsuarios();
  console.log("app rodando na porta 3000");
});
