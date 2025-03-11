<script setup>'vue'
import AdminSider from '@/components/Admin/AdminSider.vue'
import AdminHeader from '@/components/Admin/AdminHeader.vue'
import { RouterView } from 'vue-router'

</script>

<template>
    <div class="admin-layout">
        <a-layout class="lay-container">
            <AdminSider />
            <a-layout>
                <AdminHeader />
                <a-layout-content class="ant-content">
                    <RouterView />
                </a-layout-content>
                <AdminFooter />
            </a-layout>
        </a-layout>
    </div>
</template>

<style scoped>
    .admin-layout,
    .lay-container {
        height: 100%;
    }
</style>
