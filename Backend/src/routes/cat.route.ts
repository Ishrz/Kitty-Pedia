import { Router } from "express";
import { createCatController, getAllCatsController, getCatByIdContoller, recommendCatController, searchCatContoller } from "../controllers/cat.controller.ts";

const router = Router()

//create cat route
router.post("/create", createCatController)


//get All cats
router.get("/", getAllCatsController)

//Search cat
router.get("/search" ,searchCatContoller)

//search cat by id
router.get("/:id", getCatByIdContoller)


//get recommend cat
router.post("/recommend" , recommendCatController)

export default router