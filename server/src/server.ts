import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import config from "./config";
import routes from "./routes";

const PORT = config.port || 5000;

const app: express.Application = express();

app.use(bodyParser.json());

app.use("/api", routes);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(PORT, function () {
  console.log(`app running on => ${PORT}`);
});

export default app;
