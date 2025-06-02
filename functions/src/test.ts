// functions/src/test.ts
import { scheduledBlog } from "./scheduledBlog";

(async () => {
  console.log("🚀 Running test...");
  await scheduledBlog();
  console.log("✅ Done");
})();
