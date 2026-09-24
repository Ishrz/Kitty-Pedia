import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

export const getMcpClient= async () =>{


    let client : Client

    client = new Client({
         name: "kitty_pedia",
          version: "1.0.0" 
        });

    const transport = new StdioClientTransport({
        command:"npx",
        args:["tsx" , "../MCP_Server/src/index.ts"]
    })

    await client.connect(transport)

    return client

}