import mongoose from "mongoose";
import type { ICAT } from "../types/cat.types.ts";


const catSchema = new mongoose.Schema<ICAT>({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isKidsFriendly:{
        type:Boolean,
        required:true
    },
    isAppartmentFriendly:{
        type:Boolean,
        required:true
    },
    lifeSpan:{
        type:Number,
        required:true
    },
    energyLevel:{
        type:String,
        required:true
    },
    breed:{
        type:String,
        required:true
    }
},{timestamps:true})


const CatModel = mongoose.model("Cat" , catSchema)

export default CatModel