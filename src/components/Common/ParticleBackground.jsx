import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';

/**
 * 粒子背景组件 - 优化版本，增强视觉效果
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // 设置画布尺寸
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 鼠标移动事件
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 粒子类 - 增强版本
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // 增加初始速度
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.8; // 减小粒子尺寸
        this.opacity = Math.random() * 0.6 + 0.3; // 增加透明度
        this.originalSize = this.size;
        this.originalOpacity = this.opacity;
        this.pulse = 0; // 脉冲效果
        this.pulseSpeed = Math.random() * 0.02 + 0.01; // 脉冲速度
        
        // 喷彩效果 - 随机颜色
        this.colorIndex = Math.floor(Math.random() * 6); // 6种颜色
        this.colorChangeSpeed = Math.random() * 0.005 + 0.002; // 颜色变化速度
        this.colorTime = Math.random() * Math.PI * 2; // 随机初始颜色时间
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // 脉冲效果
        this.pulse += this.pulseSpeed;
        const pulseFactor = Math.sin(this.pulse) * 0.3 + 1;
        
        // 喷彩效果 - 颜色变化
        this.colorTime += this.colorChangeSpeed;
        this.colorIndex = Math.floor((Math.sin(this.colorTime) + 1) * 3) % 6;

        // 边界检测 - 更平滑的边界处理
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
          this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
          this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        // 鼠标交互效果 - 增强版本
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // 增加交互范围

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.size = this.originalSize + force * 4; // 增强鼠标交互效果
          this.opacity = this.originalOpacity + force * 0.5;
          
          // 增强的排斥效果
          const angle = Math.atan2(dy, dx);
          const repelForce = 1.2; // 增加排斥力
          this.vx += Math.cos(angle) * repelForce * force;
          this.vy += Math.sin(angle) * repelForce * force;
        } else {
          this.size = this.originalSize * pulseFactor; // 应用脉冲效果
          this.opacity = this.originalOpacity;
        }

        // 限制速度
        const maxSpeed = 1.5; // 增加最大速度
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // 喷彩效果 - 6种鲜艳颜色
        const colors = [
          '255, 87, 51',   // 橙红色
          '255, 189, 51',  // 金黄色
          '76, 175, 80',   // 绿色
          '33, 150, 243',  // 蓝色
          '156, 39, 176',  // 紫色
          '255, 64, 129'   // 粉色
        ];
        
        const isDark = theme.palette.mode === 'dark';
        const baseColor = isDark ? colors[this.colorIndex] : colors[this.colorIndex];
        ctx.fillStyle = `rgba(${baseColor}, ${this.opacity})`;
        ctx.fill();

        // 添加发光效果
        ctx.shadowColor = `rgba(${baseColor}, 0.5)`;
        ctx.shadowBlur = this.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0; // 重置阴影
      }
    }

    // 创建粒子 - 大幅增加粒子数量
    const particles = [];
    const particleCount = Math.min(300, Math.floor(canvas.width * canvas.height / 8000)); // 大幅增加粒子密度

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // 动画循环 - 移除连接线绘制
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 更新和绘制粒子
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme.palette.mode]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default ParticleBackground;
