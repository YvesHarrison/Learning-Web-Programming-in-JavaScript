const login = require("./login");


const constructorMethod = app => {
  app.use("/",  login );
  
  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;