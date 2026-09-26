import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import { catRecommendTool, getAllCats } from "./tools/recommendCat.tool.js";



// Create server instance
const server = new McpServer({
  name: "kitty_pedia",
  version: "1.0.0",
});


//registering tools
server.registerTool(
    "recommend_cats",
    {
        title:"Recommend Cats",
        description:"based on inputs recommend best cats on the basis of requirement",
        inputSchema:{
            isKidsFriendly:z.boolean(),
            isAppartmentFriendly:z.boolean(),
        }
    },
    async ({isKidsFriendly, isAppartmentFriendly})=>{
        const result = await catRecommendTool(isKidsFriendly, isAppartmentFriendly)

        return {
            content:[
                {
                    type:"text",
                    text:JSON.stringify(result)
                }
            ]
        }
    }
)

server.registerTool(
    "getting_allCats",
    {
        title:"get all cats",
        description:"fetched all avalaible cats"
    },
    async () =>{
        const result = await getAllCats()

        return  {
            content:[
                {
                type:"text",
                text:JSON.stringify(result)
                }
            ]
    }
    }
)



    const transpoter = new StdioServerTransport()

    await server.connect(transpoter)
    console.error("MCP server is connected...")




