import { copyFileSync, existsSync } from "node:fs";

const indexPath = "dist/index.html";
const fallbackPath = "dist/404.html";

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html was not found. Run the Vite build first.");
}

copyFileSync(indexPath, fallbackPath);
