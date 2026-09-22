import { Router } from "express";
import { askAiController } from "../controllers/ai.controller.ts";

const router = Router()


router.post("/ask" , askAiController)



export default router