<template>
	<div class="min-h-screen w-full flex items-center justify-center bg-[#f0f2f5] p-4">
		<div class="container">
			<!-- 左侧内容 -->
			<div class="left-side" :class="{ 'slide-out': isRegisterActive }">
				<div class="content">
					<h1>Hello, World!</h1>
					<p>你还没有账号？</p>
					<button class="action-btn" @click="toggleRegister">前往注册</button>
				</div>
			</div>

			<!-- 右侧内容 -->
			<div class="right-side" :class="{ 'slide-in': isRegisterActive }">
				<div class="content">
					<h1>欢迎回来！</h1>
					<p>已有账号？</p>
					<button class="action-btn" @click="toggleLogin">立即登录</button>
				</div>
			</div>

			<!-- 表单容器 -->
			<div class="form-container" :class="{ 'slide-left': isRegisterActive }">
				<!-- 登录表单 -->
				<form @submit.prevent="handleLogin" class="form" :class="{ hidden: isRegisterActive }">
					<h2>登录</h2>
					<div class="input-group">
						<a-input v-model:value="loginForm.username" placeholder="用户名" size="large">
							<template #prefix>
								<UserOutlined style="color: #bfbfbf" />
							</template>
						</a-input>
					</div>
					<div class="input-group">
						<a-input-password v-model:value="loginForm.password" placeholder="密码" size="large">
							<template #prefix>
								<LockOutlined style="color: #bfbfbf" />
							</template>
						</a-input-password>
					</div>
					<div class="forgot-password">
						<a href="#">忘记密码？</a>
					</div>
					<a-button type="primary" html-type="submit" block>登录</a-button>
					<div class="social-login">
						<p>或通过社交平台登录</p>
						<div class="social-icons">
							<a href="#"><GoogleOutlined /></a>
							<a href="#"><GithubOutlined /></a>
							<a href="#"><WechatOutlined /></a>
						</div>
					</div>
				</form>

				<!-- 注册表单 -->
				<form @submit.prevent="handleRegister" class="form" :class="{ show: isRegisterActive }">
					<h2>注册</h2>
					<div class="input-group">
						<a-input v-model:value="registerForm.username" placeholder="用户名" size="large">
							<template #prefix>
								<UserOutlined style="color: #bfbfbf" />
							</template>
						</a-input>
					</div>
					<div class="input-group">
						<a-input v-model:value="registerForm.email" placeholder="邮箱" size="large">
							<template #prefix>
								<MailOutlined style="color: #bfbfbf" />
							</template>
						</a-input>
					</div>
					<div class="input-group">
						<a-input-password v-model:value="registerForm.password" placeholder="密码" size="large">
							<template #prefix>
								<LockOutlined style="color: #bfbfbf" />
							</template>
						</a-input-password>
					</div>
					<a-button type="primary" html-type="submit" block>注册</a-button>
					<div class="social-login">
						<p>或通过社交平台注册</p>
						<div class="social-icons">
							<a href="#"><GoogleOutlined /></a>
							<a href="#"><GithubOutlined /></a>
							<a href="#"><WechatOutlined /></a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { defineComponent } from 'vue'
	import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'

	export default defineComponent({
		name: 'Login',
		components: {
			UserOutlined,
			LockOutlined,
			MailOutlined,
		},
		data() {
			return {
				isRegisterActive: false,
				loginForm: {
					username: '',
					password: '',
				},
				registerForm: {
					username: '',
					email: '',
					password: '',
				},
			}
		},
		methods: {
			toggleRegister() {
				this.isRegisterActive = true
			},
			toggleLogin() {
				this.isRegisterActive = false
			},
			handleLogin(values) {
				console.log('登录表单提交:', values)
			},
			handleRegister(values) {
				console.log('注册表单提交:', values)
			},
		},
	})
</script>

<style scoped>
	.container {
		position: relative;
		width: 1000px;
		height: 600px;
		background: white;
		border-radius: 20px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.left-side,
	.right-side {
		position: absolute;
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #4481eb;
		transition: transform 0.6s ease-in-out;
	}

	.left-side {
		left: 0;
		background: linear-gradient(45deg, #4481eb, #04befe);
	}

	.right-side {
		right: -50%;
		background: linear-gradient(45deg, #04befe, #4481eb);
	}

	.content {
		color: white;
		text-align: center;
		padding: 3rem;
	}

	.content h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.content p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		opacity: 0.9;
	}

	.action-btn {
		padding: 10px 30px;
		border: 2px solid white;
		border-radius: 30px;
		color: white;
		background: transparent;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.form {
		display: none;
		flex-direction: column;
		align-items: center;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0);
		transition: all 0.6s ease-in-out;
	}

	.form.hidden {
		transform: translateX(-100%);
		opacity: 0;
	}

	.form.show {
		display: flex;
		transform: translateX(0);
		opacity: 1;
	}

	.form:not(.hidden) {
		display: flex;
	}

	h2 {
		font-size: 2rem;
		color: #333;
		margin-bottom: 2rem;
		font-weight: 600;
	}

	.input-group {
		width: 100%;
		margin-bottom: 1.5rem;
	}

	.forgot-password {
		width: 100%;
		text-align: right;
		margin-bottom: 1rem;
	}

	.forgot-password a {
		color: #666;
		text-decoration: none;
		font-size: 0.9rem;
	}

	.forgot-password a:hover {
		color: #4481eb;
	}

	.social-login {
		margin-top: 2rem;
		text-align: center;
	}

	.social-login p {
		color: #666;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.social-icons {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.social-icon {
		width: 40px;
		height: 40px;
		border: 1px solid #ddd;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		background: white;
	}

	.social-icon:hover {
		border-color: #4481eb;
		transform: translateY(-2px);
	}

	.social-icon img {
		width: 20px;
		height: 20px;
	}

	/* 动画类 */
	.slide-out {
		transform: translateX(-100%);
	}

	.slide-in {
		transform: translateX(-100%);
	}

	.slide-left {
		transform: translateX(-100%);
	}

	.form-container {
		position: absolute;
		top: 0;
		right: 0;
		width: 50%;
		height: 100%;
		padding: 3rem;
		background: white;
		transition: transform 0.6s ease-in-out;
		overflow: hidden;
	}

	:deep(.ant-input-affix-wrapper) {
		background: #f5f5f5;
		border: none;
		border-radius: 8px;
		padding: 8px 12px;
		height: 45px;
	}

	:deep(.ant-input) {
		background: #f5f5f5;
		font-size: 0.95rem;
	}

	:deep(.ant-input-affix-wrapper:hover) {
		background: #f0f0f0;
	}

	:deep(.ant-input-affix-wrapper-focused) {
		box-shadow: none !important;
		background: #f0f0f0;
	}

	:deep(.ant-btn-primary) {
		background: #4481eb;
		border: none;
		height: 45px;
		font-weight: 600;
		border-radius: 8px;
		font-size: 1rem;
		box-shadow: 0 2px 4px rgba(68, 129, 235, 0.2);
	}

	:deep(.ant-btn-primary:hover) {
		background: #3461b5;
		box-shadow: 0 4px 8px rgba(68, 129, 235, 0.3);
	}

	@media (max-width: 768px) {
		.container {
			width: 100%;
			height: auto;
			min-height: 100vh;
			border-radius: 0;
		}

		.left-side,
		.right-side {
			width: 100%;
			height: 200px;
		}

		.form-container {
			width: 100%;
			padding: 2rem;
		}

		.slide-left {
			transform: translateY(-200px);
		}

		.form {
			position: relative;
		}

		.form.hidden {
			transform: translateY(-100%);
		}

		.form.show {
			transform: translateY(0);
		}
	}
</style>
