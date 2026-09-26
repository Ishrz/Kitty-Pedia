import type { Request, Response } from "express";
import { getMcpClient } from "../services/testMcp.service.ts";
import { aiGemini } from "../services/ai.service.ts";

export const testMcpController = async (
  req: Request,
  res: Response,
) => {
  const { isKidsFriendly, isAppartmentFriendly } = req.body;

  try {

    const client = await getMcpClient();

    const result = await client.callTool({
      name: "recommend_cats",
      arguments: {
        isKidsFriendly,
        isAppartmentFriendly,
      },
    });

    const response = (result as any)?.content?.[0]?.text;

    const prompt = `
You are a professional feline consultant and cat breeder. Your task is to analyze the available cat data from our database and recommend the absolute best match based on the user's living conditions.

### Available Database Cats:
${response}

### User Preferences:
- Kids Friendly Required: ${isKidsFriendly}
- Apartment Friendly Required: ${isAppartmentFriendly}

### Instructions:
1. Review the available cat data provided above.
2. Filter and evaluate which cats best fit both of the user's preferences.
3. Recommend the top cat(s) and explain *why* they are the best choice based on their database attributes.
4. Keep the response clean, friendly, and expert-level.
`;

    const aiResponse = await aiGemini(prompt);

    res.status(200).json({
      message: "tools call successfully",
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    console.error("[mcpTest] request failed:", error);

    res.status(502).json({
      message:
        "We could not reach the breed advisor just now. Please try again in a moment.",
      success: false,
    });
  }
};
