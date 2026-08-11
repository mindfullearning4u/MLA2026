import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const unitPath = process.argv[2];
if (!unitPath) throw new Error("Unit path is required.");

const reminder = '<aside class="tor-help" style="margin-top:1.5rem;padding:1rem;border-left:5px solid #2b6cb0;background:#ebf8ff;"><p style="margin:0;"><strong>Need help?</strong> Ask your Teacher of Record (TOR) for help whenever directions, vocabulary, sources, or an assignment are unclear. Do not wait until the end of the lesson.</p></aside>';
const repoRoot = process.cwd();

for (const lesson of readdirSync(unitPath, { withFileTypes: true })) {
  if (!lesson.isDirectory() || !/^Lesson \d{2}$/.test(lesson.name)) continue;
  const lessonPath = join(unitPath, lesson.name);
  for (const file of readdirSync(lessonPath)) {
    if (!/^P0[1-7]\.html$/.test(file)) continue;
    const fullPath = join(lessonPath, file);
    const gitPath = relative(repoRoot, fullPath).replaceAll("\\", "/");
    const original = execFileSync("git", ["show", `HEAD:${gitPath}`], { encoding: "utf8" });
    const updated = original.replace(/\s*$/, "") + `\n${reminder}\n`;
    writeFileSync(fullPath, updated, { encoding: "utf8" });
  }
}
