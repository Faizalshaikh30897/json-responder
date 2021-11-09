import express, { json ,Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import Logger from "jet-logger";
import mongoose from "mongoose";
import {default as GenerateRouter} from './routes/generate';
import {default as PublicRouter} from './routes/public';
import cors from "cors";

dotenv.config();

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;
  app.use(cors({
    origin: "http://localhost:3000"
  }))
  app.use(json());
  app.use("/api/v1/",GenerateRouter);
  app.use("/api/v1/public/",PublicRouter);
  app.use((err:any, _: Request, res: Response, _next: NextFunction)  => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  setupDB();
  app.listen(port, () => {
    Logger.Info(`app started on port ${port}`);
  });
};

const setupDB = () => {
  mongoose
    .connect(process.env.MONGO_URL!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((_) => {
      Logger.Info("connected to database");
    })
    .catch((err) => Logger.Err(err));
};

main().catch((err) => {
  Logger.Err(err);
});

