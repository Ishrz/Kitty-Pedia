import { Router } from "express";
import { aiRecommendController } from "../controllers/aiRecommend.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const router = Router()


router.post("/recommend" , asyncHandler(aiRecommendController))

export default router
