<template>
	<div class="userinfo">
		<div class="userinfo-top">
			<div class="head-portrait">
				<img class="moren" src="@/assets/moren.png" alt="" v-if="!registerForm.userAvatarUrl">
				<img class="moren" style="border: 4px solid #fff;" v-if="registerForm.userAvatarUrl" :src="registerForm.userAvatarUrl" src="@/assets/moren.png" alt="">
				<div class="h-icon-box" @click="triggerFileUpload">
					<img class="h-icon" src="@/assets/h-icon.png" alt="" />
					<label for="upload" class="files-btn" @click.stop="triggerFileUpload">上传头像</label>
					<input id="upload" type="file" ref="fileInput" @change="uploadHead" style="display: none;" />
				</div> 
			</div>
		</div>

		<div class="userinfo-bom">
			<div class="ub">

				<a-form :model="registerForm" name="basic" @finish="registerOnFinish"
				@finishFailed="registerOnFinishFailed">
				
				<a-form-item label="用户账号" name="account">
					<a-input v-model:value="registerForm.account" :disabled="true" />
				</a-form-item>
				
				
				<a-form-item label="用户名" name="name">
					<a-input v-model:value="registerForm.name" />
				</a-form-item>
				
				<a-form-item label="用户简介" name="userProfile">
					<a-input v-model:value="registerForm.userProfile" />
				</a-form-item>
				
				
				<a-form-item>
					<a-button :loading="registerLoading" type="primary" html-type="submit">
						<span v-if="!registerLoading">修改</span>
						<span v-else>修改中...</span>
					</a-button>
				</a-form-item>
			</a-form>
		</div>
		</div>
	</div>
</template>


<script setup>

import { reactive, ref, onMounted } from 'vue'

import { Api } from '@/assets/api'
import { message } from 'ant-design-vue';


const registerForm = reactive({
	name: '',
	account: '',
	userProfile: '',
	userAvatarUrl: ''
})

const registerLoading = ref(false);
onMounted(() => {

	getUserInfo()
});

const userAvatarUrl = ref('');
const fileInput = ref(null);

const triggerFileUpload = () => {
	fileInput.value.click();
}

const uploadHead = async (event) => {
	const file = event.target.files[0];

	let postData = new FormData();

	postData.append('file', file);

	console.log('file====>', file);

	let { data } = await Api.userAvatarUpload(postData);

	console.log('头像data====>', data);

	registerForm.userAvatarUrl = data.data;

	userAvatarUrl.value = data.data;
	message.success('done');

}

const getUserInfo =  () => {
	const matchedUser = JSON.parse(localStorage.getItem('matchedUser')) || {};
	console.log('matchedUser====>',matchedUser);
	registerForm.name = matchedUser.name;
	registerForm.account = matchedUser.account;
	registerForm.userProfile = matchedUser.userProfile;
	registerForm.userAvatarUrl = matchedUser.userAvatarUrl;

}


const registerOnFinish =  (values) => {
	console.log('22values===>',values);
	values.userAvatarUrl = userAvatarUrl.value
	localStorage.setItem('matchedUser', JSON.stringify(values));

	message.success('done');

}

const registerOnFinishFailed = errorInfo => {
	console.log('Failed:', errorInfo);
}


</script>




<style lang="scss" scoped>
#upload {
	cursor: pointer;
	display: none;
}

:where(.css-dev-only-do-not-override-19iuou).ant-btn-primary{
	box-shadow: 0px 12px 24px 0px rgba(53, 87, 244, 0.2);
	background-color: #445d8c;
	height: 40px;
    width: 500px;
}

.userinfo {
	.userinfo-top {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 240px;
		width: 100%;
		background: #7cb9d7;
		box-shadow: 0px 12px 24px 0px rgba(53, 87, 244, 0.2);
		border-radius: 12px;


		.head-portrait {
			cursor: pointer;
			position: relative;

			.moren {
				height: 140px;
				width: 140px;
				border-radius: 50%;
			}

			.h-icon-box {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				align-items: center;
				flex-direction: column;

				img {
					height: 32px;
					width: 32px;
					margin-bottom: 6px;
				}

				font-size: 14px;
				color: #fff;
			}
		}

	}

	.userinfo-bom {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 24px;
		height: 360px;
		width: 100%;
		border-radius: 10px;
		background: #fff;

		.ub{
			 width: 500px;
		}
	}

}
</style>