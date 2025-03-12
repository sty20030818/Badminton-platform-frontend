<template>
    <div class="venues-container">
        <!-- 搜索区域 -->
        <a-card class="search-card" :bordered="false">
            <a-form layout="inline" :model="searchForm">
                <a-form-item label="场馆名称">
                    <a-input v-model:value="searchForm.name" placeholder="请输入" allowClear />
                </a-form-item>
                <a-form-item label="场馆ID">
                    <a-input v-model:value="searchForm.id" placeholder="请输入" allowClear />
                </a-form-item>
                <a-form-item label="场馆状态">
                    <a-select v-model:value="searchForm.status" placeholder="请选择" allowClear style="width: 120px">
                        <a-select-option value="可用">可用</a-select-option>
                        <a-select-option value="维护中">维护中</a-select-option>
                        <a-select-option value="不可用">不可用</a-select-option>
                    </a-select>
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
                    新增场馆
                </a-button>
            </template>
            <a-table
                :columns="columns"
                :data-source="dataSource"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
                bordered>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.key === 'status'">
                        <a-tag :color="getStatusColor(text)">{{ text }}</a-tag>
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
    import { ref, onMounted, getCurrentInstance } from 'vue';
    import { PlusOutlined } from '@ant-design/icons-vue';
    import dayjs from 'dayjs';
    import { message } from 'ant-design-vue';

    const { proxy } = getCurrentInstance();

    // 搜索表单数据
    const searchForm = ref({
        name: '',
        id: '',
        status: undefined,
    });

    // 状态颜色映射
    const getStatusColor = (status) => {
        const colorMap = {
            '可用': 'green',
            '维护中': 'orange',
            '不可用': 'red'
        };
        return colorMap[status] || 'default';
    };

    // 表格列定义
    const columns = [
        {
            title: '场馆ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: '场馆名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '地址',
            dataIndex: 'location',
            key: 'location',
            ellipsis: true,
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
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
            fixed: 'right'
        }
    ];

    // 表格数据
    const dataSource = ref([]);
    const loading = ref(false);

    // 分页配置
    const pagination = ref({
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true
    });

    // 获取场馆列表数据
    const fetchVenueList = async () => {
        loading.value = true;
        try {
            const { current, pageSize } = pagination.value;
            const { name, id, status } = searchForm.value;
            const params = {
                page: current,
                pageSize,
                name,
                id,
                status
            };

            const { status: success, data } = await proxy.$api.getVenueList(params);
            if (success) {
                const { venues, pagination: pager } = data;
                dataSource.value = venues.map(venue => ({
                    ...venue,
                    key: venue.id,
                    createdAt: dayjs(venue.createdAt).format('YYYY年MM月DD日 HH:mm'),
                    updatedAt: dayjs(venue.updatedAt).format('YYYY年MM月DD日 HH:mm')
                }));
                pagination.value = { ...pagination.value, ...pager };
            }
        } catch (error) {
            console.error('获取场馆列表出错：', error);
            message.error('获取场馆列表失败');
        } finally {
            loading.value = false;
        }
    };

    // 搜索方法
    const handleSearch = () => {
        pagination.value.current = 1;
        fetchVenueList();
    };

    // 重置搜索
    const handleReset = () => {
        searchForm.value = {
            name: '',
            id: '',
            status: undefined,
        };
        pagination.value.current = 1;
        fetchVenueList();
    };

    // 新增场馆
    const handleAdd = () => {
        // TODO: 实现新增场馆的逻辑
    };

    // 编辑场馆
    const handleEdit = (record) => {
        // TODO: 实现编辑场馆的逻辑
    };

    // 删除场馆
    const handleDelete = async (record) => {
        try {
            const res = await proxy.$api.deleteVenue(record.id);
            if (res.status) {
                message.success('删除场馆成功');
                fetchVenueList();
            } else {
                message.error(res.message || '删除场馆失败');
            }
        } catch (error) {
            console.error('删除场馆出错：', error);
            message.error('删除场馆失败');
        }
    };

    // 表格变化处理
    const handleTableChange = (pag, filters, sorter) => {
        pagination.value.current = pag.current;
        pagination.value.pageSize = pag.pageSize;
        fetchVenueList();
    };

    // 页面加载时获取数据
    onMounted(() => {
        fetchVenueList();
    });
</script>

<style lang="less" scoped>
.venues-container {
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
