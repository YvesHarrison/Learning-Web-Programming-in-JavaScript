//const MongoClient = require("mongodb").MongoClient;
import Mongo from "mongodb";
const MongoClient = Mongo.MongoClient;
const settings = require("./settings");
const mongoConfig = settings.mongoConfig;

let _connection:any = undefined;
let _db:any = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};