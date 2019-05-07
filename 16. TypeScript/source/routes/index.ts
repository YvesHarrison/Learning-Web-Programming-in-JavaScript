const tasksRoutes = require("./tasks");
import { Application, Request, Response } from "express";

const constructorMethod = (app: Application) => {
  app.use("/api/",  tasksRoutes );
  
  app.use("*", (req: Request, res: Response) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;