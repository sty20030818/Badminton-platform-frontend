<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-200 to-pink-200 relative overflow-hidden">
    <!-- 导航栏 -->
    <a-layout-header class="flex justify-between items-center px-10 py-5 bg-transparent h-20 shadow-none">
      <div class="flex items-center gap-2">
        <img src="@/assets/images/logo.png" alt="Badminton" class="h-10" />
        <span class="text-blue-500 text-xl font-bold">羽你同行</span>
      </div>
      <div class="flex items-center gap-10">
        <a href="#" class="text-gray-800 no-underline text-base transition-colors hover:text-blue-500">场地预约</a>
        <a href="#" class="text-gray-800 no-underline text-base transition-colors hover:text-blue-500">教练预约</a>
        <a href="#" class="text-gray-800 no-underline text-base transition-colors hover:text-blue-500">赛事活动</a>
        <a href="#" class="text-gray-800 no-underline text-base transition-colors hover:text-blue-500">关于我们</a>
        <a-button type="primary" class="bg-pink-300 border-none px-6 py-1.5 font-medium hover:bg-pink-400" shape="round">
          登录
        </a-button>
      </div>
    </a-layout-header>

    <!-- 主要内容区 -->
    <a-layout-content class="p-0 relative h-[calc(100vh-80px)]">
      <div class="flex justify-start items-center relative bg-transparent rounded-none px-10 pt-0 h-full">
        <div class="flex-1 z-20 max-w-xl">
          <h1 class="text-blue-500 text-6xl font-bold leading-tight mb-6">羽你同行<br/>快乐运动</h1>
          <p class="text-gray-600 text-xl mb-10 max-w-lg">一个羽毛球场地预约平台，让每一次挥拍都充满快乐</p>
          <a-button type="primary" class="bg-pink-300 border-none px-10 py-3 h-auto text-lg font-medium hover:bg-pink-400" shape="round" size="large">
            开始预约
          </a-button>
        </div>
      </div>
    </a-layout-content>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* .home-layout {
  min-height: 100vh;
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
  color: #FF7EB3;
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
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 400px;
  height: 100%;
}

.hero-text {
  flex: 1;
  z-index: 2;
  max-width: 600px;
  text-align: left;
  margin-right: 80px;
  position: relative;
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

.explore-btn {
  background: #FF7EB3;
  border: none;
  padding: 12px 40px;
  height: auto;
  font-size: 18px;
  font-weight: 500;
}

.explore-btn:hover {
  background: #FF6B9E;
}

.stats {
  display: flex;
  gap: 40px;
  margin-top: 60px;
}

.stat-item {
  text-align: left;
}

.stat-number {
  color: #4A90E2;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  color: #333333;
  font-size: 16px;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.floating-image {
  width: 80%;
  max-width: 600px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
} */

/* 响应式设计 */
/* @media (max-width: 768px) {
  .header {
    padding: 20px;
  }

  .nav-links {
    display: none;
  }

  .hero-section {
    flex-direction: column;
    padding: 20px;
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

  .stats {
    justify-content: center;
  }

  .stat-item {
    text-align: center;
  }

  .hero-image {
    margin-top: 40px;
  }

  .floating-image {
    width: 100%;
  }
} */
</style>
