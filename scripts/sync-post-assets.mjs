import { promises as fs } from "node:fs";
import path from "node:path";

const postsRoot = path.resolve("src", "content", "posts");
const publicRoot = path.resolve("public", "posts");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

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

async function syncAssets() {
  const mdFiles = await findMarkdownFiles(postsRoot);
  for (const mdFile of mdFiles) {
    const dir = path.dirname(mdFile);
    const base = path.basename(mdFile, path.extname(mdFile));
    const assetDir = path.join(dir, base);
    if (!(await exists(assetDir))) continue;

    const relDir = path.relative(postsRoot, dir);
    const baseSlug = base.toLowerCase();
    const destDir = path.join(publicRoot, relDir, baseSlug, base);
    const legacyDestDir = path.join(publicRoot, relDir, base);

    await fs.rm(destDir, { recursive: true, force: true });
    await fs.rm(legacyDestDir, { recursive: true, force: true });
    await fs.mkdir(path.dirname(destDir), { recursive: true });
    await fs.cp(assetDir, destDir, { recursive: true });
  }
}

await syncAssets();
