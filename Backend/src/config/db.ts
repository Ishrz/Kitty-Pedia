import mongoose from "mongoose"

export const ConnectDB = async () =>{
    try {
        const DB = await mongoose.connect(process.env.MONGO_URI!)
        console.log("Databse is connected....")
    } catch (error) {
        console.log("Error in connecting Database ")
    }
}