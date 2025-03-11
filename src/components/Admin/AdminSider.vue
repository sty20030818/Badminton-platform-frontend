<script setup>
    import { computed, h, ref } from 'vue';
    import { useAllDataStore } from '@/stores';
    import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    } from '@ant-design/icons-vue';

    const selectedKeys = ref([]);
    const openKeys = ref([]);
    const store = useAllDataStore();
    const isCollapse = computed(() => store.state.isCollapse);

    const items = ref([
    {
        key: '1',
        icon: () => h(MailOutlined),
        label: 'Navigation One',
        title: 'Navigation One',
    },
    {
        key: '2',
        icon: () => h(CalendarOutlined),
        label: 'Navigation Two',
        title: 'Navigation Two',
    },
    {
        key: 'sub1',
        icon: () => h(AppstoreOutlined),
        label: 'Navigation Three',
        title: 'Navigation Three',
        children: [
        {
            key: '3',
            label: 'Option 3',
            title: 'Option 3',
        },
        {
            key: '4',
            label: 'Option 4',
            title: 'Option 4',
        },
        {
            key: 'sub1-2',
            label: 'Submenu',
            title: 'Submenu',
            children: [
            {
                key: '5',
                label: 'Option 5',
                title: 'Option 5',
            },
            {
                key: '6',
                label: 'Option 6',
                title: 'Option 6',
            },
            ],
        },
        ],
    },
    {
        key: 'sub2',
        icon: () => h(SettingOutlined),
        label: 'Navigation Four',
        title: 'Navigation Four',
        children: [
        {
            key: '7',
            label: 'Option 7',
            title: 'Option 7',
        },
        {
            key: '8',
            label: 'Option 8',
            title: 'Option 8',
        },
        {
            key: '9',
            label: 'Option 9',
            title: 'Option 9',
        },
        {
            key: '10',
            label: 'Option 10',
            title: 'Option 10',
        },
        ],
    },
    ]);
    const handleClick = menuInfo => {
    console.log('click ', menuInfo);
    };
</script>

<template>
	<a-layout-sider class="ant-sider" width="225px" :collapsed="isCollapse">
		<div class="logo-container" >
            <img src="../../assets/images/badminton.png" alt="logo"/>
            <span :style="{ opacity: isCollapse ? 0 : 1 }">在线约球平台</span>
        </div>

		<a-menu
		v-model:openKeys="openKeys"
		v-model:selectedKeys="selectedKeys"
		mode="vertical"
		:items="items"
		@click="handleClick"/>
    </a-layout-sider>
</template>

<style lang="less" scoped>
	.ant-sider {
    width: 225px;
		background: #fff;
		box-shadow: 0 2px 6px rgba(0, 21, 41, 0.35);
	}
	.logo-container {
        height: 35px;
        margin: 10px 18px;
        padding: 0 5px;
        background: rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: center;
        img {
            height: 100%;
            border-radius: 6px;
        }
        span {
            font-size: 1.4em;
            color: rgb(3, 7, 18);
            font-weight: 500;
            margin-left: 12px;
            opacity: 1;
            transition: opacity 0.3s ease;
            white-space: nowrap;
        }
    }
</style>
