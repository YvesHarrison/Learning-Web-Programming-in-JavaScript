var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dbConnection = require("./database_connection");
/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
    let _col = undefined;
    return () => __awaiter(this, void 0, void 0, function* () {
        if (!_col) {
            const db = yield dbConnection();
            _col = yield db.collection(collection);
        }
        return _col;
    });
};
/* Now, you can list your collections here: */
module.exports = {
    tasks: getCollectionFn("tasks")
};
//# sourceMappingURL=collection.js.map