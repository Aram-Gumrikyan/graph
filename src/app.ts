import express, { NextFunction, Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";
import ServerError from "./exceptions/ServerError";

import routesV1 from "./routes/v1";
import templateRoutesV1 from "./templateRoutes/v1";

const app = express();

app.engine(
  "handlebars",
  engine({
    partialsDir: path.resolve(__dirname, "views/components"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));

app.use("/api/v1", routesV1);
app.use("/", templateRoutesV1);

app.use(
  (
    error: ServerError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!ServerError.check(error)) {
      const status = 500;
      res.status(status).json({ message: ServerError.message(status) });
      return;
    }

    const status = error.getStatus();
    res
      .status(status)
      .json({ message: error.message || ServerError.message(status) });
    next();
  }
);

export default app;
