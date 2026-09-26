import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { MCP_ENTRY } from "../config/paths.ts";


let client: Client | null = null;

/** In-flight initialisation, so concurrent requests share one child process. */
let connecting: Promise<Client> | null = null;

const createClient = async (): Promise<Client> => {
  const created = new Client({
    name: "kitty_pedia",
    version: "1.0.0",
  });

  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [MCP_ENTRY],

    env: { ...process.env } as Record<string, string>,
  });

  await created.connect(transport);

  return created;
};

/**
 * Returns the shared MCP client, starting the child process on first use.
 *
 * Initialisation is lazy so server boot is never blocked, and concurrent callers
 * await the same promise rather than each spawning their own process.
 */
export const getMcpClient = async (): Promise<Client> => {
  if (client) return client;

  connecting ??= createClient()
    .then((created) => {
      client = created;
      connecting = null;
      return created;
    })
    .catch((error: unknown) => {
      // Clear the memo so a later request can retry instead of replaying the
      // same failure forever.
      connecting = null;
      throw error;
    });

  return connecting;
};

/** Terminates the MCP child process. Call during graceful shutdown. */
export const closeMcpClient = async (): Promise<void> => {
  const current = client;
  client = null;
  connecting = null;

  if (!current) return;

  try {
    await current.close();
  } catch {
    // Already gone, or the transport died with it.
  }
};
