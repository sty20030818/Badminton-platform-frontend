<template>
	<div class="events-container">
		<!-- 搜索区域 -->
		<a-card class="search-card" :bordered="false">
			<a-form layout="inline" :model="searchForm">
				<a-form-item label="活动名称">
					<a-input v-model:value="searchForm.name" placeholder="请输入" allowClear />
				</a-form-item>
				<a-form-item label="活动ID">
					<a-input v-model:value="searchForm.id" placeholder="请输入" allowClear />
				</a-form-item>
				<a-form-item label="活动时间">
					<a-range-picker v-model:value="searchForm.dateRange" showTime />
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
					新增活动
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
					<template v-if="column.key === 'difficulty'">
						<a-rate :value="text" disabled />
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

	// 搜索表单数据
	const searchForm = ref({
		name: '',
		id: '',
		dateRange: [],
	})

	// 表格列定义
	const columns = [
		{
			title: '活动ID',
			dataIndex: 'id',
			key: 'id',
			width: 80,
		},
		{
			title: '活动名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '描述',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
		},
		{
			title: '活动时间',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: '场地ID',
			dataIndex: 'venueId',
			key: 'venueId',
		},
		{
			title: '参与人数',
			dataIndex: 'participants',
			key: 'participants',
		},
		{
			title: '难度等级',
			dataIndex: 'difficulty',
			key: 'difficulty',
		},
		{
			title: '活动类型',
			dataIndex: 'eventType',
			key: 'eventType',
		},
		{
			title: '报名截止时间',
			dataIndex: 'registrationDeadline',
			key: 'registrationDeadline',
		},
		{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: '操作',
			key: 'action',
			width: 200,
			fixed: 'right',
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

	// 获取活动列表数据
	const fetchEventList = async () => {
		loading.value = true
		try {
			const { current, pageSize } = pagination.value
			const { name, id, dateRange } = searchForm.value
			const params = {
				page: current,
				pageSize,
				name,
				id,
			}

			if (dateRange && dateRange.length === 2) {
				params.startTime = dateRange[0].format('YYYY-MM-DD HH:mm:ss')
				params.endTime = dateRange[1].format('YYYY-MM-DD HH:mm:ss')
			}

			const { status, data } = await proxy.$api.getEventList(params)
			if (status) {
				const { events, pagination: pager } = data
				dataSource.value = events.map((event) => ({
					...event,
					key: event.id,
					time: dayjs(event.time).format('YYYY年MM月DD日 HH:mm'),
					registrationDeadline: dayjs(event.registrationDeadline).format('YYYY年MM月DD日 HH:mm'),
					createdAt: dayjs(event.createdAt).format('YYYY年MM月DD日 HH:mm'),
				}))
				pagination.value = { ...pagination.value, ...pager }
			}
		} catch (error) {
			console.error('获取活动列表出错：', error)
			message.error('获取活动列表失败')
		} finally {
			loading.value = false
		}
	}

	// 搜索方法
	const handleSearch = () => {
		pagination.value.current = 1
		fetchEventList()
	}

	// 重置搜索
	const handleReset = () => {
		searchForm.value = {
			name: '',
			id: '',
			dateRange: [],
		}
		pagination.value.current = 1
		fetchEventList()
	}

	// 新增活动
	const handleAdd = () => {
		//TODO 实现新增活动的逻辑
	}

	// 编辑活动
	const handleEdit = (record) => {
		//TODO 实现编辑活动的逻辑
	}

	// 删除活动
	const handleDelete = async (record) => {
		try {
			const res = await proxy.$api.deleteEvent(record.id)
			if (res.status) {
				message.success('删除活动成功')
				fetchEventList()
			} else {
				message.error(res.message || '删除活动失败')
			}
		} catch (error) {
			console.error('删除活动出错：', error)
			message.error('删除活动失败')
		}
	}

	// 表格变化处理
	const handleTableChange = (pag, filters, sorter) => {
		pagination.value.current = pag.current
		pagination.value.pageSize = pag.pageSize
		fetchEventList()
	}

	// 页面加载时获取数据
	onMounted(() => {
		fetchEventList()
	})
</script>

<style lang="less" scoped>
	.events-container {
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
