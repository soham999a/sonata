import type { Request, Response } from "express";
import { ENV } from "../server/_core/env";

/** Redirect Vercel traffic for managed image keys to a fresh storage URL. */
export default async function handler(req: Request, res: Response) {
  const rawKey = req.query.key;
  const key = Array.isArray(rawKey) ? rawKey[0] : rawKey;
  if (!key || typeof key !== "string") {
    res.status(400).send("Missing storage key");
    return;
  }
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    res.status(500).send("Storage proxy is not configured for this deployment");
    return;
  }
  try {
    const forgeUrl = new URL("v1/storage/presign/get", `${ENV.forgeApiUrl.replace(/\/+$/, "")}/`);
    forgeUrl.searchParams.set("path", key);
    const response = await fetch(forgeUrl, { headers: { Authorization: `Bearer ${ENV.forgeApiKey}` } });
    if (!response.ok) {
      res.status(502).send("Storage backend error");
      return;
    }
    const { url } = (await response.json()) as { url?: string };
    if (!url) {
      res.status(502).send("Storage backend returned no URL");
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.redirect(307, url);
  } catch (error) {
    console.error("[Vercel media proxy] failed", error);
    res.status(502).send("Storage proxy error");
  }
}
