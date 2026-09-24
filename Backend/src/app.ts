import express, { type Request, type Response } from "express";
import morgan from "morgan"
const app = express()

app.use(express.json())
app.use(morgan("dev"))

//health check
app.get("/",async (req:Request,res:Response) => {

    res.send({
        messsage:"server is running successfully",
        success:true,
        status:200
    })

})

import catRouter from "./routes/cat.route.ts"
import aiRouter from "./routes/ai.routes.ts"
import aiRecommendRoute from "./routes/aiRecommend.route.ts"
import mcpTestRoute from "./routes/test_mcp_server.route.ts"
app.use("/api/cat" , catRouter)

app.use("/api/ai" , aiRouter)

app.use("/api/aiRecommend" , aiRecommendRoute)

app.use("/api/mcpTest" , mcpTestRoute)


export default app;