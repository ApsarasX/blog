# LLVM概述—介绍与安装

## 一、介绍

*官方定义*：**LLVM是一个模块化和可重用的编译器和工具链技术的集合**

LLVM最初是在2000年由伊利诺伊大学香槟分校(UUIC)的学生Chris Lattner及其硕士顾问Vikram Adve创建的研究项目，并在2003年发布第一个正式版本，目的是提供一种基于SSA的现代编译策略，这种策略能够支持任何编程语言的静态和动态编译。

LLVM是当今最流行的开源编译器框架项目，你可以使用它编写自己的编译器。

> LLVM的命名最早源自于底层虚拟机（Low Level Virtual Machine）的首字母缩写，由于这个项目的范围并不局限于创建一个虚拟机，这个缩写导致了广泛的疑惑。LLVM开始成长之后，成为众多编译工具及低端工具技术的统称，使得这个名字变得更不贴切，开发者因而决定放弃这个缩写的意涵，现今LLVM已单纯成为一个品牌，适用于LLVM下的所有项目。

## 二、安装

### 使用官方安装脚本安装

> 仅适用于Debian/Ubuntu

```shell
wget https://apt.llvm.org/llvm.sh
chmod +x llvm.sh
sudo ./llvm.sh 13
```

### 使用官方预编译二进制安装

> 以在Ubuntu 20.04安装LLVM 13.0.1为例

```shell
sudo mkdir -p /usr/local
cd /usr/local
sudo wget https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.1/clang+llvm-13.0.1-x86_64-linux-gnu-ubuntu-20.04.tar.xz
sudo tar xvf clang+llvm-13.0.1-x86_64-linux-gnu-ubuntu-20.04.tar.xz
sudo mv clang+llvm-13.0.1-x86_64-linux-gnu-ubuntu-20.04 llvm
export PATH="$PATH:/usr/local/llvm/bin"
```

### 使用包管理器安装

#### Ubuntu

先在 `/etc/apt/source.list` 中加入以下内容

```
deb http://apt.llvm.org/focal/ llvm-toolchain-focal-13 main
deb-src http://apt.llvm.org/focal/ llvm-toolchain-focal-13 main
```

然后执行以下shell命令

```shell
sudo apt update

sudo apt install clang-13
```

> 安装Clang编译器时会自动安装所依赖的LLVM

#### macOS

```shell
brew install llvm
```

### 从源码编译安装

> 以LLVM 13.0.1为例

#### 预置条件

编译LLVM需要事先在系统中安装符合以下条件的软件
- CMake >= 3.4.3
- GCC >= 5.1.0
- Python >= 2.7
- zlib >= 1.2.3.4
- GNU Make >= 3.79

#### 编译命令

```shell
# 下载源码
wget https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.1/llvm-project-13.0.1.src.tar.xz
# 解压源码
tar xvf llvm-project-13.0.1.src.tar.xz
# 新建安装目录
sudo mkdir -p /usr/local/llvm
# 新建编译目录
sudo mkdir -p llvm-project-13.0.1.src/build
# 进入编译目录
cd llvm-project-13.0.1.src/build
# cmake生成编译信息
cmake -G "Unix Makefiles" -DLLVM_ENABLE_PROJECTS="clang" -DLLVM_TARGETS_TO_BUILD=X86 -DCMAKE_BUILD_TYPE="Release" -DLLVM_INCLUDE_TESTS=OFF -DCMAKE_INSTALL_PREFIX="/usr/local/llvm" ../llvm
# 编译
make
# 安装到安装目录
make install
```

`/usr/local/llvm` 是安装目录, `llvm-project-13.0.1.src` 是源码目录, `llvm-project-13.0.1.src/build` 是编译产物目录。

这里用的构建工具是make，当然也可以用速度更快的ninja。
