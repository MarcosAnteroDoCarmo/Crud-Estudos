import express from "express";
import bodyParser from "body-parser";
import router from "../router/userRoutes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const portaDoServidor = 3002;

app.listen(portaDoServidor, () => {
  console.log(`O servidor esta rodando na porta ${portaDoServidor}`);
});
