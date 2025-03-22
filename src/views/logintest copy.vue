<template>
	<div class="login-page">
		<div class="container" :class="{ active: isActive }">
			<div class="form-box login">
				<a-form :model="loginForm" @finish="handleLogin">
					<h1>登录</h1>
					<a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]" class="custom-form-item">
						<a-input v-model:value="loginForm.username" placeholder="用户名">
							<template #prefix>
								<user-outlined />
							</template>
						</a-input>
					</a-form-item>
					<a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]" class="custom-form-item">
						<a-input-password v-model:value="loginForm.password" placeholder="密码">
							<template #prefix>
								<lock-outlined />
							</template>
						</a-input-password>
						<div class="forgot-link">
							<a href="#">忘记密码?</a>
						</div>
					</a-form-item>
					<a-button type="primary" html-type="submit" class="login-button" block>登录</a-button>
					<p>或通过社交平台登录</p>
				</a-form>
			</div>

			<div class="form-box register">
				<a-form :model="registerForm" @finish="handleRegister">
					<h1>注册</h1>
					<a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]" class="custom-form-item">
						<a-input v-model:value="registerForm.username" placeholder="用户名">
							<template #prefix>
								<user-outlined />
							</template>
						</a-input>
					</a-form-item>
					<a-form-item
						name="email"
						:rules="[
							{ required: true, message: '请输入邮箱!' },
							{ type: 'email', message: '请输入有效的邮箱地址!' },
						]"
						class="custom-form-item"
					>
						<a-input v-model:value="registerForm.email" placeholder="邮箱">
							<template #prefix>
								<mail-outlined />
							</template>
						</a-input>
					</a-form-item>
					<a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]" class="custom-form-item">
						<a-input-password v-model:value="registerForm.password" placeholder="密码">
							<template #prefix>
								<lock-outlined />
							</template>
						</a-input-password>
						<div class="forgot-link">
							<a href="#">忘记密码?</a>
						</div>
					</a-form-item>
					<a-button type="primary" html-type="submit" class="register-button" block>注册</a-button>
					<p>或者在社交平台上注册</p>
				</a-form>
			</div>

			<div class="toggle-box">
				<div class="toggle-panel toggle-left">
					<h1>欢迎加入我们!</h1>
					<p>你还没有账号?</p>
					<a-button ghost @click="toggleForm" size="large">前往注册</a-button>
				</div>

				<div class="toggle-panel toggle-right">
					<h1>欢迎回来!</h1>
					<p>已有账户?</p>
					<a-button ghost @click="toggleForm" size="large">前往登录</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, reactive } from 'vue'
	import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'

	const isActive = ref(false)
	const loginForm = reactive({
		username: '',
		password: '',
	})
	const registerForm = reactive({
		username: '',
		email: '',
		password: '',
	})

	const toggleForm = () => {
		isActive.value = !isActive.value
	}

	const handleLogin = (values) => {
		console.log('登录表单提交:', values)
	}

	const handleRegister = (values) => {
		console.log('注册表单提交:', values)
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
		margin-bottom: 32px;
	}

	.custom-form-item :deep(.ant-form-item-control-input) {
		min-height: auto;
	}

	.forgot-link {
		text-align: left;
		margin: 8px 0 0;
	}

	.forgot-link a {
		color: #ff7eb3;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.forgot-link a:hover {
		color: #ff6b9e;
		text-decoration: underline;
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

	.toggle-panel :deep(.ant-btn) {
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

	.toggle-panel :deep(.ant-btn:hover) {
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

		.toggle-panel :deep(.ant-btn) {
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
</style>
