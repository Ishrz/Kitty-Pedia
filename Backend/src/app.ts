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

app.use("/api/cat" , catRouter)


export default app;