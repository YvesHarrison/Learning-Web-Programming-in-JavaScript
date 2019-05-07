"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const configRoutes = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
configRoutes(app);
app.listen(3000, () => {
    console.log("We've got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
//# sourceMappingURL=app.js.map