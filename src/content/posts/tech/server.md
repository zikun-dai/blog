---
title: server
pubDate: 2026-01-15 19:01:22
tags: [tech]
description: 实验室服务器配置指南的更新版，新增 Windows 和 WSL 的建议项
---

# 服务器配置指南

:::note
把 Notion 里的 Miniconda 步骤等价替换为 Miniforge + mamba。
原文链接：[NJU-3DV 实验室服务器使用与配置手册](https://stingy-basin-115.notion.site/NJU-3DV-d9f0de862cbd4b9f9c12b5474cac76e1)
:::

:::caution
以下配置有问题，先不要用。
:::

## 0) 配置 VPN

- 直接开启 VPN 的 TUN 模式。

> [!TIP]
> 尽量不要全局设置 http 环境变量；需要下载 HuggingFace、GitHub 时再开 TUN 模式最干净。
> 也可以按需临时 export。

> [!CAUTION]
> Windows 有时 TUN 用不了 Codex，可换节点；Mac 只能用代理模式（TUN 无网）；虚拟机只能用 TUN（代理用不了 AI）。

- 修改环境变量（按需）

```bash
# 最好加到 .bashrc
export http_proxy=http://127.0.0.1:7890
# export http_proxy=http://10.48.5.165:7890  # server 端 Clash 允许局域网，client 可借网
export https_proxy=$http_proxy
export ALL_PROXY=$http_proxy
```

- 查看/清理环境变量

```bash
# PowerShell
$env:http_proxy
$env:https_proxy
$env:all_proxy

# WSL/Ubuntu
echo $http_proxy
echo $https_proxy
echo $all_proxy
```

```bash
# Windows：在“用户环境变量”里清空后重开终端
# WSL/Ubuntu：在 .bashrc 删除相关项后 source ~/.bashrc 或重开终端
```

- 测试连通性

```bash
curl https://www.google.com
# ping 不走 http 协议，只有 TUN 模式能 ping 通
```

## 1) 安装 Miniforge（替代 Miniconda）

在 WSL2 / Ubuntu 终端执行：

```bash
cd ~
mkdir -p ~/miniforge3

wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh -O ~/miniforge3/miniforge.sh
bash ~/miniforge3/miniforge.sh -b -u -p ~/miniforge3
rm -f ~/miniforge3/miniforge.sh
```

> 说明：Miniforge 默认使用 conda-forge，并提供 `conda`/`mamba` 命令。

## 2) 初始化（解决 conda: command not found）

```bash
~/miniforge3/bin/conda init bash
# ~/miniconda3/bin/conda init bash  # 切换 miniconda3/miniforge3，只影响 ~/.bashrc
exec bash
```

> [!CAUTION]
> Miniforge 可能出现 `Failed to connect to repo.anaconda.com port 443`（安装 scan2BIM 时）。
> 创建普通 py313_env 一般没问题。

如果 `mamba activate` 报错：

```bash
mamba shell init --shell bash --root-prefix=~/.local/share/mamba
source ~/.bashrc
```

## 最小修复：conda 仍找不到

一般是 PATH 没生效，可在 `~/.bashrc` 加：

```bash
export PATH="$HOME/miniforge3/bin:$PATH"
```

然后：

```bash
source ~/.bashrc
conda init bash
exec bash
```

## 创建与管理环境

- 创建环境

```bash
mamba create -n nju3dv python=3.10
```

- 更新环境

```bash
# 先激活环境，或指定 -n scan2bim
# 需要严格对齐 yml（会删除未提及依赖），加 --prune
mamba env update -f scan2bim.cu116.yml
```

- 删除环境

```bash
mamba env remove -n scan2bim
```

- 激活建议用 conda（更兼容各种 shell）

```bash
conda activate nju3dv
```

- 安装依赖（mamba 更快）

```bash
mamba install numpy scipy
```

## 安装依赖

### 配置 channels

编辑 `~/miniforge3/.condarc`：

```yaml
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

### pip 源

编辑 `~/.config/pip/pip.conf`，或直接运行：

```bash
pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
pip config set global.extra-index-url https://pypi.org/simple
```

# 删除 Miniforge3

## 0) 确认安装目录

```bash
conda info --base
```

记录输出路径（如 `/home/wsl-jake/miniforge3`）。

## 1) 可选：备份环境列表

```bash
conda env list
# conda env export -n <envname> > <envname>.yml
```

## 2) 撤销 conda init

```bash
conda init --reverse bash
exec bash
```

> zsh 把 `bash` 换成 `zsh`。

如果 conda 已不可用：手动编辑 `~/.bashrc`，删除整段：
- `# >>> conda initialize >>>`
- `# <<< conda initialize <<<`

## 3) 删除安装目录

```bash
rm -rf ~/miniforge3
```

## 4) 清理残留

```bash
rm -f ~/.condarc
rm -rf ~/.conda ~/.mamba
```

## 5) 验证

```bash
which conda
conda --version
mamba --version
```
