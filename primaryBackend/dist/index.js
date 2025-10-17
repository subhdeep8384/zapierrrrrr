"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routers/userRouter");
const zapRouter_1 = require("./routers/zapRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const triggerRouter_1 = require("./routers/triggerRouter");
const action_1 = require("./routers/action");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api/v1/user', userRouter_1.userRouter);
app.use('/api/v1/zap', zapRouter_1.zapRouter);
app.use('/api/v1/triggers', triggerRouter_1.triggerRouter);
app.use('/api/v1/actions', action_1.actionRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
