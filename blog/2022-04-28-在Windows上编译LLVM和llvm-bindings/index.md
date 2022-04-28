---
title: 在Windows上编译LLVM和llvm-bindings
description: 在Windows上编译LLVM和llvm-bindings
tags: [编译器, LLVM, JavaScript, TypeScript, llvm-bindings]
---

## 序言

之前只在 Linux 和 macOS 上用过 LLVM，从来没有在 Windows 上用过，最近心血来潮在 [llvm-bindings](https://github.com/ApsarasX/llvm-bindings) 的 github action 上添加 Windows 的工作流，顺便了解了一下 LLVM 在 Windows 上的编译和安装。

LLVM 在 Github 的 [Release 页](https://github.com/llvm/llvm-project/releases) 上提供了 LLVM 各个版本的 Windows 安装包，文件名一般都是 `LLVM-13.0.1-win64.exe` 这样的格式，使用 Chocolatey 安装 LLVM 也是安装的这种安装包。

但是很遗憾，这种安装包是残缺不全的，只有一些基础的 clang 相关的命令，并不包含大多数 LLVM 的 lib，所以在 Windows 使用 LLVM 只能自己从源码编译了。

<!--truncate-->

## 系统环境

本文我仅以使用 MSVC 的编译方式为例讲述步骤，对于使用 MSYS2、Mingw-w64、Cygwin 等其他编译工具链的编译方式不再说明。

编译前需要在 Windows 上安装以下软件，版本越新越好：

- Visual Studio
- CMake
- Python
- Git

## 编译 LLVM

首先克隆 LLVM Project：

```powershell
git clone -b release/13.x https://github.com/llvm/llvm-project.git
cd llvm-project
```

然后执行 CMake 配置命令：

```powershell
cmake -Thost=x64 -B build -DCMAKE_BUILD_TYPE=Release -DCPACK_GENERATOR=ZIP -DLLVM_TARGETS_TO_BUILD=X86 -DLLVM_INCLUDE_TESTS=OFF llvm
```

再然后执行编译命令：

```powershell
cmake --build build --config Release --target package
```

编译完成后，`build` 目录下有一个文件名是 `LLVM-13.0.1-win64.zip` 的压缩包，这就是编译打包后的 LLVM 产物，将其解压到一个目录备用，这里我们假设解压目录是 `C:\Users\dev\LLVM-13.0.1-win64\LLVM-13.0.1-win64`。

## 编译 llvm-bindings

编译完 LLVM 之后，我们来基于编译好的 LLVM 产物编译 `llvm-bindings`，当然在这之前需要在系统上安装好 Node.js。

首先克隆 `llvm-bindings` 源码：

```powershell
git clone https://github.com/ApsarasX/llvm-bindings.git
cd llvm-bindings
```

然后使用 npm 配置 LLVM_DIR 环境变量：

```powershell
npm config set cmake_LLVM_DIR C:\Users\dev\LLVM-13.0.1-win64\LLVM-13.0.1-win64\lib\cmake\llvm
```

最后执行 npm scripts 中的编译命令：

```powershell
npm run build:release
```

:::caution
这里有一个坑，在 Windows 上，LLVM 和 llvm-bindings 的构建模式必须是一致的，也就是说，LLVM 和 llvm-bindings 要么都是 Debug 模式，要么都是 Release 模式，如果混用，在编译 llvm-bindings 时会报错，切记！
:::