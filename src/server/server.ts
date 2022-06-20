import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "../router/userRoutes";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const portaDoServidor = 3002;

app.post("/", (req, res) => res.send(req.body)); 

app.listen(portaDoServidor, () => {
  console.log(`O servidor esta rodando na porta ${portaDoServidor}`);
});
