import {Router} from "express"
import { testMcpController } from "../controllers/testMcp.controller.ts"

const router = Router()

router.post("/" , testMcpController)

export default router