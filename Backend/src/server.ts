
import "./config/loadEnv.ts";

import { createServer } from "node:http";
import app from "./app.ts";
import { ConnectDB, closeDB } from "./config/db.ts";
import { PORT } from "./config/env.ts";
import { logResolvedPaths } from "./config/paths.ts";
import { closeMcpClient } from "./services/testMcp.service.ts";

const start = async () => {
  logResolvedPaths();

 
  await ConnectDB();

  const server = createServer(app);


  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `[server] port ${PORT} is already in use. Stop the other process or set PORT.`,
      );
    } else {
      console.error("[server] server error:", error);
    }
    process.exit(1);
  });

  server.listen(PORT, () => {
    console.log(`[server] listening on port ${PORT}`);
  });

  /**
   * Graceful shutdown. Render sends SIGTERM on every deploy and restart, so
   * without this the MCP child process would be orphaned and the connection
   * dropped mid-flight.
   */
  const shutdown = (signal: string) => {
    console.log(`[server] ${signal} received, shutting down`);

    server.close(async () => {
      await closeMcpClient();
      await closeDB();
      process.exit(0);
    });

    // Don't hang forever if a connection refuses to drain.
    setTimeout(() => {
      console.warn("[server] forced exit after 10s");
      process.exit(1);
    }, 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

start().catch((error: unknown) => {
  console.error("[server] failed to start:", error);
  process.exit(1);
});
