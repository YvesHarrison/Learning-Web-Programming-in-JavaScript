"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const MongoClient = require("mongodb").MongoClient;
const mongodb_1 = __importDefault(require("mongodb"));
const MongoClient = mongodb_1.default.MongoClient;
const settings = require("./settings");
const mongoConfig = settings.mongoConfig;
let _connection = undefined;
let _db = undefined;
module.exports = () => __awaiter(this, void 0, void 0, function* () {
    if (!_connection) {
        _connection = yield MongoClient.connect(mongoConfig.serverUrl);
        _db = yield _connection.db(mongoConfig.database);
    }
    return _db;
});
//# sourceMappingURL=database_connection.js.map