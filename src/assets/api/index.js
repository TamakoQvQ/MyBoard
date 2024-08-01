import { http } from '../utils/http';

//api接口
export const Api = {
    //登录
    userLogin: (data) => {
        return http.post('/user/login', data);
    },
    //注册
    userRegister: (data) => {
        return http.post('/user/register', data);
    },

    //用户头像上传
    userAvatarUpload: (data) => {
        return http.post('/user/avatar/upload', data);
    },
}
