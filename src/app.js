import express from "express";

import routes from "./routes";

// Importando nossa database
import "./database";

class App {
  constructor() {
    // iniciando o express
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // informando que será enviando um json como resposta
  middlewares() {
    this.server.use(express.json());
  }

  // importando todas as nossas rotas do arquivo criado
  routes() {
    this.server.use(routes);
  }
}
// exportando nosso server
export default new App().server;
