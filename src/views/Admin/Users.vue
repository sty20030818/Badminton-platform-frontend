<template>
	<div class="users-container">
		<!-- 搜索区域 -->
		<a-card class="search-card" :bordered="false">
			<a-form layout="inline" :model="searchForm">
				<a-form-item label="用户名">
					<a-input v-model:value="searchForm.username" placeholder="请输入" allowClear />
				</a-form-item>
				<a-form-item label="用户ID">
					<a-input v-model:value="searchForm.id" placeholder="请输入" allowClear />
				</a-form-item>
				<a-form-item label="创建时间">
					<a-range-picker v-model:value="searchForm.dateRange" />
				</a-form-item>
				<a-form-item>
					<a-space>
						<a-button type="primary" @click="handleSearch">查询</a-button>
						<a-button @click="handleReset">重置</a-button>
					</a-space>
				</a-form-item>
			</a-form>
		</a-card>

		<!-- 表格区域 -->
		<a-card class="table-card">
			<template #extra>
				<a-button type="primary" @click="handleAdd">
					<template #icon><plus-outlined /></template>
					新增用户
				</a-button>
			</template>
			<a-table
				:columns="columns"
				:data-source="dataSource"
				:pagination="pagination"
				:loading="loading"
				@change="handleTableChange"
				bordered
			>
				<!-- 自定义列 -->
				<template #bodyCell="{ column, text, record }">
					<template v-if="column.key === 'role'">
						<a-tag :color="text === '管理员' ? 'blue' : 'default'">{{ text }}</a-tag>
					</template>
					<template v-if="column.key === 'gender'">
						<a-tag :color="genderColorMap[text]">{{ text }}</a-tag>
					</template>
					<template v-if="column.key === 'action'">
						<a-space>
							<a-button type="primary" @click="handleEdit(record)">修改</a-button>
							<a-button type="primary" danger @click="handleDelete(record)">删除</a-button>
						</a-space>
					</template>
				</template>
			</a-table>
		</a-card>
	</div>
</template>

<script setup>
	import { ref, onMounted, getCurrentInstance } from 'vue'
	import { PlusOutlined } from '@ant-design/icons-vue'
	import dayjs from 'dayjs'

	const { proxy } = getCurrentInstance()

	// 角色映射
	const roleTextMap = {
		100: '管理员',
		0: '普通用户',
	}

	// 性别映射
	const genderTextMap = {
		0: '男',
		1: '女',
		2: '未知',
	}

	// 性别标签颜色映射
	const genderColorMap = {
		男: 'blue',
		女: 'red',
		未知: 'default',
	}

	// 搜索表单数据
	const searchForm = ref({
		username: '',
		id: '',
		dateRange: [],
	})

	// 表格列定义
	const columns = [
		{
			title: '用户ID',
			dataIndex: 'id',
			key: 'id',
			width: 80,
		},
		{
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: '昵称',
			dataIndex: 'nickname',
			key: 'nickname',
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: '性别',
			dataIndex: 'gender',
			key: 'gender',
		},
		{
			title: '简介',
			dataIndex: 'introduce',
			key: 'introduce',
		},
		{
			title: '角色',
			dataIndex: 'role',
			key: 'role',
		},
		{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: '更新时间',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
		},
		{
			title: '操作',
			key: 'action',
			width: 200,
		},
	]

	// 表格数据
	const dataSource = ref([])
	const loading = ref(false)

	// 分页配置
	const pagination = ref({
		total: 0,
		current: 1,
		pageSize: 10,
		showSizeChanger: true,
		showQuickJumper: true,
	})

	// 获取用户列表数据
	const fetchUserList = async () => {
		loading.value = true
		try {
			const { current, pageSize } = pagination.value
			const { username, id, dateRange } = searchForm.value
			const params = {
				page: current,
				pageSize,
				username,
				id,
				...(dateRange?.length && {
					startDate: dateRange[0].format('YYYY-MM-DD'),
					endDate: dateRange[1].format('YYYY-MM-DD'),
				}),
			}

			const { status, data } = await proxy.$api.getUserList(params)
			if (status) {
				const { users, pagination: pager } = data
				dataSource.value = users.map((user) => ({
					...user,
					key: user.id,
					role: roleTextMap[user.role],
					gender: genderTextMap[user.gender],
					createdAt: dayjs(user.createdAt).format('YYYY年MM月DD日 HH:mm:ss'),
					updatedAt: dayjs(user.updatedAt).format('YYYY年MM月DD日 HH:mm:ss'),
				}))
				pagination.value = { ...pagination.value, ...pager }
			}
		} catch (error) {
			console.error('获取用户列表出错：', error)
			message.error('获取用户列表失败')
		} finally {
			loading.value = false
		}
	}

	// 搜索方法
	const handleSearch = () => {
		pagination.value.current = 1
		fetchUserList()
	}

	// 重置搜索
	const handleReset = () => {
		searchForm.value = {
			username: '',
			id: '',
			dateRange: [],
		}
		pagination.value.current = 1
		fetchUserList()
	}

	// 新增用户
	const handleAdd = () => {
		// TODO: 实现新增用户的逻辑
	}

	// 编辑用户
	const handleEdit = async (record) => {
		// TODO: 实现编辑用户的逻辑
	}

	// 删除用户
	const handleDelete = async (record) => {
		try {
			const res = await proxy.$api.deleteUser(record.id)
			if (res.status) {
				message.success('删除用户成功')
				fetchUserList()
			} else {
				message.error(res.message || '删除用户失败')
			}
		} catch (error) {
			console.error('删除用户出错：', error)
			message.error('删除用户失败')
		}
	}

	// 表格变化处理
	const handleTableChange = (pag, filters, sorter) => {
		pagination.value.current = pag.current
		pagination.value.pageSize = pag.pageSize
		fetchUserList()
	}

	// 页面加载时获取数据
	onMounted(() => {
		fetchUserList()
	})
</script>

<style lang="less" scoped>
	.users-container {
		padding: 24px;
		background: #f0f2f5;
		min-height: 100%;

		.search-card {
			margin-bottom: 24px;
		}

		.table-card {
			:deep(.ant-card-body) {
				padding: 24px;
			}
		}

		:deep(.ant-form-item) {
			margin-bottom: 16px;
		}
	}
</style>
