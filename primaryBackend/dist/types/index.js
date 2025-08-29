"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(5),
    name: zod_1.z.string().min(5),
});
exports.signInSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(5),
});
