import type { Request, Response } from "express";

const DIRECT_PUBLIC_ASSETS: Record<string, string> = {
  "sonata-app-icon_7aa2060e.png": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663126664570/ZhrehmHxfBttGhjk.png",
};

/**
 * Compatibility bridge for historical managed-storage URLs.
 * Fixed application brand assets are deliberately served from their direct CDN URL
 * so this Vercel function has no runtime dependency on private storage credentials.
 */
export default function handler(req: Request, res: Response) {
  const rawKey = req.query.key;
  const key = Array.isArray(rawKey) ? rawKey[0] : rawKey;
  if (!key || typeof key !== "string") {
    res.status(400).send("Missing storage key");
    return;
  }
  const assetUrl = DIRECT_PUBLIC_ASSETS[key];
  if (!assetUrl) {
    res.status(404).send("Managed asset is not available through this compatibility route");
    return;
  }
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.redirect(307, assetUrl);
}
