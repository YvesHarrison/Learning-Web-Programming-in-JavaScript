const tasksRoutes = require("./tasks");

const constructorMethod = app => {
  app.use("/",  tasksRoutes );
  
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;