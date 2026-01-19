---
title: ubuntu
pubDate: 2026-01-15 22:42:29
tags: [tech]
---

## 双系统策略

### Windows + WSL
- Windows 有鼠标驱动。
- 复现实验需要在 WSL；访问 Ubuntu 文件也需 WSL。
- 进入 WSL 后，文件管理器输入 `\\wsl$` 可访问 `/home/wsl-jake/`。
- VSCode 可直接连接 WSL 目录。

### 双系统

#### 同一块硬盘
- Ubuntu 可访问 Windows 文件，但没有鼠标驱动。
- Windows 无法访问 Ubuntu。

#### 不同硬盘
- Windows 可以访问 Ubuntu，但多通过 WSL 挂载。
- 实际上不如直接在 WSL 创建环境。
