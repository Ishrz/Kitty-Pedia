import {Router} from "express"
import { testMcpController } from "../controllers/testMcp.controller.ts"
import { asyncHandler } from "../utils/asyncHandler.ts"

const router = Router()

router.post("/" , asyncHandler(testMcpController))

export default router
