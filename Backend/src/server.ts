import dotenv from "dotenv"
dotenv.config()
import app from "./app.ts";
import { ConnectDB } from "./config/db.ts";

const PORT = process.env.PORT || 4000

ConnectDB()




app.listen(PORT , () => {
    console.log(`Server is running on port : ${PORT}`)
})