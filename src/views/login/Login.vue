<template>
    <div class="login-wrapper">
        <div class="form-box">
            <div class="form-box-left" :class="{ 'form-box-left': true, 'transformed': moved }">
                <div class="guide-register-box">
                    <div class="max-welcome-title">MyBoard</div>
                    <div class="min-welcome-title">请登录账户喵</div>
                    <div class="login-btn" @click="toggleAnimation">{{ moved ? '登录' : '注册' }}</div>
                </div>

            </div>
            <div class="form-box-right" :class="{ 'form-box-right': true, 'transformed': moved }">

                <div class="guide-login-box" v-if="!moved">

                    <div class="login-title">登录</div>
                    <div class="form-box-right-content">
                        <a-form layout="vertical" :model="loginFormState" name="basic" @finish="loginOnFinish"
                            @finishFailed="loginOnFinishFailed">
                            <a-form-item label="用户账号" name="account"
                                :rules="[{ required: true, message: '请输入用户账号!' }, { min: 4, message: '用户账号长度应大于4个字符!' }]">
                                <a-input v-model:value="loginFormState.account" />
                            </a-form-item>

                            <a-form-item label="密码" name="password"
                                :rules="[{ required: true, message: '请输入密码!' }, { min: 8, max: 20, message: '密码长度应在8到20个字符之间!' }]">
                                <a-input-password v-model:value="loginFormState.password" />
                            </a-form-item>
                            <a-form-item>
                                <a-button style="background: #445d8c; width: 100%; margin-top: 20px;" :loading="loading"
                                    type="primary" html-type="submit">
                                    <span v-if="!loading">登录</span>
                                    <span v-else>登录中...</span>
                                </a-button>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
                <div class="create-an-account" v-if="moved">
                    <div class="create-an-account-title">注册</div>

                    <a-form :model="registerForm" name="basic" @finish="registerOnFinish"
                        @finishFailed="registerOnFinishFailed">
                        <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入用户名!' },
            { min: 4, message: '用户名长度应大于4个字符!' }]">
                            <a-input v-model:value="registerForm.name" />
                        </a-form-item>

                        <a-form-item label="账号" name="account" :rules="[{ required: true, message: '请输入账号!' }]">
                            <a-input v-model:value="registerForm.account" />
                        </a-form-item>

                        <a-form-item label="密码" name="password"
                            :rules="[{ required: true, message: '请输入密码!' }, { min: 8, max: 20, message: '密码长度应在8到20个字符之间!' }]">
                            <a-input-password v-model:value="registerForm.password" />
                        </a-form-item>

                        <a-form-item label="性别：" name="sex" :rules="[{ required: true, message: '请选择性别!' }]">
                            <a-radio-group v-model:value="registerForm.sex" name="radioGroup">
                                <a-radio value="男">男</a-radio>
                                <a-radio value="女">女</a-radio>
                            </a-radio-group>
                        </a-form-item>



                        <a-form-item>
                            <a-button style="background: #445d8c; width: 100%; margin-top: 20px;"
                                :loading="registerLoading" type="primary" html-type="submit">
                                <span v-if="!registerLoading">注册</span>
                                <span v-else>注册中...</span>
                            </a-button>
                        </a-form-item>
                    </a-form>

                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Api } from '@/assets/api'
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const moved = ref(false)

const toggleAnimation = () => {
    moved.value = !moved.value

}
const loading = ref(false)

const registerLoading = ref(false)

const loginFormState = reactive({
    account: '',
    password: '',
});

const registerForm = reactive({
    name: '',
    account: '',
    password: '',
    sex: ''

})
const loginOnFinish = (values) => {
    loading.value = true;
    let infoArr = JSON.parse(localStorage.getItem('infoArr')) || [];
    let matchedUser = infoArr.find(user => user.account === values.account && user.password === values.password);

    if (matchedUser) {
        localStorage.setItem('matchedUser', JSON.stringify(matchedUser));
        setTimeout(() => {
            loading.value = false;
            router.push('/inbox');
        }, 1000);

        this.loginForm = {
            account: "",
            password: ""
        };
    } else {
        setTimeout(() => {
            message.error('账户不存在或者密码错误');
            loading.value = false;
        }, 1000);

    }

};

const loginOnFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const registerOnFinish = (values) => {

    registerLoading.value = true;

    let infoArr = JSON.parse(localStorage.getItem('infoArr')) || [];
    infoArr.push(values); // 将当前 info 对象添加到 infoArr 数组中
    localStorage.setItem('infoArr', JSON.stringify(infoArr)); // 更新本地缓存

    setTimeout(() => {
        registerLoading.value = false;
        registerForm.name = '';
        registerForm.account = '';
        registerForm.password = '';
        registerForm.sex = '';
        message.success('done');
    }, 3000);

}

const registerOnFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
}





</script>

<style lang="scss" scoped>
.login-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: url(@/assets/bg.png) 100% no-repeat;
    background-size: cover;


    .form-box {
        padding: 0 !important;
        border-radius: 10px !important;
        overflow: hidden !important;
        height: 520px;
        width: 800px;
        position: relative;
        overflow: hidden;
        background-color: transparent;



        .form-box-left {



            background: #445d8c;

            position: absolute;
            transition: transform 0.5s ease;
            transform: translateX(0);

            .guide-register-box {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                width: 300px;
                height: 520px;

                >div {
                    text-align: center;
                    color: #fff;
                    width: 200px;
                }

                .max-welcome-title {
                    font-size: 30px;
                    font-weight: bold;
                }

                .login-btn {
                    line-height: 60px;
                    height: 60px;
                    border-radius: 50px;
                    border: 2px solid #fff;
                    font-weight: bold;
                    cursor: pointer;
                }
            }



        }

        .form-box-right {

            background: #fff;

            position: absolute;
            right: 0;
            transition: transform 0.5s ease;
            transform: translateX(0);

            .guide-login-box {
                padding: 0 50px;
                height: 520px;
                width: 500px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;


                .login-title {
                    text-align: center;
                    font-size: 30px;
                    color: #445d8c;
                    font-weight: bold;
                }

            }

            .create-an-account {
                padding: 0 50px;
                height: 520px;
                width: 500px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;


                .create-an-account-title {
                    text-align: center;
                    font-size: 30px;
                    color: #445d8c;
                    font-weight: bold;
                }

                .create-an-account-item {
                    cursor: pointer;
                    border-radius: 30px;
                    line-height: 60px;
                    height: 60px;
                    width: 100%;
                    text-align: center;
                    color: #fff;
                    background-color: #445d8c;
                }

            }

        }

        .form-box-left.transformed {
            transform: translateX(500px);
        }

        .form-box-right.transformed {
            transform: translateX(-300px);
        }

    }

}
</style>
