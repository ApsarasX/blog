---
title: 解决nvm导致终端初始化慢的问题
description: 解决nvm导致终端初始化慢的问题
tags: [Node.js, nvm, 终端]
---

## 问题

安装 nvm 时，nvm 安装脚本会自动往 `.zshrc` 或者 `.bashrc` 中写入以下内容：

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

但是以后每当我打开终端时，终端总是很慢，初始化时间大约有3-4s，通过查阅资料发现，罪魁祸首是 nvm 自动加载脚本。

nvm 安装脚本往 `.zshrc` 或者 `.bashrc` 中写入的 `"$NVM_DIR/nvm.sh"` 脚本会自动加载 nvm 及其各种环境变量，但该脚本执行耗时较多，会拖慢终端初始化速度。

<!--truncate-->

## 解决方案

解决方案就是按需加载，在 `.zshrc` 或者 `.bashrc` 中编写 nvm/node/npm/npx/yarn 等自定义命令覆盖原有的同名命令，当在一个终端会话中首次执行这些命令时，进行以下步骤：

1. 先删除我们自定义的这些 nvm/node/npm/npx/yarn 命令
2. 然后加载 nvm 及其附加环境
3. 最后执行用户所输入命令对应的真实命令，并将所有的参数进行转发。

修改后的 nvm 按需加载脚本如下所示，只需要将下面的内容替换 nvm 安装脚本在 `.zshrc` 或者 `.bashrc` 中写入的内容即可：

```shell
export NVM_DIR="$HOME/.nvm"
function load_nvm() {
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
}
function nvm() {
    unset -f nvm node npm npx yarn
    load_nvm
    nvm "$@"
}
function node() {
    unset -f nvm node npm npx yarn
    load_nvm
    node "$@"
}
function npm() {
    unset -f nvm node npm npx yarn
    load_nvm
    npm "$@"
}
function npx() {
    unset -f nvm node npm npx yarn
    load_nvm
    npx "$@"
}
function yarn() {
    unset -f nvm node npm npx yarn
    load_nvm
    yarn "$@"
}
```

## 参考资料
- [解决nvm加载慢的问题 - 雾非雾的情思](https://www.mspring.org/2020/11/02/%E8%A7%A3%E5%86%B3nvm%E5%8A%A0%E8%BD%BD%E6%85%A2%E7%9A%84%E9%97%AE%E9%A2%98/)
- [解决nvm导致终端启动慢的问题 - 简书](https://www.jianshu.com/p/e1598eb2df8e)
- [使用nvm导致zsh启动慢 | SHANG Blog | I am who I am](https://blog.xinshangshangxin.com/2017/06/07/zsh-nvm-slow/)
