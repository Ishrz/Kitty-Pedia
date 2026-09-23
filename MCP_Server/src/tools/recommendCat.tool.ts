import axios from "axios"

export const catRecommendTool = async (isKidsFriendly:boolean , isAppartmentFriendly:boolean) => {

    const result = await axios.post("http://localhost:3000/api/cat/recommend",{
        isKidsFriendly,
        isAppartmentFriendly
    })

    return result.data

}

export const getAllCats = async () =>{
    const result = await axios.get("http://localhost:3000/api/cat/")

    return result.data
}