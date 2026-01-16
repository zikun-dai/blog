---
title: server
date: 2026-01-15 19:01:22
tags: [tech]
description: 实验室服务器配置指南的更新版，新增Windows和wsl的建议项
---

服务器配置指南



> [!NOTE]
>
> 把notion里的 Miniconda 步骤，等价替换成 Miniforge + mamba
>
> 原文链接：[NJU-3DV 实验室服务器使用与配置手册](https://stingy-basin-115.notion.site/NJU-3DV-d9f0de862cbd4b9f9c12b5474cac76e1)

### 1) 安装 Miniforge（替代 Miniconda）

在 WSL2 / Ubuntu 终端执行：

```bash
# 进入 home（你截图里是 /home/[username]，等价于 ~）
cd ~

# 建目录（你原来是 ~/miniconda3，这里用 ~/miniforge3）
mkdir -p ~/miniforge3

# 下载 Miniforge 安装脚本
wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh -O ~/miniforge3/miniforge.sh

# 静默安装到 ~/miniforge3
bash ~/miniforge3/miniforge.sh -b -u -p ~/miniforge3

# 删除安装脚本
rm -f ~/miniforge3/miniforge.sh
```

> 说明：Miniforge 会预配置 conda-forge 作为默认 channel，并且提供 `conda`/`mamba` 命令。([mamba.readthedocs.io](https://mamba.readthedocs.io/en/latest/installation/mamba-installation.html?utm_source=chatgpt.com))

### 2) 初始化（对应你截图的 “conda: command not found / conda init”）

最简单直接用初始化命令：

```bash
~/miniforge3/bin/conda init bash
exec bash
```

重开后你如果看到命令行前面有 `(base)`，就和你截图里“安装成功”的判据一致了。



如果`mamba activate`报错：

```bash
mamba shell init --shell bash --root-prefix=~/.local/share/mamba
# 然后重开一个终端（vscode的话需要大退重启），或：
source ~/.bashrc
```



------

## 如果遇到 `conda: command not found`（最小修复版）

一般是因为 PATH 没生效。你可以往 `~/.bashrc` 里加两行（比粘整块 conda init 模板更清爽）：

```bash
# Miniforge
export PATH="$HOME/miniforge3/bin:$PATH"
```

保存后：

```bash
source ~/.bashrc
```

然后再跑一次：

```bash
conda init bash
exec bash
```

------

## 如何创建环境

装包/建环境时把 `conda` 换成 `mamba` 就行：

```bash
# 建环境
# 从文件创建：指定`-f scan2bim.yml `
mamba create -n nju3dv python=3.10

# 更新环境
# 记得先激活环境，不激活的话需要指定`-n scan2bim`
# 需要严格对齐yml文件（会删掉文件中未提及的库），指定`--prune`
mamba env update -f scan2bim.cu116.yml

# 删除环境
mamba env remove -n scan2bim

# 激活时使用conda（不要使用mamba）
conda activate nju3dv

# 装依赖（你 Notion 里如果写 conda install，这里直接换 mamba install）
mamba install numpy scipy
```

> 常见习惯：**激活仍然用 conda activate**（更兼容各种 shell 初始化），但安装/更新用 mamba。

------

## 安装依赖

### 配置channels

编辑`~/miniforge3/.condarc`

```json
channels:
  - conda-forge
  - pytorch
  - nvidia
  - defaults

show_channel_urls: true
channel_priority: strict

default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2

custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  nvidia: https://mirrors.sustech.edu.cn/anaconda-extra/cloud

```



### pip源

编辑`/.config/pip/pip.conf`，或者bash直接运行：

```json
pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
pip config set global.extra-index-url https://pypi.org/simple
```

