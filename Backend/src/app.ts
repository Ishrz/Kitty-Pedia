import path from "node:path";
import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";

import catRouter from "./routes/cat.route.ts";
import aiRouter from "./routes/ai.routes.ts";
import aiRecommendRoute from "./routes/aiRecommend.route.ts";
import mcpTestRoute from "./routes/test_mcp_server.route.ts";
import { CLIENT_ORIGINS } from "./config/env.ts";
import { PUBLIC_DIR } from "./config/paths.ts";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));


app.use(
  cors({
    origin: CLIENT_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);


app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "server is running successfully",
    success: true,
    status: 200,
  });
});

// Legacy health check, kept so existing local tooling and uptime checks that still
// use "/" do not break before the frontend build is copied in.
app.get("/", (req: Request, res: Response, next) => {
  if (process.env.SERVE_SPA !== "false") {
    next();
    return;
  }

  res.send({
    message: "server is running successfully",
    success: true,
    status: 200,
  });
});


app.use("/api/cat", catRouter);
app.use("/api/ai", aiRouter);
app.use("/api/aiRecommend", aiRecommendRoute);
app.use("/api/mcpTest", mcpTestRoute);


app.use(
  express.static(PUBLIC_DIR, {
    index: false,
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  }),
);

/**
 * SPA fallback: serve index.html for client-side routes so deep links such as
 * /browse or /advisor survive a hard refresh.
 *
 * Note: Express 5 uses path-to-regexp v8, where the familiar `app.get("*")` throws
 * at startup and `/*splat` matches only paths with at least one segment. The
 * braces in `/{*splat}` make the wildcard optional, which is what allows the root
 * path "/" to be handled as well.
 */
app.get("/{*splat}", (req: Request, res: Response, next) => {
  if (req.path.startsWith("/api/")) {
    next();
    return;
  }

  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(path.join(PUBLIC_DIR, "index.html"), (error) => {
    if (error) {
      // No frontend build deployed, or the file went missing.
      res
        .status(404)
        .type("text/plain")
        .send("Frontend build not found. Run 'npm run build' in Frontend.");
    }
  });
});

// Unmatched /api routes fall through to here.
app.use("/api", (_req: Request, res: Response) => {
  res.status(404).json({ message: "Not found", success: false });
});

export default app;
