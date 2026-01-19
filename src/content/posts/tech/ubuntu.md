---
title: ubuntu
pubDate: 2026-01-15 22:42:29
tags: [tech]
---



### 双系统策略

> win：有鼠标驱动，但复现实验需要在wsl中，访问Ubuntu文档也需要wsl
>
> Ubuntu：复现实验方便，能直接访问win文件，只有板载驱动/网页驱动能够正常用

- Windows下使用wsl

	终端启动wsl之后，文件管理器中输入`\\wsl$`可以直接访问`/home/wsl-jake/`

	vscode

- 双系统

	**同一块硬盘**

	很麻烦，Ubuntu可以访问win文件，但没有鼠标驱动

	win无法访问Ubuntu

	**不同硬盘**

	win可以访问Ubuntu了，但也只是在WSL里挂载，不如直接在WSL里创建环境