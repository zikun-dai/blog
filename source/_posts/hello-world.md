---
title: Hello World
tags: [tech]
description: 一份简单的配置和使用文档
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## 快捷指令

> [!TIP]
>
> 没有修改插件、主题时无需clean
>
> `npm install`新插件，或者修改了``_config.yml`，最好clean一下

```bash
# 本地预览
hexo clean && hexo g && hexo s
```

```bash
# 直接部署
hexo clean && hexo g && hexo d
```

```bash
# 另一种写法(适用于日常添加了新文档，无需clean直接部署)
hexo g -d
```



## 单步指令

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Clean caches

```bash
# 清除缓存
hexo clean
```

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
# 生成静态页面 (Generate)
hexo generate
# equal
hexo g
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
# 部署到 GitHub (Deploy)
hexo deploy
# equal
hexo d
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)



## 初始配置

### utteranc setting

```bash
<script src="https://utteranc.es/client.js"
        repo="zikun-dai/blog"
        issue-term="pathname"
        theme="github-dark"
        crossorigin="anonymous"
        async>
</script>
```