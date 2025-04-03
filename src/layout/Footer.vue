<template>
	<a-layout-footer class="footer backdrop-blur-[6px] bg-white/30 fixed bottom-0 w-full">
		<div class="flex justify-between items-center px-[150px] h-full">
			<p class="mb-0 text-gray-500 text-base">
				Badminton Platform ©2024 Created by Stone Fish
			</p>
			<div v-if="store.state.pagination">
				<a-pagination
					v-model:current="store.state.pagination.currentPage"
					:total="store.state.pagination.total"
					:pageSize="store.state.pagination.pageSize"
					:pageSizeOptions="['3', '6', '9']"
					show-size-changer
					hide-on-single-page
					@change="store.state.pagination.onChange"
					@showSizeChange="store.state.pagination.onShowSizeChange"
					:showTotal="(total) => `共 ${total} 条`"
					:locale="{
						items_per_page: '条/页',
						page: '页',
					}"
					class="custom-pagination"
				/>
			</div>
		</div>
	</a-layout-footer>
</template>

<script setup>
	import { useAllDataStore } from '@/stores'
	const store = useAllDataStore()
</script>

<style scoped>
	.footer {
		height: 64px;
		line-height: 64px;
		padding: 0;
		background: transparent;
	}

	:deep(.ant-pagination) {
		line-height: normal;
		font-size: 15px;
	}

	:deep(.ant-pagination-options) {
		margin-left: 16px;
	}

	:deep(.ant-select-single:not(.ant-select-customize-input) .ant-select-selector) {
		height: 36px;
		border-radius: 8px;
		border-color: #ff7eb3;
	}

	:deep(.ant-select-single .ant-select-selector .ant-select-selection-item),
	:deep(.ant-select-single .ant-select-selector .ant-select-selection-placeholder) {
		line-height: 34px;
		font-size: 15px;
	}

	:deep(.ant-pagination-item) {
		min-width: 36px;
		height: 36px;
		line-height: 36px;
		border-radius: 8px;
		border-color: #ff7eb3;
		transition: all 0.3s;
	}

	:deep(.ant-pagination-item a) {
		color: #ff7eb3;
	}

	:deep(.ant-pagination-item:hover) {
		border-color: #ff7eb3;
	}

	:deep(.ant-pagination-item:hover a) {
		color: #ff7eb3;
	}

	:deep(.ant-pagination-item-active) {
		background-color: #ff7eb3;
		border-color: #ff7eb3;
	}

	:deep(.ant-pagination-item-active a) {
		color: #fff !important;
	}

	:deep(.ant-pagination-item-active:hover) {
		background-color: #ff6b9e;
		border-color: #ff6b9e;
	}

	:deep(.ant-pagination-item-active:hover a) {
		color: #fff !important;
	}

	:deep(.ant-pagination-prev),
	:deep(.ant-pagination-next) {
		min-width: 36px;
		height: 36px;
		line-height: 36px;
	}

	:deep(.ant-pagination-prev .ant-pagination-item-link),
	:deep(.ant-pagination-next .ant-pagination-item-link) {
		border: none;
		background: transparent;
	}

	:deep(.ant-pagination-prev button),
	:deep(.ant-pagination-next button) {
		color: #ff7eb3;
	}

	:deep(.ant-pagination-prev:hover button),
	:deep(.ant-pagination-next:hover button) {
		color: #ff6b9e;
	}

	:deep(.ant-pagination-total-text) {
		font-size: 15px;
		color: #666;
	}

	:deep(.ant-select:hover .ant-select-selector) {
		border-color: #ff7eb3 !important;
	}

	:deep(.ant-select-focused .ant-select-selector) {
		border-color: #ff7eb3 !important;
		box-shadow: 0 0 0 2px rgba(255, 126, 179, 0.2) !important;
	}

	:deep(.ant-select-item-option-selected:not(.ant-select-item-option-disabled)) {
		background-color: #fff5f8;
		color: #ff7eb3;
	}

	:deep(.ant-select-item-option:hover) {
		background-color: #fff5f8;
	}
</style>
