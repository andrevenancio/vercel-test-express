"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
dotenv_1.default.config();
app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel.3");
});
app.get("/ping", (_req, res) => {
    return res.json({
        message: "pong 🏓",
        test: process.env.TEST || "not defined",
    });
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map