<template>
  <dev class="home-layout">
    <a-layout class="home-layout">
      <a-layout-sider :style="siderStyle">Sider</a-layout-sider>
      <a-layout>
        <a-layout-header :style="headerStyle">Header</a-layout-header>
        <a-layout-content :style="contentStyle">Content</a-layout-content>
        <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </dev>
</template>

<script setup></script>

<style scoped>
  .home-layout {
    height: 100vh;
  }
</style>
