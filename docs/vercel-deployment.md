# Vercel deployment notes

Sonata is a full-stack application whose local `build` script emits both a browser bundle in `dist/public` and a Node server bundle in `dist/index.js`. Vercel must publish **only** the browser bundle as static output; otherwise the Node bundle may be exposed as text at `/`.

`vercel.json` sets `dist/public` as the output directory, uses the client-only Vite build command, routes unmatched browser paths back to `index.html`, and deploys the tRPC/OAuth runtime through `api/[...route].ts`. It also proxies the managed hero asset through `api/media.ts`.

## Required Vercel environment variables

To enable database-backed editing, authentication, and the managed image proxy in Vercel, configure these values for **Production**, **Preview**, and **Development** as appropriate:

| Variable | Needed for |
| --- | --- |
| `DATABASE_URL` | Persisted concept, source, relationship, and import data |
| `JWT_SECRET` | OAuth session signing |
| `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, `VITE_APP_ID` | Manus OAuth callback flow |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Managed image proxy and platform services |
| `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY` | Client-side platform integrations, when used |
| `OWNER_OPEN_ID`, `OWNER_NAME` | Administrator identity mapping |

The site remains publicly readable without these values, using the deliberately limited demonstration records. Editorial persistence, OAuth, and protected media require the matching production values.
