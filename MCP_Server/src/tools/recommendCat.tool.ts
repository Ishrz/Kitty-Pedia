import axios from "axios";


const baseUrl =
  process.env.API_BASE_URL ?? `http://127.0.0.1:${process.env.PORT ?? 3000}`;

/** Keep failures fast and legible instead of hanging until the client timeout. */
const client = axios.create({
  baseURL: baseUrl,
  timeout: 15_000,
});

export const catRecommendTool = async (
  isKidsFriendly: boolean,
  isAppartmentFriendly: boolean,
) => {
  try {
    const result = await client.post("/api/cat/recommend", {
      isKidsFriendly,
      isAppartmentFriendly,
    });

    return result.data;
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "unknown error";
    throw new Error(
      `MCP tool could not reach the API at ${baseUrl} (${detail}). ` +
        `Is the Backend running and is PORT set for this process?`,
    );
  }
};

export const getAllCats = async () => {
  try {
    const result = await client.get("/api/cat/");

    return result.data;
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "unknown error";
    throw new Error(
      `MCP tool could not reach the API at ${baseUrl} (${detail}). ` +
        `Is the Backend running and is PORT set for this process?`,
    );
  }
};
