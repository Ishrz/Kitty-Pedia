import CatModel from "../models/cat.model.ts"

//create Cat service
export const createCatService  = async (payload : object) => {

    return await CatModel.create(payload)

}

//get all cats service

export const getAllCatsService = async () => {
    return await CatModel.find()
}

//get Cat by ID
export const getCatByIdService = async (payload:string) => {

    return await CatModel.findById(payload)
}

//search Cat 
export const searchCatService = async (query : string) =>{

    return CatModel.find({
       $or: [
      {
        name: {
          $regex: query,
          $options: "i",
        },
      },
      {
        breed: {
          $regex: query,
          $options: "i",
        },
      },
    ],
    });

}


//Recommended Cats
export const recommendCatService = async (isKidsFriendly: boolean , isAppartmentFriendly: boolean) =>{

    return CatModel.find({
        isKidsFriendly,
        isAppartmentFriendly
    });

}