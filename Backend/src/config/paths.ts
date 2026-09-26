import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Absolute paths to everything the Backend needs at runtime.
 *
 * These are derived from this module's own location rather than
 * `process.cwd()`. The old MCP spawn used a relative path
 * (`../MCP_Server/src/index.ts`) which only worked because the process happened
 * to be started from `Backend/`. Any change to the launch directory broke it with
 * an opaque "module not found" from a subprocess.
 *
 * Resolving from `import.meta.url` also means the values stay correct whether the
 * Backend runs TypeScript directly through tsx (this file sits at
 * `Backend/src/config`) or is later compiled to `dist/` (`Backend/dist/config`) —
 * two levels up is `Backend/` either way.
 */

const here = path.dirname(fileURLToPath(import.meta.url));

/** `<repo>/Backend` */
export const BACKEND_ROOT = path.resolve(here, "..", "..");

/** `<repo>` */
export const REPO_ROOT = path.resolve(BACKEND_ROOT, "..");

/**
 * Static frontend bundle. The deploy build copies `Frontend/dist` here, which
 * keeps the Backend self-contained and runnable from its own directory.
 */
export const PUBLIC_DIR = path.join(BACKEND_ROOT, "public");

/**
 * Compiled MCP server entry point. Built by `npm run build` in `MCP_Server/`.
 * It stays in its own package rather than being copied, so there is a single copy
 * of the compiled server and no chance of the two drifting apart.
 */
export const MCP_ENTRY = path.join(REPO_ROOT, "MCP_Server", "build", "index.js");

/**
 * Logs the resolved paths and reports any missing build artifact.
 *
 * A missing artifact is otherwise invisible until someone clicks the Advisor and
 * sees an unexplained failure, so it is worth surfacing at boot.
 */
export const logResolvedPaths = (): void => {
  console.log("[paths] backend :", BACKEND_ROOT);
  console.log("[paths] public  :", PUBLIC_DIR);
  console.log("[paths] mcp     :", MCP_ENTRY);

  if (!existsSync(PUBLIC_DIR)) {
    console.warn(
      `[paths] No frontend build at ${PUBLIC_DIR}. ` +
        `Run "npm run build" in Frontend and copy dist/ there, or use the Render build command.`,
    );
  }

  if (!existsSync(MCP_ENTRY)) {
    console.warn(
      `[paths] No MCP build at ${MCP_ENTRY}. ` +
        `Run "npm run build" in MCP_Server — the Advisor will fail until this exists.`,
    );
  }
};
