import { Router } from "express";
import { createCatController, getAllCatsController, getCatByIdContoller, recommendCatController, searchCatContoller } from "../controllers/cat.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const router = Router()

//create cat route
router.post("/create", asyncHandler(createCatController))


//get All cats
router.get("/", asyncHandler(getAllCatsController))

//Search cat
router.get("/search" ,asyncHandler(searchCatContoller))

//search cat by id
router.get("/:id", asyncHandler(getCatByIdContoller))


//get recommend cat
router.post("/recommend" , asyncHandler(recommendCatController))

export default router
