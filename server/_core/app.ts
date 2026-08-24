import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";

/**
 * Shared HTTP application used by the local long-running server and Vercel's
 * serverless API adapter. Static asset hosting stays environment-specific.
 */
export function createApp() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  const trpcMiddleware = createExpressMiddleware({
    router: appRouter,
    createContext,
  });
  // The second mount path makes the function adapter resilient if its host
  // removes the /api prefix before forwarding a request to Express.
  app.use("/api/trpc", trpcMiddleware);
  app.use("/trpc", trpcMiddleware);
  return app;
}
