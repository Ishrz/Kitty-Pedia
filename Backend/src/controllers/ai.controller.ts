import type { Request, Response } from "express";
import { aiGemini } from "../services/ai.service.ts";

export const askAiController =async (req:Request , res:Response) =>{
    const {prompt} = req?.body


    const result = await aiGemini(prompt)

    res.status(200).json({
        message:"Response message generated successfully",
        success:true,
        data:result
    })
}

