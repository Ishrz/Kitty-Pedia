import { Router } from "express";
import { aiRecommendController } from "../controllers/aiRecommend.controller.ts";

const router = Router()


router.post("/recommend" , aiRecommendController)

export default router