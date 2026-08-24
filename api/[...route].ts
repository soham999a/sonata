import { createApp } from "../server/_core/app";

/**
 * Vercel serverless entry point for Sonata's tRPC and OAuth endpoints.
 * Vercel derives the /api/* route from this catch-all file.
 */
const app = createApp();

export default app;
