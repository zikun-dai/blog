---
title: router
pubDate: 2026-01-13 17:07:48
tags: [tech]
description: 路由器配置
---

## 路由器基础 & 计网复习

### 软路由
- 负责 DHCP、NAT 等操作，相当于 AC。
- 这一层可以直接设置 VPN。

### 硬路由
- 只负责无线/有线连接设备，相当于 AP。

### 旁路由
- 接在软路由或硬路由下，本身联通外网。
- 在路由器/需翻墙设备中设置网关与 DNS 为旁路由 IP。
- Apple TV、局域网设备均可作为旁路由（建议长期开机的设备，如 Mac mini、Apple TV、NAS）。
- 旁路由出问题时，网关改回主路由即可。

### HTTPS 转发（类似旁路由）

```bash
export http_proxy=http://10.48.5.165:7890
export https_proxy=$http_proxy
export ALL_PROXY=$http_proxy
```

用途：
- 电脑 VPN 开代理模式但终端没网，可临时转发。
- 服务器无管理员权限，安装 Clash 复杂时可用。
- 借用别人 VPN 时，对方开放 7890 端口即可访问。

### PPPoE
- 拨号，相当于光猫（通过网线而不是光纤）。

### DHCP
- 依托上级网络，上级有网就有网。

### 有线中继 / Bridge / AP
- 关闭 DHCP 与 NAT，相当于校园网 AP。
- IP 地址分发走校园网 AC（类似直接连接 NJU-WLAN）。
- 一个 AC 下接很多 AP，属于单一核心节点的辐射结构（区别于 Mesh）。

### Mesh
- 有主路由，但整体形成网状结构；有线/无线回程会自动寻路。
- 有线组网时子路由相当于 AP，但 AP 不负责 DHCP/NAT。
- 无线组网时新建局域网，WAN 通过无线传输。

### 蓝牙与蓝牙 Mesh
- 蓝牙：点对点，依赖单一中心节点，超出范围即失效。
- 蓝牙 Mesh：子节点可通信，覆盖更广。

### NAT
- 局域网设备通过路由器 IP 转发上网。
- 虚拟机 guest IP 转发到物理机 host IP；电脑相当于路由器。
- 可在 VMware/VirtualBox 映射虚拟机 22 端口到 localhost 高端口，便于 SSH。

### 桥接 Bridge
- 虚拟机直接越过物理机，由路由器分配 IP（路由器 -> 物理机 -> 虚拟机）。
- 设备直接越过路由器，由校园网分配 IP（校园网 -> 路由器 -> 设备）。
- 设备直接获得公网 IP（IPv6 默认公网）。

### NAT 回环
- guest:3389 映射到 host:1103，局域网其他设备可访问 host:1103。
- 本机访问 host:1103 会走一个环路。

### localhost 本地回环
- 本机访问本机。

## 待验证
- 测试电脑开梯子作为网关，让 Switch 走代理。
- 测试蒲公英游戏组网。

<img src="router/DCAA2D48-2CE0-4F57-AE1F-C0E53C145353.jpeg" alt="客网日记" style="zoom: 25%;" />
