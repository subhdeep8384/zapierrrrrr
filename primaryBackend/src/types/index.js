"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.signInSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(5),
    name: zod_1.z.string().min(5),
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(5),
});
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(5),
    name: zod_1.z.string().min(5),
    email: zod_1.z.string().min(5),
});
