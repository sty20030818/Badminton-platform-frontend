<template>
  <div class="home-layout">
    <!-- 导航栏 -->
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="Badminton" />
        <span>羽你同行</span>
      </div>
      <div class="nav-links">
        <a href="#" class="nav-item">场地预约</a>
        <a href="#" class="nav-item">教练预约</a>
        <a href="#" class="nav-item">赛事活动</a>
        <a href="#" class="nav-item">关于我们</a>
        <a-button type="primary" class="register-btn" shape="round">
          登录
        </a-button>
      </div>
    </a-layout-header>

    <!-- 主要内容区 -->
    <a-layout-content class="main-content">
      <div class="hero-section">
        <div class="hero-text">
          <h1>羽你同行<br/>快乐运动</h1>
          <p class="subtitle">一个羽毛球场地预约平台，让每一次挥拍都充满快乐</p>
          <a-button type="primary" class="register-now-btn" shape="round" size="large">
            开始预约
          </a-button>
        </div>
      </div>
    </a-layout-content>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
.home-layout {
  min-height: 100vh;
  background: linear-gradient(135deg,
    rgba(74, 144, 226, 0.1) 0%,
    rgba(255, 126, 179, 0.1) 100%
  );
  position: relative;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: transparent;
  height: 80px;
  box-shadow: none;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  height: 40px;
}

.logo span {
  color: #4A90E2;
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-item {
  color: #333333;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #4A90E2;
}

.register-btn {
  background: #FF7EB3;
  border: none;
  padding: 6px 24px;
  font-weight: 500;
}

.register-btn:hover {
  background: #FF6B9E;
}

.main-content {
  padding: 0;
  position: relative;
  height: calc(100vh - 80px);
}

.hero-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background: transparent;
  border-radius: 0;
  padding: 0 60px;
  margin-top: 0;
  height: 100%;
}

.hero-text {
  flex: 1;
  z-index: 2;
  max-width: 600px;
}

.hero-text h1 {
  color: #4A90E2;
  font-size: 64px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 24px;
}

.subtitle {
  color: #666666;
  font-size: 20px;
  margin-bottom: 40px;
  max-width: 500px;
}

.register-now-btn {
  background: #FF7EB3;
  border: none;
  padding: 12px 40px;
  height: auto;
  font-size: 18px;
  font-weight: 500;
}

.register-now-btn:hover {
  background: #FF6B9E;
}

.hero-image {
  flex: 1;
  position: relative;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image svg {
  width: 100%;
  height: 100%;
}

.racket {
  transform: rotate(45deg);
  transform-origin: center;
}

.shuttlecock {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    padding: 20px;
  }

  .nav-links {
    display: none;
  }

  .hero-section {
    padding: 20px;
    justify-content: center;
    text-align: center;
  }

  .hero-text {
    max-width: 100%;
  }

  .hero-text h1 {
    font-size: 48px;
  }

  .subtitle {
    margin: 0 auto 40px;
  }

  .hero-image {
    height: 400px;
  }
}
</style>
