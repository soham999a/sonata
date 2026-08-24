import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readClientFile = (relativePath: string) => readFileSync(resolve(projectRoot, "client", "src", relativePath), "utf8");

describe("Part 3 keyboard accessibility contract", () => {
  it("keeps a global keyboard-only focus treatment", () => {
    const styles = readClientFile("index.css");
    expect(styles).toContain(":focus-visible");
    expect(styles).toContain("outline: 2px solid var(--brass)");
  });

  it("keeps semantic controls on every new public research route", () => {
    const routes = ["pages/ResearchSearch.tsx", "pages/CompareConcepts.tsx", "pages/LearningStudio.tsx", "pages/SonataAssistant.tsx", "pages/Contribute.tsx"];
    for (const route of routes) {
      const source = readClientFile(route);
      expect(source).toMatch(/<(button|input|select|textarea|Link|a)\b/);
      expect(source).toContain("SiteHeader");
    }
  });
});
