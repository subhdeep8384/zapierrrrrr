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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../config");
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.signUpSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            status: 400,
        });
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
        },
        select: {
            id: true,
            username: true,
            image: true,
        }
    });
    if (!userExists) {
        const newUser = yield db_1.prismaClient.user.create({
            data: parsedData.data,
        });
        return res.status(200).json({
            message: "User created successfully",
            status: 200,
            data: newUser.username,
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: userExists === null || userExists === void 0 ? void 0 : userExists.id,
        username: userExists === null || userExists === void 0 ? void 0 : userExists.username,
        image: userExists === null || userExists === void 0 ? void 0 : userExists.image,
    }, config_1.JWT_PASSWORD);
    res.cookie("token", token);
    return res.status(200).json({ message: "login successful" });
}));
router.get("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.signInSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json(parsedData.error);
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
        },
        select: {
            id: true,
            username: true,
            password: true
        }
    });
    if (!userExists) {
        return res.status(400).json("User does not exist");
    }
    const token = jsonwebtoken_1.default.sign({
        id: userExists.id,
        username: userExists.username,
    }, config_1.JWT_PASSWORD);
    res.cookie("token", token);
    res.status(200).json({ message: "login successful" });
}));
router.get("/me", middleware_1.authMiddleware, (req, res) => {
    // @ts-ignore
    const body = req.user;
    return res.send(body);
});
exports.userRouter = router;
