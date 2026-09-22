import type { Request, Response } from "express";
import { createCatService, getAllCatsService, getCatByIdService, recommendCatService, searchCatService } from "../services/cat.service.ts";

//create cat controller
export const createCatController = async (req:Request,res:Response) => {

    const result  = await createCatService(req.body)

    res.status(201).json({
        message:"cat created successfully",
        data:result
    })
}

//get All Cats controller
export const getAllCatsController = async (req:Request,res:Response) => {

    const result  = await getAllCatsService()

    res.status(200).json({
        message:"cat fetched successfully",
        data:result
    })
}

//get Cat by Id controller
export const getCatByIdContoller = async (req:Request , res:Response) => {
    const id = req?.params?.id as string

    const result  = await getCatByIdService(id)

    res.status(200).json({
        message:"cat fetched successfully",
        data:result
    })
}

//Search Cat
export const searchCatContoller = async (req:Request , res:Response) => {
    const q = req?.query.q as string
    console.log("route search hit")
    console.log(q)

    const result  = await searchCatService(q)

    res.status(200).json({
        message:"cats fetched successfully",
        data:result
    })
}

//recommended Cat services

export const recommendCatController = async (req: Request, res: Response) => {
    const { isKidsFriendly, isAppartmentFriendly } = req?.body

    const result = await recommendCatService( isKidsFriendly, isAppartmentFriendly)

    res.status(200).json({
        message:"Cats search successfully",
        success:true,
        data:result
    })
}
