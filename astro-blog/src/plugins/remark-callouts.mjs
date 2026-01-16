import { visit } from 'unist-util-visit';

const CALLOUT_TYPES = new Set(['note', 'tip', 'warning', 'danger', 'info']);

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return;
      if (!CALLOUT_TYPES.has(node.name)) return;

      const data = node.data || (node.data = {});
      data.hName = 'div';
      data.hProperties = {
        class: `callout callout-${node.name}`,
      };
    });
  };
}
