import type { Request, Response } from "express";

/** Lightweight production probe for the Vercel serverless runtime. */
export default function handler(_req: Request, res: Response) {
  res.status(200).json({ service: "sonata-api", status: "ok" });
}
