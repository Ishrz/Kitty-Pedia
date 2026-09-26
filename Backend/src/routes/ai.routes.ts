import { Router } from "express";
import { askAiController } from "../controllers/ai.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const router = Router()


router.post("/ask" , asyncHandler(askAiController))

export default router
