---
title: LLVM IR语法—链接类型
description: 介绍LLVM IR语法中的链接类型
---

在LLVM中，模块由全局值列表组成，全局值由指向内存位置的指针表示，每个全局值都有一种链接类型，用于在链接阶段指示链接器如何处理全局值。

> 这里说明一下一些前置概念
> - 全局值：函数和全局变量的统称
> - 对象文件：`.o` 文件

## private
- 此链接类型的全局值只能由当前模块内的对象直接访问
- 当对象文件链接时，如果一个模块中链接类型为 `private` 的全局值与另一个模块中的全局值冲突，那么这个模块中的链接类型为 `private` 的全局值都会被重命名，所有对被重命名的全局值的引用也会更新
- 此链接类型的全局值不会出现在对象文件的符号表中
- C语言中的字符串字面量的链接类型就是 `private`

```c
// C语言源码
int main() {
    char *s = "111";
}
```
```llvm
; LLVM IR文本形式
@.str = private unnamed_addr constant [4 x i8] c"111\00", align 1

define dso_local i32 @main() #0 !dbg !7 {
  %1 = alloca i8*, align 8
  call void @llvm.dbg.declare(metadata i8** %1, metadata !12, metadata !DIExpression()), !dbg !15
  store i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str, i64 0, i64 0), i8** %1, align 8, !dbg !15
  ret i32 0, !dbg !16
}

declare void @llvm.dbg.declare(metadata, metadata, metadata) #1

; ......属性信息略去......
```

## internal
- 与 `private` 链接类型类似
- 此链接类型的全局值会作为局部变量出现在对象文件中（在ELF中为 `STB_LOCAL` ）
- 对应C语言中的 `static` 关键字

```c
// C语言源码
static int x = 1;

int main() {
    static int y = 1;
    int z = x + y;
}
```

```llvm
; LLVM IR文本形式
@main.y = internal global i32 1, align 4, !dbg !0
@x = internal global i32 1, align 4, !dbg !11

define dso_local i32 @main() #0 !dbg !2 {
  %1 = alloca i32, align 4
  call void @llvm.dbg.declare(metadata i32* %1, metadata !17, metadata !DIExpression()), !dbg !18
  %2 = load i32, i32* @x, align 4, !dbg !19
  %3 = load i32, i32* @main.y, align 4, !dbg !20
  %4 = add nsw i32 %2, %3, !dbg !21
  store i32 %4, i32* %1, align 4, !dbg !18
  ret i32 0, !dbg !22
}

declare void @llvm.dbg.declare(metadata, metadata, metadata) #1

; ......属性信息略去......
```

## available_externally

- 此链接类型的全局值不会被输出到对象文件
- 从链接器的角度来看，此链接类型的的全局值等效于外部声明，它们的存在是为了在已知全局定义的情况（从模块以外的地方得知）下允许进行内联和其他优化
- 此链接类型的全局值可以随意丢弃，并允许内联和其他优化
- 这种链接类型只允许用于定义，不允许用于声明

> 官方解释不说人话，看不太懂

## linkonce

- 此链接类型的全局值在链接时会与同名的全局值合并
- 可用于实现某些形式的内联函数、模板或其他代码（这些代码必须在每个使用它的翻译单元中生成，但代码的函数主体可能稍后会被更明确的定义覆盖）
- 允许丢弃未引用的 `linkonce` 链接类型的全局值

请注意，如果一个函数的链接类型为 `linkonce`，则不允许优化器将该函数的主体内联到调用者中，因为不确定该函数的定义是否为程序中的定义或者该函数的定义是否会被更明确的定义覆盖。如果要启用内联和其他优化，请使用 `linkonce_odr` 链接类型。
​
## weak

- `weak` 链接类型与 `linkonce` 链接类型一样会合并同名全局值，但是未引用的 `weak` 全局值不能被丢弃
- 这用于在 C 源代码中声明`weak`全局值（详见[C语言中的强符号与弱符号](https://blog.csdn.net/astrotycoon/article/details/8008629)）

```c
// C语言源码
#pragma weak func

void func() { }
```

> 上述代码等效为 `void __attribute__((weak)) func() { }`

```llvm
; LLVM IR文本形式
define weak dso_local void @func() #0 !dbg !7 {
  ret void, !dbg !11
}

; ......属性信息略去......
```

## common

- `common` 链接类型与 `weak` 链接类型最为相似，它们都用于C语言中的临时定义，例如在全局作用域的 `int X;` 
- `common` 链接类型具有和 `weak` 链接类型一样的合并语义，而且未引用的 `common` 全局值不能被删除
- `common` 符号不能有明确的值，必须进行零初始化，并且不能被标记为 `constant`
- 函数和别名不能为 `common` 链接类型

## appending

- `appending` 链接类型只能用于的数组类型的全局变量
-  当两个链接类型为 `appending` 的全局变量在一起链接时，这两个全局数组将会被连接在一起，相当于在链接对象文件时让系统链接器将具有相同名称的部分连接在一起。
- 不过这并不对应对象文件中的任何功能，因此它只能用于像 `llvm.global_ctors` 等LLVM专门解释的变量

## extern_weak
此链接类型的语义遵循ELF对象文件模型：符号在链接之前是弱的，如果未链接，则符号变为 `null` 而不是未定义的引用。

## linkonce_odr, weak_odr

- 某些语言允许合并不同的全局值，例如具有不同语义的两个函数。但 C++等语言确保只有等效的全局值才会被合并（*one definition rule规则*, 简称ODR）。此类语言可以使用 `linkonce_odr` 和 `weak_odr` 链接类型来指示只有等效的全局变量才会被合并
- 这两种链接类型在其他方面与其非 odr 版本相同

```c
// C语言源码
inline int f() {
    return 123;
}

int main() {
    int x = f();
}
```

```llvm
; LLVM IR文本形式
$_Z1fv = comdat any

define dso_local i32 @main() local_unnamed_addr #0 !dbg !7 {
  %1 = call i32 @_Z1fv(), !dbg !14
  call void @llvm.dbg.value(metadata i32 %1, metadata !13, metadata !DIExpression()), !dbg !15
  ret i32 0, !dbg !16
}

define linkonce_odr dso_local i32 @_Z1fv() local_unnamed_addr #1 comdat !dbg !17 {
  ret i32 123, !dbg !18
}

declare void @llvm.dbg.value(metadata, metadata, metadata) #2

; ......属性信息略去......
```
## external
如果全局值没有使用上面任何一个链接类型，那么这个全局值的链接类型就是 `external`，这意味着它参与链接并可用于解析外部符号引用。


## 说明
真正的全局变量和函数（这里“真正”指的是可以被其他模块使用）的链接类型只能是 `external` 或者 `external_weak`。
