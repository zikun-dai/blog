import { visit } from 'unist-util-visit';

const CALLOUT_TYPES = new Set([
  'note',
  'tip',
  'warning',
  'danger',
  'info',
  'important',
  'caution',
]);

const ALERT_PATTERN = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i;

function isParagraphEmpty(node) {
  if (!node || node.type !== 'paragraph') return false;
  return node.children.every((child) => child.type === 'text' && !child.value.trim());
}

function parseAlertType(paragraph) {
  if (!paragraph || paragraph.type !== 'paragraph') return null;
  const first = paragraph.children?.[0];
  if (!first || first.type !== 'text') return null;

  const match = first.value.match(ALERT_PATTERN);
  if (!match) return null;

  const type = match[1].toLowerCase();
  const rest = first.value.slice(match[0].length);
  if (rest) {
    first.value = rest;
  } else {
    paragraph.children.shift();
  }

  return type;
}

function applyCallout(node, type) {
  const data = node.data || (node.data = {});
  data.hName = 'div';
  data.hProperties = {
    class: `callout callout-${type}`,
  };
}

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        if (!CALLOUT_TYPES.has(node.name)) return;
        applyCallout(node, node.name);
        return;
      }

      if (node.type !== 'blockquote') return;
      const firstParagraph = node.children?.find((child) => child.type === 'paragraph');
      if (!firstParagraph) return;

      const type = parseAlertType(firstParagraph);
      if (!type || !CALLOUT_TYPES.has(type)) return;

      if (isParagraphEmpty(firstParagraph)) {
        node.children = node.children.filter((child) => child !== firstParagraph);
      }

      applyCallout(node, type);
    });
  };
}
