"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasksRoutes = require("./tasks");
const constructorMethod = (app) => {
    app.use("/api/", tasksRoutes);
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};
module.exports = constructorMethod;
//# sourceMappingURL=index.js.map