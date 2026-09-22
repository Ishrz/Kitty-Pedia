import type { Request, Response } from "express";
import { aiRecommendService } from "../services/aiRecommend.service.ts";

export const aiRecommendController = async (req:Request , res:Response)  => {

    const {isKidsFriendly , isAppartmentFriendly} = req?.body

   const result = await aiRecommendService(isKidsFriendly , isAppartmentFriendly)

    res.status(200).json({
        message:"Ai recommendation generated successfully",
        success:true,
        data:result
    })

}