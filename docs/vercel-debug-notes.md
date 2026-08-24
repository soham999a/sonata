# Vercel deployment debugging notes

## Observed production behavior

The initial Vercel deployment published the Node server artifact, so the root URL rendered compiled source instead of the Sonata application. Switching Vercel’s output directory to `dist/public` corrected the public page.

The first API adapter attempt then returned the SPA 404 screen because `/api/*` was falling through to the client fallback. An explicit `/api/*` route and a health function corrected that behavior: `GET /api/health` returned `{"service":"sonata-api","status":"ok"}` in production.

## Serverless runtime corrections

The runtime log for the first tRPC request reported:

> `ERR_MODULE_NOT_FOUND`: Cannot find module `/var/task/server/_core/app` imported from `api/[...route].js`.

The adapter was therefore moved behind a generated bundle. The subsequent log reported:

> `Error: Dynamic require of "path" is not supported` in the generated API module.

The Vercel bundling command now packages Sonata-owned source while leaving installed Node dependencies external. That retains Node’s native CommonJS behavior for dependencies that use dynamic `require`, while eliminating runtime imports to source files outside the deployed function.

## Verification sequence

1. Confirm `GET /api/health` returns `{ "service": "sonata-api", "status": "ok" }`.
2. Confirm `GET /api/trpc/sonata.browse?...` returns a tRPC JSON payload with demonstration entries.
3. Confirm the public discovery index renders the available term cards rather than an empty state.
