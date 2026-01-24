import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkCallouts from './src/plugins/remark-callouts.mjs';
import remarkFrontmatterAuto from './src/plugins/remark-frontmatter-auto.mjs';

export default defineConfig({
  site: 'https://zikun-dai.github.io/blog/',
  // base: '/blog',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkDirective, remarkCallouts, remarkFrontmatterAuto],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
    shikiConfig: { theme: 'github-light' },
  },
});
