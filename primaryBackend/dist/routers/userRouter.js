"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("./middleware");
const types_1 = require("../types");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => {
    res.send("signup");
});
router.get("signin", (req, res) => {
    const body = req.body;
    const parsedData = types_1.signInSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json(parsedData.error);
    }
    const userExists = await;
});
router.get("/", middleware_1.authMiddleware, (req, res) => {
    res.send("user");
});
exports.userRouter = router;
