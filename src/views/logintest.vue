<template>
	<div class="login-page">
		<transition
			name="slide-fade"
			mode="out-in"
		>
			<div
				v-if="!isClosing"
				class="container"
				:class="{ active: isActive, entering: isEntering }"
			>
				<div class="form-box login">
					<div
						class="close-button"
						@click="handleClose"
					>
						<close-outlined />
					</div>
					<a-form
						:model="loginForm"
						@finish="handleLogin"
					>
						<h1>登录</h1>
						<a-form-item
							name="login_username"
							:rules="[{ required: true, message: '快点输入用户名!!!!!' }]"
							class="custom-form-item"
						>
							<a-input
								v-model:value="loginForm.login_username"
								placeholder="用户名"
							>
								<template #prefix>
									<user-outlined />
								</template>
							</a-input>
						</a-form-item>
						<a-form-item
							name="login_password"
							:rules="[{ required: true, message: '快点输入密码!!!!!' }]"
							class="custom-form-item"
						>
							<a-input-password
								v-model:value="loginForm.login_password"
								placeholder="密码"
							>
								<template #prefix>
									<lock-outlined />
								</template>
							</a-input-password>
						</a-form-item>
						<div class="forgot-link">
							<a href="#">忘记密码?</a>
						</div>
						<a-button
							type="primary"
							html-type="submit"
							class="login-button"
							block
						>
							登录
						</a-button>
						<p>或通过社交平台登录</p>
					</a-form>
				</div>

				<div class="form-box register">
					<a-form
						:model="registerForm"
						@finish="handleRegister"
					>
						<h1>注册</h1>
						<a-form-item
							name="register_username"
							:rules="[{ required: true, message: '快点输入用户名!!!!!' }]"
							class="custom-form-item"
						>
							<a-input
								v-model:value="registerForm.register_username"
								placeholder="用户名"
							>
								<template #prefix>
									<user-outlined />
								</template>
							</a-input>
						</a-form-item>
						<a-form-item
							name="register_email"
							:rules="[
								{ required: true, message: '快点输入邮箱!!!!!' },
								{ type: 'email', message: '请输入有效的邮箱地址!!!!!' },
							]"
							class="custom-form-item"
						>
							<a-input
								v-model:value="registerForm.register_email"
								placeholder="邮箱"
							>
								<template #prefix>
									<mail-outlined />
								</template>
							</a-input>
						</a-form-item>
						<a-form-item
							name="register_password"
							:rules="[{ required: true, message: '快点输入密码!!!!!' }]"
							class="custom-form-item"
						>
							<a-input-password
								v-model:value="registerForm.register_password"
								placeholder="密码"
							>
								<template #prefix>
									<lock-outlined />
								</template>
							</a-input-password>
						</a-form-item>
						<div class="forgot-link">
							<a href="#">忘记密码?</a>
						</div>
						<a-button
							type="primary"
							html-type="submit"
							class="register-button"
							block
						>
							注册
						</a-button>
						<p>或者在社交平台上注册</p>
					</a-form>
				</div>

				<div class="toggle-box">
					<div class="toggle-panel toggle-left">
						<h1>欢迎加入我们!</h1>
						<p>你还没有账号?</p>
						<a-button
							ghost
							@click="toggleForm"
							size="large"
						>
							前往注册
						</a-button>
					</div>

					<div class="toggle-panel toggle-right">
						<h1>欢迎回来!</h1>
						<p>已有账户?</p>
						<a-button
							ghost
							@click="toggleForm"
							size="large"
						>
							前往登录
						</a-button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
	import {
		UserOutlined,
		LockOutlined,
		MailOutlined,
		CloseOutlined,
	} from '@ant-design/icons-vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const isActive = ref(false)
	const isClosing = ref(false)
	const isEntering = ref(true)
	const loginForm = reactive({
		login_username: '',
		login_password: '',
	})
	const registerForm = reactive({
		register_username: '',
		register_email: '',
		register_password: '',
	})

	onMounted(() => {
		// 进入动画
		setTimeout(() => {
			isEntering.value = false
		}, 100)
	})

	onBeforeUnmount(() => {
		// 退出动画
		isClosing.value = true
	})

	const handleClose = async () => {
		isClosing.value = true
		await new Promise((resolve) => setTimeout(resolve, 300))
		router.push('/')
	}

	const toggleForm = () => {
		isActive.value = !isActive.value
	}

	const handleLogin = (values) => {
		console.log('登录表单提交:', {
			login_username: values.login_username,
			login_password: values.login_password,
		})
	}

	const handleRegister = (values) => {
		console.log('注册表单提交:', {
			register_username: values.register_username,
			register_email: values.register_email,
			register_password: values.register_password,
		})
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
			sans-serif;
	}

	.login-page {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(135deg, #fff5f8 0%, #fff 100%);
		padding: 20px;
	}

	.container {
		position: relative;
		width: 1000px;
		height: 600px;
		background-color: #fff;
		border-radius: 30px;
		box-shadow:
			0 10px 30px rgba(255, 126, 179, 0.1),
			0 1px 8px rgba(255, 126, 179, 0.2);
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.container.entering {
		opacity: 0;
		transform: translateY(50px) scale(0.95);
	}

	.container.active .toggle-box::before {
		left: 50%;
	}

	.form-box {
		position: absolute;
		right: 0;
		width: 50%;
		height: 100%;
		background-color: #fff;
		display: flex;
		align-items: center;
		color: #333;
		text-align: center;
		padding: 60px;
		z-index: 1;
		transition:
			0.6s ease-in-out 1.2s,
			visibility 0s 1s;
	}

	.container.active .form-box {
		right: 50%;
	}

	.form-box.register {
		visibility: hidden;
	}

	.container.active .form-box.register {
		visibility: visible;
	}

	.form-box :deep(.ant-form) {
		width: 100%;
		max-width: 380px;
		margin: 0 auto;
	}

	.form-box :deep(.ant-input-affix-wrapper) {
		height: 50px;
		border-radius: 12px;
		border: 2px solid #ffd4e5;
		transition: all 0.3s ease;
		background: #fff;
		overflow: hidden;
	}

	.form-box :deep(.anticon) {
		font-size: 24px;
		color: #ff7eb3;
	}

	.form-box :deep(.ant-input-prefix) {
		margin-right: 16px;
		margin-left: 8px;
	}

	.form-box :deep(.ant-input-suffix) {
		margin-left: 16px;
		margin-right: 8px;
	}

	.form-box :deep(.ant-input) {
		font-size: 15px;
		background: #fff;
		padding-left: 4px;
	}

	.form-box :deep(.ant-input-affix-wrapper:hover) {
		border-color: #ff7eb3;
		background: #fff;
	}

	.form-box :deep(.ant-input-affix-wrapper-focused),
	.form-box :deep(.ant-input-affix-wrapper:focus) {
		outline: none;
		border-right-width: 2px !important;
		border-color: #ff7eb3 !important;
		background: #fff !important;
		box-shadow: 0 0 0 3px rgba(255, 126, 179, 0.1) !important;
	}

	.form-box :deep(.ant-input-affix-wrapper > input.ant-input) {
		border-radius: 10px;
	}

	.form-box :deep(.ant-btn) {
		height: 45px;
		border-radius: 12px;
		font-size: 16px;
		font-weight: 500;
		background: linear-gradient(45deg, #ff7eb3, #ff6b9e);
		border: none;
		box-shadow: 0 4px 15px rgba(255, 126, 179, 0.25);
		transition: all 0.3s ease;
	}

	.form-box :deep(.ant-btn:hover) {
		background: linear-gradient(45deg, #ff6b9e, #ff5a93);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(255, 126, 179, 0.35);
	}

	.form-box h1 {
		font-size: 36px;
		background: linear-gradient(45deg, #ff7eb3, #ff6b9e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin: 0 0 40px;
		font-weight: 700;
	}

	.custom-form-item {
		margin-bottom: 24px;
	}

	.custom-form-item :deep(.ant-form-item-control-input) {
		min-height: auto;
	}

	.custom-form-item :deep(.ant-form-item-explain) {
		text-align: left;
		font-size: 15px;
		margin-top: 4px;
		margin-left: 20px;
		margin-bottom: 10px;
	}

	.forgot-link {
		text-align: right;
		margin: -10px 0 20px;
	}

	.forgot-link a {
		color: #ff7eb3;
		text-decoration: none;
		font-size: 15px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.forgot-link a:hover {
		color: #ff6b9e;
		/* text-decoration: underline; */
	}

	.form-box p {
		margin: 24px 0;
		color: #666;
		font-size: 14px;
	}

	.toggle-box {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.toggle-box::before {
		content: '';
		position: absolute;
		left: -250%;
		width: 300%;
		height: 100%;
		background: linear-gradient(45deg, #69a9ff, #4a90e2);
		z-index: 2;
		border-radius: 150px;
		transition: 1.8s ease-in-out;
	}

	.container.active .toggle-box::before {
		left: 50%;
	}

	.toggle-panel {
		position: absolute;
		width: 50%;
		height: 100%;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2;
		transition: 0.6s ease-in-out;
		padding: 0 60px;
		background: transparent;
	}

	.toggle-panel h1 {
		font-size: 38px;
		margin-bottom: 20px;
		font-weight: 700;
		color: #fff;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		letter-spacing: -0.5px;
		background: none;
		-webkit-background-clip: initial;
		-webkit-text-fill-color: initial;
	}

	.toggle-panel p {
		font-size: 18px;
		margin-bottom: 32px;
		font-weight: 400;
		line-height: 1.6;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.toggle-panel .ant-btn {
		height: 48px;
		padding: 0 64px;
		font-size: 16px;
		font-weight: 500;
		border: 2px solid rgba(255, 255, 255, 0.9);
		border-radius: 12px;
		background: transparent;
		transition: all 0.3s ease;
		color: #fff;
	}

	.toggle-panel .ant-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(105, 169, 255, 0.3);
	}

	.toggle-panel.toggle-left {
		left: 0;
		transition-delay: 1.2s;
	}

	.container.active .toggle-panel.toggle-left {
		left: -50%;
		transition-delay: 0.6s;
	}

	.toggle-panel.toggle-right {
		right: -50%;
		transition-delay: 0.6s;
	}

	.container.active .toggle-panel.toggle-right {
		right: 0;
		transition-delay: 1.2s;
	}

	.close-button {
		position: absolute;
		top: 20px;
		right: 30px;
		cursor: pointer;
		z-index: 10;
	}

	.close-button .anticon {
		font-size: 24px;
		color: #ff7eb3;
		transition: all 0.3s ease;
	}

	.close-button:hover .anticon {
		color: #ff6b9e;
		transform: rotate(90deg);
	}

	@media screen and (max-width: 650px) {
		.container {
			height: calc(100vh - 40px);
			border-radius: 20px;
		}

		.form-box {
			bottom: 0;
			width: 100%;
			height: 70%;
			padding: 40px 24px;
		}

		.form-box :deep(.ant-form) {
			max-width: 100%;
		}

		.container.active .form-box {
			right: 0;
			bottom: 30%;
		}

		.toggle-box::before {
			left: 0;
			width: 100%;
			top: -270%;
			height: 300%;
			border-radius: 20vw;
			background: linear-gradient(180deg, #69a9ff, #4a90e2);
		}

		.container.active .toggle-box::before {
			left: 0;
			top: 70%;
		}

		.toggle-panel {
			width: 100%;
			height: 30%;
			padding: 24px;
		}

		.toggle-panel h1 {
			font-size: 32px;
			margin-bottom: 12px;
		}

		.toggle-panel p {
			font-size: 16px;
			margin-bottom: 24px;
		}

		.toggle-panel .ant-btn {
			height: 44px;
			padding: 0 48px;
			font-size: 15px;
		}

		.toggle-panel.toggle-left {
			top: 0;
		}

		.container.active .toggle-panel.toggle-left {
			left: 0;
			top: -30%;
		}

		.toggle-panel.toggle-right {
			right: 0;
			bottom: -30%;
		}

		.container.active .toggle-panel.toggle-right {
			bottom: 0;
		}
	}

	@media screen and (max-width: 400px) {
		.form-box {
			padding: 24px 16px;
		}

		.container h1 {
			font-size: 28px;
			margin: 0 0 32px;
		}

		.toggle-panel h1 {
			font-size: 28px;
		}

		.toggle-panel p {
			font-size: 14px;
		}
	}

	.slide-fade-enter-active,
	.slide-fade-leave-active {
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.slide-fade-enter-from {
		opacity: 0;
		transform: translateY(30px) scale(0.9);
	}

	.slide-fade-leave-to {
		opacity: 0;
		transform: translateY(-30px) scale(0.9);
	}

	.slide-fade-enter-to,
	.slide-fade-leave-from {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
</style>
