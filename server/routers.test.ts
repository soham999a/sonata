import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function publicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("Sonata public data contracts", () => {
  it("returns a deliberately limited browse foundation", async () => {
    const result = await appRouter.createCaller(publicContext()).sonata.browse();
    expect(result.mode).toBe("foundation");
    expect(result.entries).toHaveLength(4);
    expect(result.entries.every(entry => entry.demonstration)).toBe(true);
  });

  it("returns multilingual context and cited sources for the representative entry", async () => {
    const result = await appRouter.createCaller(publicContext()).sonata.entry({ slug: "raga" });
    expect(result?.nativeScript).toBe("राग");
    expect(result?.sources[0]?.citation).toContain("Jairazbhoy");
    expect(result?.sources).toHaveLength(2);
  });

  it("matches a transliterated name in public search", async () => {
    const result = await appRouter.createCaller(publicContext()).sonata.search({ query: "maqam" });
    expect(result.entries[0]?.name).toBe("Maqām");
  });
});
