import express from "express";
import router from "../router/userRoutes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const ServerPort = 3002;

app.post("/", (req, res) => res.send(req.body)); 

app.listen(ServerPort, () => {
  console.log(`The server is running on port ${ServerPort}`);
});
