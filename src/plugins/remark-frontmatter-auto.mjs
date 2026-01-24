import { visit } from "unist-util-visit";

const IMG_TAG_RE = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/i;

function findFirstImage(tree) {
  let found = null;
  visit(tree, (node) => {
    if (found) return;
    if (node.type === "image" && typeof node.url === "string") {
      found = node.url;
      return;
    }
    if (node.type === "html" && typeof node.value === "string") {
      const match = node.value.match(IMG_TAG_RE);
      if (match) found = match[1];
    }
  });
  return found;
}

function findFirstParagraphText(tree) {
  let found = null;
  visit(tree, (node) => {
    if (found) return;
    if (node.type !== "paragraph") return;
    const text = node.children
      .filter((child) => child.type === "text" && child.value)
      .map((child) => child.value)
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (text) found = text;
  });
  return found;
}

export default function remarkFrontmatterAuto() {
  return (tree, file) => {
    const frontmatter = file?.data?.astro?.frontmatter;
    if (!frontmatter) return;

    if (!frontmatter.heroImage) {
      const heroImage = findFirstImage(tree);
      if (heroImage) frontmatter.heroImage = heroImage;
    }

    if (!frontmatter.description) {
      const description = findFirstParagraphText(tree);
      if (description) frontmatter.description = description.slice(0, 160);
    }
  };
}
