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
//const Promise = bluebird.Promise;
const v4_1 = __importDefault(require("uuid/v4"));
const collection = require("../config/collection");
const tasks = collection.tasks;
function check(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}
const exportedMethods = {
    getAllTasks(skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            const task_collection = yield tasks();
            let get_tasks = yield task_collection.find({}).limit(take + skip).toArray();
            get_tasks = get_tasks.splice(skip);
            if (get_tasks && get_tasks.length > 0)
                return get_tasks;
            else
                throw "No tasks in database or you skip to many tasks!";
        });
    },
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id == null || id == undefined || id == "")
                throw "You must provide an id to search for";
            if (typeof (id) !== 'string')
                throw "Invalid id";
            const task_collection = yield tasks();
            const result = yield task_collection.findOne({ _id: id });
            if (result === null)
                throw "No such task in MongoDB";
            return result;
        });
    },
    addTask(title, description, hoursEstimated, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            const task_collection = yield tasks();
            let comment = [];
            const newPost = {
                _id: v4_1.default(),
                title: title,
                description: description,
                hoursEstimated: hoursEstimated,
                completed: completed,
                comments: comment
            };
            const newInsertInformation = yield task_collection.insertOne(newPost);
            if (newInsertInformation.insertedCount === 0)
                throw "Could not add task";
            const newId = newInsertInformation.insertedId;
            return yield this.getTaskById(newId);
        });
    },
    updateTask(id, title, description, hoursEstimated, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id == null || id == undefined || id == "")
                throw "You must provide an id to update for";
            const task_collection = yield tasks();
            const newdata = {
                title: title,
                description: description,
                hoursEstimated: hoursEstimated,
                completed: completed
            };
            const update = yield task_collection.updateOne({ _id: id }, { $set: newdata });
            if (update.modifiedCount === 0)
                throw "Could not update task successfully";
            else
                console.log("Update task successfully");
            return yield this.getTaskById(id);
        });
    },
    renewTask(id, title, description, hoursEstimated, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id == null || id == undefined || id == "")
                throw "You must provide an id to renew for";
            if ((title && typeof (title) !== "string") || (description && typeof (description) !== "string") || (hoursEstimated && !check(hoursEstimated)) || (completed != null && completed != undefined && typeof (completed) !== "boolean"))
                throw "Parameters missing or wrong";
            const task_collection = yield tasks();
            const newdata = {};
            if (title)
                newdata.title = title;
            if (description)
                newdata.description = description;
            if (Number(hoursEstimated) < 0)
                throw "Invalid hoursEstimated value!";
            if (hoursEstimated)
                newdata.hoursEstimated = hoursEstimated;
            if (completed != null && completed != undefined)
                newdata.completed = completed;
            const update = yield task_collection.updateOne({ _id: id }, { $set: newdata });
            if (update.modifiedCount === 0)
                throw "Could not renew task successfully";
            else
                console.log("Renew task successfully");
            return yield this.getTaskById(id);
        });
    },
    addComment(taskId, name, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (taskId == null || taskId == undefined || taskId == "")
                throw "You must provide an taskId for adding comment";
            if (name == null || name == undefined || name == "")
                throw "You must provide a name for a comment";
            if (comment == null || comment == undefined || comment == "")
                throw "You must provide a comment for a comment";
            if (typeof (name) !== "string")
                throw "Invalid name type!";
            if (typeof (comment) !== "string")
                throw "Invalid comment type!";
            const task_collection = yield tasks();
            let task = yield this.getTaskById(taskId);
            const newComment = {
                _id: v4_1.default(),
                name: name,
                comment: comment
            };
            task.comments.push(newComment);
            const update = yield task_collection.updateOne({ _id: taskId }, { $set: task });
            if (update.modifiedCount === 0)
                throw "Could not add comment successfully";
            else
                console.log("Add comment successfully");
            return yield this.getTaskById(taskId);
        });
    },
    deleteComment(taskId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (taskId == null || taskId == undefined || taskId == "")
                throw "You must provide an taskId for deleting comment";
            if (commentId == null || commentId == undefined || commentId == "")
                throw "You must provide an commentId for deleting comment";
            const task_collection = yield tasks();
            let task = yield this.getTaskById(taskId);
            let erased = false;
            for (let i = 0; i < task.comments.length; ++i) {
                if (task.comments[i]._id == commentId) {
                    erased = true;
                    task.comments.splice(i, 1);
                    break;
                }
            }
            if (erased) {
                const update = yield task_collection.updateOne({ _id: taskId }, { $set: task });
                if (update.modifiedCount === 0)
                    throw "Could not delete comment successfully";
                else
                    console.log("Delete comment successfully");
                return yield this.getTaskById(taskId);
            }
            else
                throw "Cannot find comment with '$commentId'";
        });
    }
};
module.exports = exportedMethods;
//# sourceMappingURL=tasks.js.map