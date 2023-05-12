import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import config from "./config";
import routes from "./routes";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import errorMiddleware from "./middleware/error.middleware";

const PORT = config.port || 5000;

const app: express.Application = express();

app.use(express.json());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests from this IP, Please try again in 60 seconds",
  })
);
app.use("/api", routes);

app.get("/", function (req: Request, res: Response) {
  // throw new Error("Error exist");
  res.json({
    message: "hello",
  });
});

app.use(errorMiddleware);

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home 😂",
  });
});

app.listen(PORT, function () {
  console.log(`app running on => ${PORT}`);
});

export default app;
