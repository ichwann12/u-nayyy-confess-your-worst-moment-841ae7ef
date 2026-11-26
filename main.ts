// Confess Your Worst Moment — u-nayyy-confess-your-worst-moment-841ae7ef
// Reads the single-line confession from entry.txt and writes it to the
// output directory given by MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR.
// Node 22, stdlib only, no network, no wall clock.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "entry.txt"), "utf8").trimEnd();

// Bounty rule: a single line, at most 200 characters.
if (entry.length > 200 || entry.includes("\n")) {
  throw new Error(
    `entry.txt must be a single line of at most 200 characters (got ${entry.length})`,
  );
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(here, "output");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "output.txt"), entry + "\n", "utf8");
console.log(entry);
