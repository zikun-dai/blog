---
title: Hello World
pubDate: 2026-01-17 00:33:51
tags: [tech]
description: 一份简单的配置和使用文档
---

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or ask on [GitHub](https://github.com/hexojs/hexo/issues).

## 快速指令

:::tip
未修改插件或主题时无需 clean。
`npm install` 新插件，或修改了 `_config.yml`，建议先 clean 一次。
:::

```bash
# 本地预览
hexo clean && hexo g && hexo s
```

```bash
# 直接部署
hexo clean && hexo g && hexo d
```

```bash
# 日常新增文档时，可跳过 clean
hexo g -d
```

## 单步指令

### 新建文章

```bash
hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### 清理缓存

```bash
hexo clean
```

### 启动本地服务

```bash
hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### 生成静态文件

```bash
hexo generate
# equal
hexo g
```

More info: [Generating](https://hexo.io/docs/generating.html)

### 部署到远端

```bash
hexo deploy
# equal
hexo d
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

## 初始配置

### utteranc setting

```html
<script src="https://utteranc.es/client.js"
        repo="zikun-dai/blog"
        issue-term="pathname"
        theme="github-dark"
        crossorigin="anonymous"
        async>
</script>
```
