import { promises as fs } from "node:fs";
import path from "node:path";

const postsRoot = path.resolve("src", "content", "posts");

async function findMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(full)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function formatDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

async function ensureFrontmatter(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  if (content.startsWith("---")) return false;

  const stat = await fs.stat(filePath);
  const pubDate = formatDate(stat.birthtime);

  const frontmatter = [
    "---",
    "title: Untitled",
    `pubDate: ${pubDate}`,
    "---",
    "",
  ].join("\n");

  await fs.writeFile(filePath, frontmatter + content, "utf8");
  return true;
}

const files = await findMarkdownFiles(postsRoot);
for (const file of files) {
  await ensureFrontmatter(file);
}
