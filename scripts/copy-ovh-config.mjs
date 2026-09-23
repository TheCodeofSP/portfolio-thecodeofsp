import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("public/.htaccess");
const destination = resolve("dist/.htaccess");

if (!existsSync(source)) {
  console.error("Configuration OVH absente : public/.htaccess");
  process.exit(1);
}

copyFileSync(source, destination);
console.log("Configuration OVH copiée dans dist/.htaccess.");
