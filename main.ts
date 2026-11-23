// Dad Joke Showdown — make.fun entry (program/v1).
//
// Writes one original dad joke to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR
// when set). Fixed text, no randomness, no network, stdlib only: every run
// writes byte-identical output, so the two grader runs agree.
//
// The joke, chosen against the judge's brief (dad at the dinner table,
// clean pun, fresh, tight, punchline on the last word):
//   "I told my kids I used to be a baker. They said, 'Prove it.'
//    I said, 'I knead the dough.'"
// A dinner-table exchange in dad's voice: the kids challenge him, and the
// payoff is the knead/need homophone landing on the very last word.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const JOKE =
  "I told my kids I used to be a baker. They said, 'Prove it.' I said, 'I knead the dough.'";

function main(): void {
  // Absolute output path only: the grader runs this program from another
  // directory, so a relative path would fail with ENOENT. A relative
  // MAKEFUN_OUTPUT_DIR is resolved against this file's own directory,
  // derived from import.meta.url.
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputDir = isAbsolute(rawOutDir)
    ? rawOutDir
    : resolve(scriptDir, rawOutDir);
  const entryPath = join(outputDir, "entry.txt");

  mkdirSync(outputDir, { recursive: true });
  // No trailing newline: the judge reads exactly the bytes written.
  writeFileSync(entryPath, JOKE, "utf-8");
}

main();
