<template>
    <div class="index">
        <a-modal v-model:open="open" title="添加项目" :footer="null">
            <div class="modal"
                style="height: 450px; display: flex;flex-direction: column;justify-content: space-around;">

                <a-form :model="addForm" name="basic" @finish="addOnFinish" @finishFailed="addOnFinishFailed">

                    <a-form-item label="项目名称" name="itemTitle" :rules="[{ required: true, message: '请输入项目名称!' }]">
                        <a-input v-model:value="addForm.itemTitle" />
                    </a-form-item>

                    <a-form-item label="项目简介" name="itemSynopsis" :rules="[{ required: true, message: '请输入项目简介!' }]">
                        <a-input v-model:value="addForm.itemSynopsis" />
                    </a-form-item>

                    <a-form-item label="项目地点" name="itemPlace" :rules="[{ required: true, message: '请输入项目地点!' }]">
                        <a-input v-model:value="addForm.itemPlace" />
                    </a-form-item>

                    <a-form-item label="项目类型" name="itemType" :rules="[{ required: true, message: '请输入项目类型!' }]">
                        <a-input v-model:value="addForm.itemType" />
                    </a-form-item>

                    <a-form-item label="上传图片">
                        <div class="h-icon-box" @click="triggerFileUpload">
                            <img class="h-icon" src="@/assets/h-icon.png" alt="" />
                            <label for="upload" class="files-btn" @click.stop="triggerFileUpload">
                                <a-button>
                                    <template #icon>
                                        <UploadOutlined />
                                    </template>
                                    Click to upload
                                </a-button>
                            </label>
                            <input id="upload" type="file" ref="fileInput" @change="uploadHead"
                                style="display: none;" />
                        </div>

                        <img style="height: 100px;width: 100px; margin-top: 10px;" v-if="uploadImg":src="uploadImg" alt="">
                    </a-form-item>

                    <a-form-item>
                        <a-button style="background: #445d8c; width: 100%; margin-top: 20px;" :loading="addLoading"
                            type="primary" html-type="submit">
                            <span v-if="!addLoading">添加</span>
                            <span v-else>添加中...</span>
                        </a-button>
                    </a-form-item>

                </a-form>

            </div>
        </a-modal>

        <div class="index-top">
            <div class="it-title">添加项目</div>
            <div class="it-min-title">Add item</div>
            <div class="add-btn" @click="addWord">添加</div>
        </div>
        <div class="index-bom">
            <div class="ib-item" v-for="(item, index) in itemData" @click="goItem(item)">{{ item.itemTitle }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { message } from 'ant-design-vue';
import router from '@/router';
import { Api } from '@/assets/api';

const open = ref(false);
const addLoading = ref(false);
const handleOk = async () => {
    open.value = false;
}
const addForm = reactive({
    itemTitle: '',
    itemSynopsis: '',
    itemPlace: '',
    itemType: '',
})
const fileInput = ref(null);

const triggerFileUpload = () => {
    fileInput.value.click();
}

const uploadImg = ref('');
const uploadHead = async (event) => {
    const file = event.target.files[0];
	let postData = new FormData();
	postData.append('file', file);
	console.log('file====>', file);
	let { data } = await Api.userAvatarUpload(postData);
	console.log('头像data====>', data);
	uploadImg.value = data.data;

    message.success('done');

}
const addOnFinish = (values) => {
    values.uploadImg = uploadImg.value;
    values.itemId = Math.random().toString(36).substring(2);
    values.assignment = [];
    let itemArr = JSON.parse(localStorage.getItem('itemArr')) || [];
    itemArr.push(values);
    localStorage.setItem('itemArr', JSON.stringify(itemArr));
    inquireItem()
    open.value = false;

    message.success('done');

}

const addOnFinishFailed = (values) => {
    console.log('done', values);
}

const wordValue = ref('');
//查询项目
const inquireItem = () => {
    itemData.value = JSON.parse(localStorage.getItem('itemArr')) || [];
}
//添加项目
const addWord = () => {
    open.value = true;
}

const itemData = ref([])

const goItem = (item) => {
    console.log('item', item);
    router.push({
        path: '/projectDetails',
        query: {
            itemId: item.itemId
        }
    });
}

onMounted(() => {
    inquireItem()
});
</script>


<style lang="scss" scoped>
.index {

    .index-top {
        height: 240px;
        width: 100%;
        background: url(@/assets/add-bg.png) 100% no-repeat;
        background-size: 100% 100%;
        border-radius: 10px;
        padding: 22px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .it-title {
            color: rgba(255, 255, 255, 1);
            font-size: 44px;
            font-weight: 900;
            text-align: center;
        }

        .it-min-title {
            color: rgba(255, 255, 255, 1);
            font-size: 24px;
            font-weight: 500;
            text-align: center;
        }

        .add-btn {
            box-shadow: 0px 12px 24px 0px rgba(53, 87, 244, 0.2);
            background-color: #445d8c;
            border-radius: 6px;
            height: 32px;
            width: 300px;
            line-height: 32px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            margin-right: 2px;
            font-size: 18px;
            font-weight: bold;
        }
    }

    .index-bom {
        $gradients: (
            (#445d8c, 0px 12px 24px 0px rgba(53, 87, 244, 0.2)),
            (#445d8c, 0px 12px 24px 0px rgba(53, 87, 244, 0.2)),
            (#445d8c, 0px 12px 24px 0px rgba(53, 87, 244, 0.2))
        );

    $margin-offset: 0 5%;

    min-height: 200px;
    background: #fafbfe;
    border-radius: 10px;
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    padding: 24px 24px 0;

    @for $i from 1 through 100 {
        $index: $i % 3;
        $gradient-pair: nth($gradients, $index + 1);
        $gradient: nth($gradient-pair, 1);
        $shadow: nth($gradient-pair, 2);

        div:nth-child(#{$i}) {
            @if $index ==1 or $index ==0 {
                background: $gradient;
                box-shadow: $shadow;
            }

            @else {
                margin: $margin-offset;
                background: $gradient;
                box-shadow: $shadow;
            }
        }
    }

    .ib-item {

        border-radius: 12px;
        width: 30%;
        height: 200px;
        cursor: pointer;
        line-height: 200px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 24px;
        color: #fff;
    }

}




}
</style>
