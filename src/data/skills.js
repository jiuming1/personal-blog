/**
 * 技能数据
 */

export const skills = [
  // 数值计算与仿真技能
  {
    id: 'matlab',
    name: 'MATLAB',
    category: 'numerical',
    level: 95,
    icon: '/images/projects/matlab.webp',
    description: '精通 MATLAB 数值计算、矩阵运算、信号处理和控制系统设计',
    experience: '4年',
    projects: 20,
    tags: ['数值计算', '矩阵运算', '信号处理', '控制系统'],
    delay: 0,
    color: {
      primary: '#FF6B35',
      secondary: '#FF8C42',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
      background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(255, 140, 66, 0.12) 50%, rgba(255, 107, 53, 0.06) 100%)',
      border: 'rgba(255, 107, 53, 0.25)',
      hover: 'rgba(255, 107, 53, 0.15)',
    },
  },
  {
    id: 'ansys',
    name: 'ANSYS',
    category: 'numerical',
    level: 90,
    icon: '/images/projects/ansys.png',
    description: '熟练使用 ANSYS 进行流体动力学仿真、传热分析和多物理场耦合',
    experience: '3年',
    projects: 15,
    tags: ['CFD', '流体仿真', '传热分析', '多物理场'],
    delay: 0.1,
    color: {
      primary: '#0066CC',
      secondary: '#0099FF',
      gradient: 'linear-gradient(135deg, #0066CC 0%, #0099FF 100%)',
      background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.06) 0%, rgba(0, 153, 255, 0.1) 50%, rgba(0, 102, 204, 0.08) 100%)',
      border: 'rgba(0, 102, 204, 0.2)',
      hover: 'rgba(0, 102, 204, 0.12)',
    },
  },
  {
    id: 'comsol',
    name: 'COMSOL Multiphysics',
    category: 'numerical',
    level: 85,
    icon: '/images/projects/comsol.png',
    description: '熟练使用 COMSOL 进行多物理场仿真和有限元分析',
    experience: '3年',
    projects: 12,
    tags: ['多物理场', '有限元', '电磁仿真', '结构分析'],
    delay: 0.2,
    color: {
      primary: '#FF6B6B',
      secondary: '#FF8E8E',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 142, 142, 0.08) 50%, rgba(255, 107, 107, 0.06) 100%)',
      border: 'rgba(255, 107, 107, 0.18)',
      hover: 'rgba(255, 107, 107, 0.12)',
    },
  },
  {
    id: 'python',
    name: 'Python',
    category: 'numerical',
    level: 88,
    icon: '/images/projects/python.png',
    description: '熟练使用 NumPy、SciPy、Pandas 进行科学计算和数据分析',
    experience: '4年',
    projects: 18,
    tags: ['NumPy', 'SciPy', 'Pandas', '科学计算'],
    delay: 0.3,
    color: {
      primary: '#3776AB',
      secondary: '#4B8BBE',
      gradient: 'linear-gradient(135deg, #3776AB 0%, #4B8BBE 100%)',
      background: 'linear-gradient(135deg, rgba(55, 118, 171, 0.04) 0%, rgba(75, 139, 190, 0.08) 50%, rgba(55, 118, 171, 0.06) 100%)',
      border: 'rgba(55, 118, 171, 0.2)',
      hover: 'rgba(55, 118, 171, 0.1)',
    },
  },
];

/**
 * 获取所有技能
 */
export const getAllSkills = () => skills;

/**
 * 根据分类获取技能
 */
export const getSkillsByCategory = (category) => 
  skills.filter(skill => skill.category === category);

/**
 * 获取技能分类
 */
export const getSkillCategories = () => [
  { id: 'numerical', name: '数值计算', icon: '🔢' },
  { id: 'deep-learning', name: '深度学习', icon: '🧠' },
  { id: 'machine-learning', name: '机器学习', icon: '🔬' },
  { id: 'engineering', name: '工程仿真', icon: '⚙️' },
];

/**
 * 获取技能统计信息
 */
export const getSkillStats = () => {
  const total = skills.length;
  const numerical = skills.filter(s => s.category === 'numerical').length;
  const deepLearning = skills.filter(s => s.category === 'deep-learning').length;
  const machineLearning = skills.filter(s => s.category === 'machine-learning').length;
  const engineering = skills.filter(s => s.category === 'engineering').length;
  
  const averageLevel = Math.round(
    skills.reduce((sum, skill) => sum + skill.level, 0) / total
  );
  
  return {
    total,
    numerical,
    deepLearning,
    machineLearning,
    engineering,
    averageLevel,
  };
};

/**
 * 获取顶级技能
 */
export const getTopSkills = (limit = 6) => 
  skills
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);

/**
 * 根据经验获取技能
 */
export const getSkillsByExperience = (minExperience = 0) => 
  skills.filter(skill => {
    const years = parseInt(skill.experience);
    return years >= minExperience;
  });
