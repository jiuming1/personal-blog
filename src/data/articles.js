/**
 * 文章数据
 */

import { initializeArticleViews, getArticlesWithViews } from '../utils/viewCounter';

export const articles = [
  {
    id: '1',
    title: 'MATLAB 数值计算基础与实践',
    excerpt: 'MATLAB 是数值计算领域的重要工具，本文将详细介绍 MATLAB 的基础语法、矩阵运算、数值分析等核心功能，并通过实际案例展示其在工程计算中的应用。',
    content: `
# MATLAB 数值计算基础与实践

MATLAB 是数值计算领域的重要工具，广泛应用于工程计算、科学研究和数据分析。本文将详细介绍 MATLAB 的基础语法、矩阵运算、数值分析等核心功能。

## 基础语法

### 变量定义

\`\`\`matlab
% 标量变量
a = 10;
b = 3.14;

% 向量
v = [1, 2, 3, 4, 5];
v2 = 1:5;  % 等价于 [1, 2, 3, 4, 5]

% 矩阵
A = [1, 2, 3; 4, 5, 6; 7, 8, 9];
\`\`\`

### 矩阵运算

\`\`\`matlab
% 矩阵乘法
C = A * B;

% 元素级运算
D = A .* B;  % 元素级乘法
E = A ./ B;  % 元素级除法

% 矩阵转置
A_transpose = A';
\`\`\`

## 数值分析

### 线性代数

\`\`\`matlab
% 求解线性方程组 Ax = b
A = [2, 1; 1, 3];
b = [4; 5];
x = A \\ b;

% 特征值和特征向量
[V, D] = eig(A);
\`\`\`

### 数值积分

\`\`\`matlab
% 定积分
f = @(x) x.^2 + 2*x + 1;
integral_value = integral(f, 0, 1);

% 数值微分
x = 0:0.1:2*pi;
y = sin(x);
dy_dx = diff(y) ./ diff(x);
\`\`\`

## 信号处理

\`\`\`matlab
% 傅里叶变换
Fs = 1000;  % 采样频率
t = 0:1/Fs:1-1/Fs;
x = sin(2*pi*100*t) + sin(2*pi*200*t);
X = fft(x);
f = (0:length(X)-1)*Fs/length(X);
\`\`\`

## 控制系统设计

\`\`\`matlab
% 传递函数
num = [1];
den = [1, 2, 1];
sys = tf(num, den);

% 阶跃响应
step(sys);
grid on;
\`\`\`

## 总结

MATLAB 提供了强大的数值计算能力，通过掌握这些基础功能，可以高效地进行工程计算和科学研究。
    `,
    author: 'cty',
    publishDate: '2025-01-15',
    category: 'numerical',
    tags: ['MATLAB', '数值计算', '矩阵运算', '信号处理'],
    readTime: 12,
    likes: 156,
    coverImage: '/personal-blog/images/projects/matlab.webp',
    featured: true,
  },
  {
    id: '2',
    title: 'ANSYS Fluent 流体仿真入门指南',
    excerpt: 'ANSYS Fluent 是业界领先的 CFD 软件，本文将介绍 Fluent 的基本操作、网格生成、求解设置等核心内容，帮助初学者快速上手流体仿真。',
    content: `
# ANSYS Fluent 流体仿真入门指南

ANSYS Fluent 是业界领先的 CFD（计算流体动力学）软件，广泛应用于航空航天、汽车、能源等领域的流体仿真分析。

## 工作流程

### 1. 几何建模

在 DesignModeler 或 SpaceClaim 中创建几何模型。

### 2. 网格生成

\`\`\`text
Mesh Generation Steps:
1. 导入几何模型
2. 设置网格尺寸
3. 生成网格
4. 检查网格质量
\`\`\`

### 3. 求解设置

#### 物理模型选择

\`\`\`text
常用物理模型：
- 湍流模型：k-ε, k-ω, SST
- 多相流模型：VOF, Mixture, Eulerian
- 传热模型：能量方程
\`\`\`

#### 边界条件设置

\`\`\`text
常见边界条件：
- 入口：速度入口、压力入口
- 出口：压力出口、自由出口
- 壁面：无滑移、滑移
- 对称面：对称边界
\`\`\`

### 4. 求解计算

\`\`\`text
求解步骤：
1. 初始化流场
2. 设置收敛标准
3. 开始迭代计算
4. 监控收敛性
\`\`\`

## 后处理分析

### 结果可视化

\`\`\`text
常用后处理功能：
- 速度矢量图
- 压力云图
- 流线图
- 温度分布
- 湍流强度
\`\`\`

### 数据导出

\`\`\`text
导出格式：
- 图片：PNG, JPG, TIFF
- 动画：AVI, MP4
- 数据：CSV, DAT
\`\`\`

## 实际案例

### 管道流动分析

\`\`\`text
分析步骤：
1. 创建管道几何模型
2. 生成结构化网格
3. 设置入口速度边界条件
4. 选择 k-ε 湍流模型
5. 求解并分析结果
\`\`\`

## 总结

ANSYS Fluent 提供了强大的流体仿真能力，通过系统学习和实践，可以有效地进行各种复杂的流体分析。
    `,
    author: 'cty',
    publishDate: '2025-01-10',
    category: 'simulation',
    tags: ['ANSYS Fluent', 'CFD', '流体仿真', '网格生成'],
    readTime: 15,
    likes: 134,
    coverImage: '/personal-blog/images/projects/ansys.png',
    featured: true,
  },
  {
    id: '3',
    title: 'Python中解决Chrome中文字体显示为方框乱码的问题',
    excerpt: '当在Python中使用Chrome对网站进行截图保存的时候，里面中文出现了方框乱码。最后发现在CentOS或RHEL系统上处理中文内容时，这是因为系统默认没有安装中文字体包。',
    content: `
# Python中解决Chrome中文字体显示为方框乱码的问题

当在Python中使用Chrome对网站进行截图保存的时候，里面中文出现了方框乱码。最后发现在CentOS或RHEL系统上处理中文内容时，这是因为系统默认没有安装中文字体包。所以导致了这一现象。

## 字体显示问题示例如下

在CentOS系统上，如果没有安装中文字体，Chrome截图中的中文会显示为方框：

\`\`\`python
# 示例：截图中的中文显示为方框
# 原文本：你好世界
# 显示效果：□□□□
\`\`\`

## 在CentOS上安装中文字体的正确方法

### 1. 使用yum安装中文字体

\`\`\`bash
# 安装文泉驿中文字体
sudo yum install -y wqy-zenhei-fonts wqy-microhei-fonts

# 或者使用dnf (CentOS 8/RHEL 8 及以上)
sudo dnf install -y wqy-zenhei-fonts wqy-microhei-fonts
\`\`\`

### 2. 验证字体是否安装成功

\`\`\`bash
# 检查字体文件是否存在
ls -la /usr/share/fonts/wqy-zenhei/
ls -la /usr/share/fonts/wqy-microhei/

# 查看系统字体列表
fc-list | grep -i wqy
\`\`\`

### 3. 刷新字体缓存

\`\`\`bash
# 刷新字体缓存
sudo fc-cache -fv

# 重启Chrome服务
sudo systemctl restart chrome-remote-desktop
\`\`\`

### 4. 在Python代码中设置字体

\`\`\`python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# 设置Chrome选项
chrome_options = Options()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

# 设置字体路径
chrome_options.add_argument('--font-render-hinting=none')
chrome_options.add_argument('--disable-font-subpixel-positioning')

# 创建WebDriver实例
driver = webdriver.Chrome(options=chrome_options)
\`\`\`

## 其他解决方案

### 使用Docker容器

如果不想在系统上安装字体，可以使用Docker容器：

\`\`\`dockerfile
FROM selenium/standalone-chrome:latest

# 安装中文字体
RUN apt-get update && apt-get install -y \\
    fonts-wqy-zenhei \\
    fonts-wqy-microhei \\
    && fc-cache -fv
\`\`\`

### 使用系统字体

也可以使用系统自带的其他中文字体：

\`\`\`bash
# 安装其他中文字体包
sudo yum install -y google-noto-sans-cjk-fonts
sudo yum install -y adobe-source-han-sans-cn-fonts
\`\`\`

## 最后结果

安装字体后，Chrome截图中的中文应该能够正常显示：

\`\`\`python
# 安装字体后的效果
# 原文本：你好世界
# 显示效果：你好世界 ✅
\`\`\`

## 总结

解决Chrome中文字体显示问题的关键步骤：

1. **安装中文字体包**：使用yum或dnf安装文泉驿字体
2. **刷新字体缓存**：运行fc-cache命令更新字体缓存
3. **重启服务**：重启Chrome相关服务
4. **代码配置**：在Python代码中正确配置Chrome选项

通过这些步骤，可以确保在CentOS/RHEL系统上使用Chrome进行截图时，中文字符能够正常显示。
    `,
    author: 'cty',
    publishDate: '2025-01-05',
    category: 'programming',
    tags: ['Python', 'Chrome', '字体', 'CentOS', '中文'],
    readTime: 8,
    likes: 89,
    coverImage: '/personal-blog/images/projects/python.png',
    featured: false,
  },
  {
    id: '4',
    title: 'COMSOL Multiphysics 多物理场仿真实践',
    excerpt: 'COMSOL Multiphysics 是强大的多物理场仿真平台，本文将介绍其在不同物理场耦合中的应用，包括电磁、热、结构等领域的仿真案例。',
    content: `
# COMSOL Multiphysics 多物理场仿真实践

COMSOL Multiphysics 是强大的多物理场仿真平台，能够处理复杂的多物理场耦合问题。本文将介绍其在不同物理场耦合中的应用。

## 多物理场基础

### 物理场类型

\`\`\`text
COMSOL 支持的物理场：
- 电磁场：静电场、静磁场、电磁波
- 结构力学：固体力学、壳、梁
- 流体流动：单相流、多相流、多孔介质
- 传热：传导、对流、辐射
- 声学：压力声学、结构声学
- 化学：反应工程、传质
\`\`\`

## 电磁-热耦合

### 感应加热仿真

\`\`\`text
仿真步骤：
1. 几何建模：工件和线圈
2. 物理场设置：
   - 磁场：AC/DC 模块
   - 传热：传热模块
3. 耦合设置：焦耳热
4. 求解和后处理
\`\`\`

### 微波加热

\`\`\`text
关键设置：
- 电磁波：频域求解
- 传热：瞬态求解
- 材料属性：介电常数、损耗角正切
- 边界条件：完美电导体、辐射边界
\`\`\`

## 流-固耦合

### 流体-结构相互作用

\`\`\`text
FSI 仿真流程：
1. 流体域建模
2. 固体域建模
3. 耦合边界设置
4. 网格生成
5. 求解设置
6. 结果分析
\`\`\`

### 阀门仿真

\`\`\`text
应用案例：
- 几何：阀门和管道
- 物理场：流体流动 + 固体力学
- 边界条件：入口压力、出口压力
- 耦合：流体压力作用在固体上
\`\`\`

## 热-结构耦合

### 热应力分析

\`\`\`text
分析步骤：
1. 传热分析
2. 温度场结果传递到结构分析
3. 热应力计算
4. 变形和应力分析
\`\`\`

## 实际应用

### 电子设备散热

\`\`\`text
仿真内容：
- 几何：PCB、芯片、散热器
- 物理场：传热 + 流体流动
- 边界条件：热源、环境温度
- 目标：优化散热设计
\`\`\`

## 总结

COMSOL Multiphysics 提供了强大的多物理场仿真能力，通过合理设置物理场耦合，可以准确模拟复杂的工程问题。
    `,
    author: 'cty',
    publishDate: '2025-01-01',
    category: 'simulation',
    tags: ['COMSOL', '多物理场', '电磁仿真', '流固耦合'],
    readTime: 14,
    likes: 89,
    coverImage: '/personal-blog/images/projects/comsol.png',
    featured: false,
  },
  {
    id: '5',
    title: 'Python 在科学计算中的高级应用',
    excerpt: 'Python 已成为科学计算的重要工具，本文将介绍 NumPy、SciPy、Pandas 等库的高级用法，以及如何构建高效的数值计算程序。',
    content: `
# Python 在科学计算中的高级应用

Python 已成为科学计算的重要工具，通过丰富的库生态系统，可以高效地进行各种数值计算和数据分析。

## 核心库介绍

### NumPy 高级用法

\`\`\`python
import numpy as np

# 广播机制
A = np.array([[1, 2, 3], [4, 5, 6]])
B = np.array([10, 20, 30])
C = A + B  # 自动广播

# 高级索引
arr = np.random.rand(10, 10)
mask = arr > 0.5
filtered = arr[mask]

# 线性代数
A = np.random.rand(3, 3)
eigenvals, eigenvecs = np.linalg.eig(A)
\`\`\`

### SciPy 数值计算

\`\`\`python
from scipy import optimize, integrate, interpolate

# 优化
def objective(x):
    return x[0]**2 + x[1]**2

result = optimize.minimize(objective, [1, 1])
print(f"最小值: {result.fun}")

# 数值积分
def func(x):
    return np.sin(x) * np.exp(-x)

integral_value, error = integrate.quad(func, 0, np.inf)

# 插值
x = np.linspace(0, 10, 20)
y = np.sin(x)
f_interp = interpolate.interp1d(x, y, kind='cubic')
\`\`\`

### Pandas 数据处理

\`\`\`python
import pandas as pd

# 数据读取
df = pd.read_csv('simulation_data.csv')

# 数据清洗
df_clean = df.dropna()
df_filtered = df[df['temperature'] > 300]

# 统计分析
summary = df.groupby('category').agg({
    'value': ['mean', 'std', 'count']
})
\`\`\`

## 性能优化

### 向量化计算

\`\`\`python
# 低效的循环方式
def slow_calculation(x, y):
    result = []
    for i in range(len(x)):
        result.append(x[i] * y[i] + np.sin(x[i]))
    return np.array(result)

# 高效的向量化方式
def fast_calculation(x, y):
    return x * y + np.sin(x)
\`\`\`

### 并行计算

\`\`\`python
from multiprocessing import Pool
import numpy as np

def parallel_function(x):
    return np.sin(x) * np.exp(-x)

# 并行计算
with Pool(4) as pool:
    results = pool.map(parallel_function, np.linspace(0, 10, 1000))
\`\`\`

## 可视化

### Matplotlib 高级绘图

\`\`\`python
import matplotlib.pyplot as plt

# 子图
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# 3D 绘图
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
X, Y = np.meshgrid(x, y)
Z = np.sin(X) * np.cos(Y)
ax.plot_surface(X, Y, Z)
\`\`\`

## 实际应用案例

### 有限元分析

\`\`\`python
def finite_element_analysis(mesh, material_properties):
    # 组装刚度矩阵
    K = assemble_stiffness_matrix(mesh, material_properties)
    
    # 组装载荷向量
    F = assemble_force_vector(mesh, loads)
    
    # 求解位移
    u = np.linalg.solve(K, F)
    
    return u
\`\`\`

## 总结

Python 为科学计算提供了强大的工具，通过合理使用各种库和优化技术，可以构建高效、可维护的数值计算程序。
    `,
    author: 'cty',
    publishDate: '2024-12-28',
    category: 'programming',
    tags: ['Python', 'NumPy', 'SciPy', '科学计算'],
    readTime: 16,
    likes: 67,
    coverImage: '/personal-blog/images/projects/python.png',
    featured: false,
  },
  {
    id: '6',
    title: 'OpenFOAM v2306 源码编译安装教程',
    excerpt: '基于CentOS 9 Stream系统的OpenFOAM v2306源码编译安装详细指南，涵盖系统准备、依赖安装、环境配置、编译过程及常见问题解决方案，帮助用户成功构建自定义的OpenFOAM环境。',
    content: `
# OpenFOAM v2306 源码编译安装教程

基于CentOS系统的详细指南，本教程聚焦CentOS 9 Stream系统的源码编译安装流程，涵盖准备、编译、测试全流程及问题解决。

## 简介与背景

### OpenFOAM概述
OpenFOAM是开源CFD工具包，支持复杂流体模拟，广泛应用于科研与工程。

### 版本说明
v2306为稳定版本，需源码编译获取最新特性。

### 系统选择
推荐CentOS 9 Stream，CentOS 7已过时且依赖差异大。

### 安装优势
源码编译可自定义配置，适配特定硬件环境。

## 系统准备（CentOS 9 Stream）

### 权限配置
添加用户sudo权限，需注销重登生效：

\`\`\`bash
usermod -aG wheel 用户名
\`\`\`

### 系统更新
确保软件包最新：

\`\`\`bash
sudo dnf update -y
\`\`\`

### 开发工具组
安装gcc、g++等编译工具：

\`\`\`bash
sudo dnf groupinstall "Development Tools" -y
\`\`\`

## 依赖库安装

### 核心依赖
\`\`\`bash
sudo dnf install -y epel-release
sudo dnf install -y openmpi-devel cmake flex bison
\`\`\`

### 数值库
\`\`\`bash
sudo dnf install -y openblas-serial-devel zlib-devel
\`\`\`

### 图形依赖
\`\`\`bash
sudo dnf install -y libXt-devel boost-devel
\`\`\`

## 源码下载与解压

### 目录创建
集中管理源码与安装文件，保持工作区整洁：

\`\`\`bash
mkdir -p ~/OpenFOAM
cd ~/OpenFOAM
\`\`\`

### 源码获取
使用wget命令从官方渠道下载核心包和第三方库：

\`\`\`bash
# 下载源码包
wget https://.../OpenFOAM-v2306.tgz
wget https://.../ThirdParty-v2306.tgz
\`\`\`

### 解压操作
通过tar命令将下载的压缩包解压至指定的OpenFOAM目录：

\`\`\`bash
# 解压文件
tar -xzf OpenFOAM-v2306.tgz
tar -xzf ThirdParty-v2306.tgz

# 可选：删除压缩包
rm *.tgz
\`\`\`

## 环境变量配置

### 配置文件
编辑 ~/.bashrc 文件以持久化环境变量，确保重启后配置依然有效：

\`\`\`bash
# 编辑用户环境变量配置文件
nano ~/.bashrc

# 在文件末尾添加以下内容：
export FOAM_INST_DIR=$HOME/OpenFOAM
export WM_NCOMPPROCS=$(nproc)
source $FOAM_INST_DIR/OpenFOAM-v2306/etc/bashrc
\`\`\`

### 生效命令
使用 source 命令使修改后的配置立即生效，无需注销或重启：

\`\`\`bash
# 保存退出后，使配置立即生效
source ~/.bashrc

# 验证环境变量是否配置正确
echo $WM_PROJECT_DIR
\`\`\`

## 编译过程

### ThirdParty库编译
\`\`\`bash
cd ~/OpenFOAM/ThirdParty-v2306

# 可选：编辑 etc/prefs.sh
# ./Allwmake -j 4  # 可选指定线程数
./Allwmake
\`\`\`

### OpenFOAM主程序编译
\`\`\`bash
cd ~/OpenFOAM/OpenFOAM-v2306

# 刷新环境变量，确保第三方库路径正确
source ~/.bashrc

# 使用所有CPU核心加速编译
./Allwmake -j $(nproc)
\`\`\`

## 安装测试与验证

### 安装测试
执行 foamInstallationTest 命令，检查基础安装和依赖是否正确配置。

### 案例运行
复制 tutorials 目录下的案例（如 incompressible/simpleFoam/pitzDaily），执行 blockMesh 和 simpleFoam 进行求解。

### 可视化
运行 paraFoam 启动后处理软件，加载案例结果，检查流场云图和矢量图是否正常显示。

## 常见问题解决

### mpi.h找不到
确认openmpi-devel开发包已安装。若已安装，检查.bashrc中MPI相关环境变量的设置顺序，确保在OpenFOAM配置前生效。

### 编译中断
编译过程中若因错误中断，可尝试清理build和platforms目录后重新编译。使用命令 \`./Allwmake -clean\` 或手动删除这些目录。

### ParaView缺失
如果编译ThirdParty时未启用ParaView，或编译失败，可以从ParaView官网手动下载预编译安装包，并将其可执行文件路径添加到系统PATH环境变量中。

### 权限错误
确保当前用户对OpenFOAM的源码目录和安装目录拥有完整的读写和执行权限。必要时使用 \`chmod\` 或 \`chown\` 命令调整权限。

## 总结与注意事项

### 核心步骤
依赖安装 → 环境配置 → 双阶段编译 → 测试验证。

### 注意事项
编译需充足时间（2-4小时），环境变量正确性是关键。

### 参考资料
OpenFOAM官网文档、CentOS官方包管理指南。
    `,
    author: 'cty',
    publishDate: '2025-06-15',
    category: 'simulation',
    tags: ['OpenFOAM', 'CFD', '源码编译', 'CentOS', '流体仿真'],
    readTime: 20,
    likes: 78,
    coverImage: '/personal-blog/images/projects/python.png',
    featured: false,
  },
  {
    id: '7',
    title: '负水锤效应分析：瞬态压力波传播机理研究',
    excerpt: '深入分析负水锤效应的物理机理，探讨压力波在管道中的传播特性，通过数值计算揭示快速瞬态与慢瞬态过程的本质差异，为工程应用提供理论指导。',
    content: `
# 负水锤效应分析：瞬态压力波传播机理研究

负水锤效应是从静止状态突然施加压力或速度，导致压力突然升高，产生一个正向压力波，其压力随时间和空间的变化会呈现出经典的瞬态波动和衰减过程。

## 基本概念

### 负水锤效应定义
负水锤效应是指从静止状态突然施加压力或速度，导致压力突然升高，产生一个正向压力波的现象。

### 物理机理
压力波在管道中传播时，其压力随时间和空间的变化会呈现出经典的瞬态波动和衰减过程。

## 时间尺度分析

### 关键参数
- 管道长度 L = 0.4 m
- 液压油声速 c ≈ 1516 m/s
- 压力波在管道中传播一个来回的时间 2L/c ≈ 0.53 ms (毫秒)
- 冲击时间是 0.1 s (100 毫秒)

### 时间尺度比较
对于 0.1 秒的冲击时间，考虑到管道尺寸和流体声速，由这个"冲击"直接产生的传统意义上的尖锐、高幅值的"负水锤效应"压力峰值，将是显著衰减且几乎可以忽略不计的。

## 瞬态过程分类

### 快速瞬态 (Fast Transient)
当 T_impact <= 2L/c 时，流速变化在压力波往返管道之前完成。在这种情况下，管内压力无法及时释放，导致压力波叠加，形成巨大的压力峰值。这是典型的"水锤"现象，遵循 Joukowsky 公式：

\`\`\`math
ΔP = ρ * c * ΔV
\`\`\`

### 慢瞬态 (Slow Transient)
当 T_impact >> 2L/c 时，流速变化非常缓慢，以至于在流速完全改变之前，压力波已经多次在管道中往返并衰减。

## 波传播分析

### 波往返周期
对于 0.1 s(100 毫秒) 的冲击时间，它相当于 100 ms / 0.53 ms ≈ 188 个波往返周期。这意味着在 0.1 秒内，压力波可以在管道中来回传播近 200 次。

### 能量耗散机制
每次反射和传播，都会因为以下因素而发生能量耗散：
- 流体的粘性
- 管道的摩擦
- 管道的弹性（如果考虑）

### 压力波衰减
每次波到达管道末端并反射时，它会调整管道内的压力分布。因此，当整个冲击过程完成时，由最初速度变化产生的压力波已经大部分衰减了。

## 数值分析

### 水锤效应剧烈程度
水锤效应的剧烈程度，核心在于流速变化的时间 T_impact 与波在管道中传播一个来回的时间 2L/c 之间的比值。

### 临界条件分析
- **快速瞬态**：T_impact <= 2L/c
- **慢瞬态**：T_impact >> 2L/c

### 工程应用意义
对于 0.1 秒的冲击时间，管道中的"负水锤效应"在产生高压峰值方面可以被认为是忽略不计的。此过程是一个流体从静止缓慢加速到新稳态的过程，而不是一个剧烈的瞬态冲击。

## 结论

### 主要发现
对于 0.1 秒的冲击时间，管道中的"负水锤效应"在产生高压峰值方面可以被认为是忽略不计的。

### 物理本质
此过程是一个流体从静止缓慢加速到新稳态的过程，而不是一个剧烈的瞬态冲击。

### 工程指导
在实际工程应用中，需要根据具体的时间尺度来判断是否考虑水锤效应的影响，避免过度设计或忽略重要因素。
    `,
    author: 'cty',
    publishDate: '2025-08-10',
    category: 'numerical',
    tags: ['水锤效应', '瞬态分析', '压力波', '流体力学', '数值计算'],
    readTime: 18,
    likes: 92,
    coverImage: '/personal-blog/images/projects/matlab.webp',
    featured: false,
  },
];

/**
 * 获取所有文章
 */
export const getAllArticles = () => {
  // 初始化浏览量数据
  initializeArticleViews(articles);
  // 返回包含真实浏览量的文章列表
  return getArticlesWithViews(articles).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
};

/**
 * 根据ID获取文章
 */
export const getArticleById = (id) => {
  const article = articles.find(article => article.id === id);
  if (article) {
    // 初始化浏览量数据
    initializeArticleViews(articles);
    // 返回包含真实浏览量的文章
    const articlesWithViews = getArticlesWithViews(articles);
    return articlesWithViews.find(article => article.id === id);
  }
  return null;
};

/**
 * 根据分类获取文章
 */
export const getArticlesByCategory = (category) => {
  // 初始化浏览量数据
  initializeArticleViews(articles);
  // 返回包含真实浏览量的文章
  const articlesWithViews = getArticlesWithViews(articles);
  return articlesWithViews.filter(article => article.category === category);
};

/**
 * 获取推荐文章
 */
export const getFeaturedArticles = () => {
  // 初始化浏览量数据
  initializeArticleViews(articles);
  // 返回包含真实浏览量的推荐文章
  const articlesWithViews = getArticlesWithViews(articles);
  return articlesWithViews.filter(article => article.featured);
};

/**
 * 获取最新文章
 */
export const getLatestArticles = (limit = 5) => {
  // 初始化浏览量数据
  initializeArticleViews(articles);
  // 返回包含真实浏览量的最新文章
  const articlesWithViews = getArticlesWithViews(articles);
  return articlesWithViews
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, limit);
};

/**
 * 搜索文章
 */
export const searchArticles = (query) => {
  // 初始化浏览量数据
  initializeArticleViews(articles);
  // 返回包含真实浏览量的文章
  const articlesWithViews = getArticlesWithViews(articles);
  
  const lowercaseQuery = query.toLowerCase();
  return articlesWithViews.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    (article.tags && article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  );
};
