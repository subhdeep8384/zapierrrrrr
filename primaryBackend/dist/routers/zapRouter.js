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
exports.zapRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("./middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("INSIDE create Zap");
    const body = req.body;
    console.log("The cody is ::", body);
    const parsedData = types_1.zapCreateSchema.safeParse(body);
    console.log("Parsed data is ::", parsedData);
    if (!parsedData.success) {
        return res.status(400).json(parsedData.error);
    }
    // @ts-ignore
    const userId = parsedData.data.userId;
    try {
        yield db_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const userExists = yield tx.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                return res.status(400).json({ error: `User with id ${userId} does not exist` });
            }
            const { availableTriggerId, actions, } = parsedData.data;
            const zap = yield tx.zap.create({
                data: {
                    userId: userId,
                    triggerId: "",
                    actions: {
                        create: actions.map((action, index) => ({
                            actionId: action.availableActionId,
                            sortingOrder: index,
                        })),
                    },
                },
            });
            const trigger = yield tx.trigger.create({
                data: {
                    triggerId: availableTriggerId,
                    zapId: zap.id,
                },
            });
            yield tx.zap.update({
                where: { id: zap.id },
                data: { triggerId: trigger.id },
            });
            res.json({
                message: "Zap created successfully",
                status: 200,
                data: zap,
            });
        }));
    }
    catch (err) {
        console.error("Error creating Zap:", err);
        res.status(500).json({ error: "Internal server error", details: err });
    }
}));
router.get("/allzaps/:userId", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = parseInt(req.params.userId);
    const zaps = yield db_1.prismaClient.zap.findMany({
        where: {
            userId: id
        }, include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    res.send({
        zaps: zaps
    });
}));
router.get("/:zapId", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zap = yield db_1.prismaClient.zap.findUnique({
        where: {
            id: req.params.zapId,
        }
    });
    res.send(zap);
}));
exports.zapRouter = router;
