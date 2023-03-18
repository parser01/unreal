"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;
const client = new mongodb_1.MongoClient(DB_URL);
const DB_NAME = process.env.DB_NAME;
let db;
class ServerDb {
    connectToDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield client.connect();
                db = conn.db(DB_NAME);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getDb() {
        return db;
    }
}
exports.default = new ServerDb();
