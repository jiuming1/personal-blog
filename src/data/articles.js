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
  {
    id: '8',
    title: '深度学习基础：从感知机到神经网络',
    excerpt: '深度学习是人工智能领域的重要分支，本文将深入探讨深度学习的基础概念，从感知机开始，逐步介绍神经网络的基本原理、激活函数、反向传播算法等核心知识。',
    content: `
# 深度学习基础：从感知机到神经网络

深度学习是人工智能领域的重要分支，通过构建多层神经网络来学习数据的复杂模式。本文将深入探讨深度学习的基础概念，从感知机开始，逐步介绍神经网络的基本原理。

## 感知机

### 基本概念

感知机是最简单的神经网络模型，由Frank Rosenblatt在1957年提出：

**结构：**
- 输入层：接收输入信号
- 权重：连接输入和输出的参数
- 偏置：阈值参数
- 激活函数：决定输出

### 数学表示

感知机的数学表达式为：

\[ f(x) = \begin{cases}
1 & \text{if } \sum_{i=1}^{n} w_i x_i + b > 0 \\
0 & \text{otherwise}
\end{cases} \]

其中：
- \(x_i\) 为输入特征
- \(w_i\) 为权重参数
- \(b\) 为偏置项

### 学习算法

感知机学习算法采用梯度下降：

1. 初始化权重和偏置
2. 对于每个训练样本：
   - 计算输出：\(y = f(\sum_{i=1}^{n} w_i x_i + b)\)
   - 更新权重：\(w_i := w_i + \alpha(y_{true} - y)x_i\)
   - 更新偏置：\(b := b + \alpha(y_{true} - y)\)

## 激活函数

### 作用

激活函数为神经网络引入非线性，使其能够学习复杂的模式：

\[ y = f(\sum_{i=1}^{n} w_i x_i + b) \]

### 常用激活函数

**1. Sigmoid函数：**
\[ \sigma(x) = \frac{1}{1 + e^{-x}} \]

**特点：**
- 输出范围：[0, 1]
- 平滑可导
- 存在梯度消失问题

**2. ReLU函数：**
\[ \text{ReLU}(x) = \max(0, x) \]

**特点：**
- 计算简单
- 缓解梯度消失
- 存在死亡ReLU问题

**3. Tanh函数：**
\[ \tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}} \]

**特点：**
- 输出范围：[-1, 1]
- 零中心化
- 梯度消失问题较轻

## 前向传播

### 单层神经网络

单层神经网络的前向传播过程：

\[ z = Wx + b \]
\[ a = f(z) \]

其中：
- \(W\) 为权重矩阵
- \(x\) 为输入向量
- \(b\) 为偏置向量
- \(f\) 为激活函数

### 多层神经网络

多层神经网络的前向传播：

对于第\(l\)层：
\[ z^{[l]} = W^{[l]}a^{[l-1]} + b^{[l]} \]
\[ a^{[l]} = f^{[l]}(z^{[l]}) \]

其中：
- \(a^{[0]} = x\)（输入层）
- \(a^{[L]} = \hat{y}\)（输出层）

## 反向传播

### 损失函数

常用的损失函数：

**均方误差（MSE）：**
\[ L = \frac{1}{m}\sum_{i=1}^{m}(y_i - \hat{y}_i)^2 \]

**交叉熵损失：**
\[ L = -\frac{1}{m}\sum_{i=1}^{m}[y_i \log(\hat{y}_i) + (1-y_i)\log(1-\hat{y}_i)] \]

### 梯度计算

**输出层梯度：**
\[ \frac{\partial L}{\partial W^{[l]}} = \frac{\partial L}{\partial z^{[l]}} \cdot (a^{[l-1]})^T \]
\[ \frac{\partial L}{\partial b^{[l]}} = \sum_{i=1}^{m} \frac{\partial L}{\partial z_i^{[l]}} \]

**隐藏层梯度：**
\[ \frac{\partial L}{\partial z^{[l]}} = \frac{\partial L}{\partial a^{[l]}} \cdot f'(z^{[l]}) \]

### 参数更新

使用梯度下降更新参数：

\[ W := W - \alpha \frac{\partial L}{\partial W} \]
\[ b := b - \alpha \frac{\partial L}{\partial b} \]

其中\(\alpha\)为学习率。

## 优化算法

### 随机梯度下降（SGD）

**动量法：**
\[ v := \beta v + (1-\beta)\frac{\partial L}{\partial W} \]
\[ W := W - \alpha v \]

其中\(\beta\)为动量系数。

### Adam优化器

Adam结合了动量和自适应学习率：

1. 计算一阶矩估计：\(m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t\)
2. 计算二阶矩估计：\(v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2\)
3. 偏差修正：\(\hat{m}_t = \frac{m_t}{1-\beta_1^t}\), \(\hat{v}_t = \frac{v_t}{1-\beta_2^t}\)
4. 参数更新：\(\theta_t = \theta_{t-1} - \frac{\alpha}{\sqrt{\hat{v}_t} + \epsilon}\hat{m}_t\)

## 正则化

### L2正则化

L2正则化通过添加权重惩罚项防止过拟合：

\[ L_{reg} = L + \frac{\lambda}{2m}\sum_{w} w^2 \]

### L1正则化

L1正则化促进稀疏解：

\[ L_{reg} = L + \frac{\lambda}{m}\sum_{w} |w| \]

### Dropout

Dropout通过随机丢弃神经元防止过拟合：

\[ a_{dropout} = a \odot mask \]

其中\(mask\)为随机二进制掩码。

## 实践应用

### 数据预处理

**标准化：**
\[ x_{norm} = \frac{x - \mu}{\sigma} \]

**归一化：**
\[ x_{norm} = \frac{x - x_{min}}{x_{max} - x_{min}} \]

### 模型评估

**训练集、验证集、测试集划分：**
- 训练集：70%
- 验证集：15%
- 测试集：15%

**评估指标：**
- 准确率（Accuracy）
- 精确率（Precision）
- 召回率（Recall）
- F1分数

### 超参数调优

**学习率：** 0.001, 0.01, 0.1
**批量大小：** 32, 64, 128, 256
**隐藏层数量：** 1, 2, 3, 4
**隐藏层大小：** 64, 128, 256, 512

## 总结

深度学习通过构建多层神经网络，能够学习数据的复杂模式。从感知机到现代神经网络，深度学习在图像识别、自然语言处理、语音识别等领域取得了突破性进展。

掌握深度学习的基础概念和算法原理，对于理解和应用现代人工智能技术具有重要意义。在实际应用中，需要根据具体问题选择合适的网络结构、激活函数、优化算法和正则化方法。
`,
    author: 'cty',
    publishDate: '2025-03-10',
    category: 'deep-learning',
    tags: ['深度学习', '神经网络', '感知机', '反向传播', '激活函数', '优化算法'],
    readTime: 25,
    likes: 156,
    coverImage: '/personal-blog/images/projects/python.png',
    featured: true,
  },
  {
    id: '9',
    title: '卷积神经网络（CNN）在计算机视觉中的应用',
    excerpt: '卷积神经网络是深度学习在计算机视觉领域的核心技术，本文将详细介绍CNN的架构设计、卷积操作、池化机制，以及在实际图像分类、目标检测任务中的应用案例。',
    content: `
# 卷积神经网络（CNN）在计算机视觉中的应用

卷积神经网络（CNN）是深度学习在计算机视觉领域的核心技术，通过局部连接、权重共享和层次化特征提取，在图像识别、目标检测等任务中取得了卓越成就。

## 基本概念

### 卷积操作

卷积是CNN的核心操作，通过滑动窗口提取局部特征：

**数学定义：**
\[ (f * k)(p) = \sum_{s+t=p} f(s) \cdot k(t) \]

**图像卷积：**
\[ (I * K)(i,j) = \sum_{m} \sum_{n} I(i+m, j+n) \cdot K(m,n) \]

其中：
- \(I\) 为输入图像
- \(K\) 为卷积核
- \(i,j\) 为输出位置

### 卷积层的作用

1. **特征提取**：检测边缘、纹理、形状等特征
2. **参数共享**：减少参数数量，提高计算效率
3. **局部连接**：模拟生物视觉系统的感受野

## 池化操作

### 最大池化

最大池化选择局部区域的最大值：

\[ \text{MaxPool}(x) = \max_{i \in R} x_i \]

**特点：**
- 保留主要特征
- 减少计算量
- 提高鲁棒性

### 平均池化

平均池化计算局部区域的平均值：

\[ \text{AvgPool}(x) = \frac{1}{|R|} \sum_{i \in R} x_i \]

### 全局平均池化

全局平均池化对整个特征图进行池化：

\[ \text{GAP}(x) = \frac{1}{H \times W} \sum_{i=1}^{H} \sum_{j=1}^{W} x_{i,j} \]

## CNN的经典架构

### LeNet-5

LeNet-5是第一个成功应用于数字识别的CNN架构：

\`\`\`
输入层 (32×32×1)
    ↓
卷积层1 (6个5×5卷积核) → 激活函数 → 池化层1 (2×2)
    ↓
卷积层2 (16个5×5卷积核) → 激活函数 → 池化层2 (2×2)
    ↓
全连接层1 (120个神经元)
    ↓
全连接层2 (84个神经元)
    ↓
输出层 (10个神经元)
\`\`\`

### AlexNet

AlexNet在2012年ImageNet竞赛中取得突破性进展：

**主要创新：**
- 使用ReLU激活函数
- 引入Dropout正则化
- 使用数据增强
- 使用GPU加速训练

### VGGNet

VGGNet提出了使用小卷积核的深度网络架构：

**设计原则：**
- 使用3×3的小卷积核
- 增加网络深度
- 简单的架构设计

### ResNet

ResNet通过残差连接解决了深度网络的梯度消失问题：

**残差块：**
\[ F(x) = H(x) - x \]
\[ H(x) = F(x) + x \]

## 现代CNN架构

### 1×1卷积

1×1卷积用于：
- 降维：减少计算量
- 升维：增加特征通道
- 非线性变换：引入额外的非线性

### 分组卷积

分组卷积将输入通道分组，每组使用独立的卷积核：

**优点：**
- 减少参数数量
- 提高计算效率
- 增加模型表达能力

### 深度可分离卷积

深度可分离卷积将标准卷积分解为：
1. **深度卷积**：每个通道独立卷积
2. **点卷积**：1×1卷积进行通道组合

**计算复杂度：**
- 标准卷积：\(O(C_{in} \times C_{out} \times K \times K \times H \times W)\)
- 深度可分离卷积：\(O(C_{in} \times K \times K \times H \times W + C_{in} \times C_{out} \times H \times W)\)

## 计算机视觉任务

### 图像分类

图像分类是CNN最基础的应用：

**经典数据集：**
- MNIST：手写数字识别
- CIFAR-10/100：自然图像分类
- ImageNet：大规模图像分类

**评估指标：**
- 准确率（Accuracy）
- Top-1/Top-5准确率
- 混淆矩阵

### 目标检测

目标检测需要定位和分类图像中的物体：

**两阶段方法：**
1. **R-CNN系列**：R-CNN, Fast R-CNN, Faster R-CNN
2. **特征提取**：使用CNN提取特征
3. **区域提议**：生成候选区域
4. **分类回归**：对每个区域进行分类和边界框回归

**单阶段方法：**
1. **YOLO系列**：YOLO, YOLOv2, YOLOv3, YOLOv4, YOLOv5
2. **SSD**：Single Shot MultiBox Detector
3. **RetinaNet**：使用Focal Loss

### 语义分割

语义分割为图像中的每个像素分配类别标签：

**经典方法：**
- **FCN**：全卷积网络
- **U-Net**：医学图像分割
- **DeepLab**：使用空洞卷积
- **PSPNet**：金字塔池化模块

### 实例分割

实例分割区分同一类别的不同实例：

**主要方法：**
- **Mask R-CNN**：在Faster R-CNN基础上添加分割分支
- **YOLACT**：实时实例分割
- **SOLO**：单阶段实例分割

## 数据增强

### 几何变换

- **旋转**：随机角度旋转
- **缩放**：随机尺度变换
- **翻转**：水平/垂直翻转
- **平移**：随机位置偏移

### 颜色变换

- **亮度调整**：随机亮度变化
- **对比度调整**：随机对比度变化
- **色调调整**：随机色调变化
- **噪声添加**：高斯噪声、椒盐噪声

### 高级增强

- **Mixup**：图像混合
- **CutMix**：图像裁剪混合
- **AutoAugment**：自动数据增强
- **RandAugment**：随机数据增强

## 训练技巧

### 学习率调度

**StepLR：** 按步长衰减
**CosineAnnealingLR：** 余弦退火
**ReduceLROnPlateau：** 根据验证损失调整

### 损失函数

**分类损失：**
- 交叉熵损失
- Focal Loss
- Label Smoothing

**回归损失：**
- 均方误差（MSE）
- 平均绝对误差（MAE）
- Smooth L1 Loss

### 优化技巧

**权重初始化：**
- Xavier初始化
- He初始化
- 预训练权重

**批归一化：**
- 加速训练收敛
- 提高模型稳定性
- 减少过拟合

## 实际应用

### 医学图像分析

**应用领域：**
- 医学影像诊断
- 病理图像分析
- 医学图像分割

**挑战：**
- 数据稀缺
- 标注困难
- 模型解释性

### 自动驾驶

**感知任务：**
- 车道线检测
- 交通标志识别
- 行人检测
- 车辆检测

**要求：**
- 实时性
- 准确性
- 鲁棒性

### 工业检测

**应用场景：**
- 缺陷检测
- 质量检查
- 尺寸测量
- 分类识别

**特点：**
- 高精度要求
- 实时处理
- 环境适应

## 总结

卷积神经网络作为计算机视觉的核心技术，通过其独特的架构设计，在图像识别、目标检测、语义分割等任务中取得了卓越成就。

随着深度学习技术的不断发展，CNN架构也在不断创新，从LeNet到ResNet，从AlexNet到EfficientNet，每一次突破都推动了计算机视觉技术的进步。

在实际应用中，需要根据具体任务选择合适的网络架构，结合数据增强、训练技巧等方法，构建高效、准确的视觉系统。
`,
    author: 'cty',
    publishDate: '2025-05-20',
    category: 'deep-learning',
    tags: ['卷积神经网络', 'CNN', '计算机视觉', '图像分类', '目标检测', '语义分割'],
    readTime: 30,
    likes: 203,
    coverImage: '/personal-blog/images/projects/python.png',
    featured: true,
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
