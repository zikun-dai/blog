---
title: server
pubDate: 2026-01-15 19:01:22
tags: [tech]
description: 实验室服务器配置指南的更新版，新增Windows和wsl的建议项
---

服务器配置指南



:::note

把notion里的 Miniconda 步骤，等价替换成 Miniforge + mamba

原文链接：[NJU-3DV 实验室服务器使用与配置手册](https://stingy-basin-115.notion.site/NJU-3DV-d9f0de862cbd4b9f9c12b5474cac76e1)
:::





## 以下配置有问题，先不要用

### 0)配置VPN

- 直接开启vpn的tun模式

> [!TIP]
>
> 尽量不要设置全局的http环境变量，需要下载huggingface、GitHub时开一下tun模式，这样最干净；
>
> 或者需要时临时设置一下export

> [!CAUTION]
>
> win有时tun用不了codex，可以换个节点试试，大多数时候能用；mac只能使用代理模式，tun没网；虚拟机只能使用tun，代理模式用不了ai）



- 也可以修改环境变量

  ```bash
  # 最好添加到.bashrc里
  export http_proxy=http://127.0.0.1:7890
  # export http_proxy=http://10.48.5.165:7890	# server端clash允许局域网，client端export之后可以借网
  export https_proxy=$http_proxy
  export ALL_PROXY=$http_proxy
  ```

  或者直接在`用户`环境变量里改

  > 查看当前环境变量
  >
  > ```bash
  > # powershell
  > $env:http_proxy
  > $env:https_proxy
  > $env:all_proxy
  > # wsl/Ubuntu
  > echo $http_proxy
  > echo $https_proxy
  > echo $all_proxy
  > ```
  >
  > 取消设定环境变量
  >
  > ```bash
  > # Windows下·需要在`用户`环境变量里清空，然后重新打开终端
  > 
  > # wsl/ubuntu在.bashrc里删除相关的，然后`source ~/.bashrc`或重开终端
  > ```

- 测试连通性

  ```bash
  curl https://www.google.com # 可选-v，显示更简洁
  # ping不走http协议，只有tun模式能ping通
  ```

  

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
# ~/miniconda3/bin/conda init bash	#用于切换miniconda3和miniforge3，只影响`~/.bash
exec bash
```

> [!CAUTION]
>
> 目前forge3一个很大的问题是`Failed to connect to repo.anaconda.com port 443`（安装scan2BIM时报错）
>
> 普通创建一个py313_env时没有问题

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





# 删除miniforge3

## 0) 先确认你 Miniforge 装在哪（别删错）

在 WSL 里：

```bash
conda info --base
```

它会输出 base 目录（比如 `/home/wsl-jake/miniforge3`）。后面我用这个路径叫 `$BASE`。

------

## 1) 可选：备份环境列表/导出（以防想迁移）

```bash
conda env list
# 需要的话导出某个环境
# conda env export -n <envname> > <envname>.yml
```

------

## 2) 撤销 conda init（把 .bashrc 里那段初始化删掉）

在你删目录之前做这个最省事：

```bash
conda init --reverse bash
exec bash
```

`conda init` 官方文档明确有 `--reverse`，作用是“撤消上次 conda init 的效果”。([docs.conda.org.cn](https://docs.conda.org.cn/projects/conda/en/stable/commands/init.html))

> 如果你用的是 zsh，就把 `bash` 换成 `zsh`。

**如果这一步报错（conda 已经不能用了）**
那就手动编辑 `~/.bashrc`，删掉这段（整段删除）：

- `# >>> conda initialize >>>`
- `# <<< conda initialize <<<`

------

## 3) 删除 Miniforge 安装目录（卸载本体）

假设 `conda info --base` 输出的是 `~/miniforge3`：

```bash
rm -rf ~/miniforge3
```

------

## 4) 清理残留（建议做，避免以后奇怪的 channel/缓存问题）

```bash
rm -f ~/.condarc
rm -rf ~/.conda ~/.mamba
```

------

## 6) 验证

```bash
which conda
conda --version
mamba --version
```

------

如果你把 `conda info --base` 的输出贴一下（就一行路径），我也可以按你实际的安装目录把“删除哪些文件/目录”再精准一点列出来。
