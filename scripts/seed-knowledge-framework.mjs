import { bootstrapGlobalKnowledgeFramework } from "../server/knowledge.service.ts";

const result = await bootstrapGlobalKnowledgeFramework();

console.log(JSON.stringify({
  primaryTarget: result.primaryTarget,
  targetCount: result.targets.length,
  regionCount: result.regions.length,
}, null, 2));
