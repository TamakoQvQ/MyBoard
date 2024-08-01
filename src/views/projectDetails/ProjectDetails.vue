<template>
  <div class="index">
    <div class="index-top">
      <img @click="goBack" src="@/assets/return-icon.png" alt="" />
      <div class="index-top-right">
        
      </div>
    </div>
    <a-modal v-model:open="open" title="添加任务" :footer="null">
      <div class="modal" style="height: 400px; display: flex;flex-direction: column;justify-content: space-around;">

        <a-form :model="addForm" name="basic" @finish="addOnFinish">

          <a-form-item label="任务标题" name="itemTitle" :rules="[{ required: true, message: '请输入任务标题!' }]">
            <a-input v-model:value="addForm.itemTitle" />
          </a-form-item>

          <a-form-item label="任务内容" name="itemSynopsis" :rules="[{ required: true, message: '请输入任务内容!' }]">
            <a-input v-model:value="addForm.itemSynopsis" />
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
              <input id="upload" type="file" ref="fileInput" @change="uploadHead" style="display: none;" />
            </div>

            <img style="height: 100px;width: 100px; margin-top: 10px;" v-if="uploadImg" :src="uploadImg" alt="">
          </a-form-item>

          <a-form-item>
            <a-button style="background: #445d8c; width: 100%; margin-top: 20px;" :loading="addLoading" type="primary"
              html-type="submit">
              <span v-if="!addLoading">添加</span>
              <span v-else>添加中...</span>
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:open="openComment" title="添加评论" :footer="null">
      <div class="modal" style="height: 200px; display: flex;flex-direction: column;justify-content: space-around;">

        <a-form :model="addCommentForm" name="basic" @finish="addCommentOnFinish">

          <a-form-item label="评论内容" name="content" :rules="[{ required: true, message: '请输入评论内容!' }]">
            <a-input v-model:value="addCommentForm.content" />
          </a-form-item>


          <a-form-item>
            <a-button style="background: #445d8c; width: 100%; margin-top: 20px;" :loading="addCommentLoading"
              type="primary" html-type="submit">
              <span v-if="!addCommentLoading">添加</span>
              <span v-else>添加中...</span>
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <div class="index-content">
      <div class="index-content-box-1" v-if="showDetails">
        <div v-if="itemDetails">
          <div class="project-details-top">
            <img class="cdt-left" :src="itemDetails.uploadImg" alt="" />
            <div class="cdt-middle">
              <div class="cdtm-title">{{ itemDetails.itemTitle }}</div>

              <div class="cdtm-brief-introduction">
                <img src="@/assets/project-icon.png" alt="" />
                <span>项目简介：</span>
                <span>{{ itemDetails.itemSynopsis }}</span>
              </div>

              <div class="cdtm-time">
                <div class="cdtmt-item">
                  <div>项目地点</div>
                  <div class="cdtmti-laber">{{ itemDetails.itemPlace }}</div>
                </div>

                <div class="cdtmt-item">
                  <div>项目类型</div>
                  <div class="cdtmti-laber">{{ itemDetails.itemType }}</div>
                </div>
              </div>
            </div>

            <div class="cdt-right">
              <div class="cdtr-bom" @click="() => { open = true }">添加任务</div>
            </div>
          </div>

          <div class="project-details-bom">
            <div class="cdb-title">
              <img src="@/assets/menu.png" alt="" /><span>目录</span>
            </div>

            <div class="subcourse-box">
              <div v-for="(item, index) in itemDetails.assignment" :key="index" class="subcourse-item">
                <div class="subcourse-index">
                  <span>{{ index + 1 }}</span>
                  <span>{{ index + 1 }}</span>
                </div>

                <div class="subcourse-title">{{ item.itemTitle }}</div>

                <div class="subcourse-btn">
                  <div @click="goAssignment(item)">任务详情</div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      <div class="index-content-box-1" v-if="!showDetails">
        <div v-if="assignmentData">
          <div class="project-details-top">
            <img class="cdt-left" :src="assignmentData.uploadImg" alt="" />
            <div class="cdt-middle">
              <!-- <div class="cdtm-title">{{itemDetails.itemTitle}}</div> -->
              <div class="cdtm-title">{{ assignmentData.itemTitle }}</div>

              <div class="cdtm-brief-introduction">
                <img src="@/assets/project-icon.png" alt="" />
                <span>任务内容：</span>
                <span>{{ assignmentData.itemSynopsis }}</span>
              </div>
            </div>

            <div class="cdt-right">
              <div class="cdtr-bom" @click="() => { openComment = true }">添加评论</div>
            </div>
          </div>

          <div class="project-details-bom">
            <div class="cdb-title">
              <img src="@/assets/menu.png" alt="" /><span>评论</span>
            </div>

           <div class="comment"  v-for="(item,index) in assignmentData.comment" >
                
            <div class="comment-left">
                <img :src="item.tx" alt="">
              </div>
              
              <div class="comment-right">
              <span>{{ item.yh }}</span>
                <span>{{item.content}}</span>
            </div>
          
          </div>


          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { Api } from '@/assets/api';
import { message } from 'ant-design-vue';
const router = useRouter();

const route = useRoute();
//显示项目详情
const showDetails = ref(true);
//任务详情
const itemDetails = ref(null);

//添加评论加载状态
const addCommentLoading = ref(false);
//添加任务加载状态
const addLoading = ref(false);
//添加任务弹窗状态
const open = ref(false);
//添加评论弹窗状态
const openComment = ref(false);
//添加任务表单
const addForm = reactive({
  itemTitle: '',
  itemSynopsis: '',
  itemPlace: '',
  itemType: ''
})

const goBack = () => {
   if(showDetails.value){
    router.back();
   }else{
    showDetails.value = true;
   }

  console.log('showDetails.value', showDetails.value);

}


//添加评论表单
const addCommentForm = reactive({
  content: '',
})
//在任务中添加评论
const addCommentOnFinish = (values) => {

  const matchedUser = JSON.parse(localStorage.getItem('matchedUser')) || {};

  console.log('matchedUser===>',matchedUser);


  console.log('values', values);
  values.tx = matchedUser.userAvatarUrl;
  values.yh = matchedUser.name;

  assignmentData.value.comment.push(values);

  console.log('任务id==>', assignmentData.value.assignmentId);

  console.log('任务详情', itemDetails.value.assignment);

  itemDetails.value.assignment.map((item => {
    if (item.assignmentId === assignmentData.value.assignmentId) {
      item = assignmentData.value;
    }
  }))

  const itemArr = JSON.parse(localStorage.getItem('itemArr')) || [];
  const updatedItemArr = itemArr.map(item => {
    if (item.itemId === itemDetails.value.itemId) {
      return { ...item, assignment: itemDetails.value.assignment };
    }
    return item;
  });
  localStorage.setItem('itemArr', JSON.stringify(updatedItemArr));

  openComment.value = false;

  message.success('done');


}
//任务详情
const assignmentData = ref(null)
//获取任务详情
const goAssignment = (item) => {
  assignmentData.value = item;
  showDetails.value = false;
}

//添加任务
const addOnFinish = (values) => {
  if (itemDetails.value && itemDetails.value.assignment) {
    values.comment = []
    values.assignmentId = Math.random().toString(36).substring(2);
    values.uploadImg = uploadImg.value

    itemDetails.value.assignment.push(values);
    //在总体项目中找到目标项目添加项目并更新
    const itemArr = JSON.parse(localStorage.getItem('itemArr')) || [];
    const updatedItemArr = itemArr.map(item => {
      if (item.itemId === itemDetails.value.itemId) {
        return { ...item, assignment: itemDetails.value.assignment };
      }
      return item;
    });
    localStorage.setItem('itemArr', JSON.stringify(updatedItemArr));
  }

  open.value = false;
  inquireItemDetails()

  message.success('done');

};

// 获取总体项目
const inquireItemDetails = () => {
  let itemArr = JSON.parse(localStorage.getItem('itemArr')) || [];
  itemDetails.value = itemArr.find(item => item.itemId === route.query.itemId);
}


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
}

onMounted(() => {
  inquireItemDetails()
});


</script>

<style lang="scss" scoped>


.index {
  background: #eff2fa;
  min-height: 100vh;
  .index-top { 
    padding: 0 24px;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: rgba(255, 255, 255, 0.7);
    border-bottom: 0.5px solid rgba(51, 51, 51, 0.1);

    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }


  }
 .comment{
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #dcdcdc;
   .comment-left{
     
        img{
           height: 50px;
           width: 50px;
           border-radius: 50%;
        }
      
   }
   .comment-right{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;



    span:nth-child(1){
       color: #445d8c;
    }
      
   }
 }
  .index-content {
    padding: 30px 50px;

    .index-content-box-1 {
      display: flex;
      flex-direction: column;

      .project-details-top {
        padding: 24px;
        height: 278px;
        width: 100%;
        border-radius: 24px;
        background: #fff;

        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;

        .cdt-left {
          border-radius: 24px;
          width: 354px;
          height: 230px;
        }

        .cdt-middle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0 20px;

          .cdtm-title {
            font-size: 30px;
            font-weight: bold;
          }

          .cdtm-brief-introduction {
            display: flex;
            align-items: center;

            img {
              height: 32px;
              width: 32px;
            }

            span {
              text-shadow: 0px 12px 24px rgba(53, 87, 244, 0.2);
              background-color: #445d8c;
              font-size: 20px;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            span:nth-child(2) {
              margin: 0 10px;
            }
          }

          .cdtm-time {
            display: flex;

            .cdtmt-item {
              color: #445d8c;
              font-size: 20px;
              margin-right: 20px;

              .cdtmti-laber {
                margin-top: 10px;
                height: 43px;
                background: url(@/assets/label.png) 100% no-repeat;
                background-size: 100% 100%;
                width: 261px;
                color: #fff;
                text-align: center;
                line-height: 43px;
              }
            }
          }
        }

        .cdt-right {
          display: flex;
          align-items: center;
          justify-content: center;

          .cdtr-bom {
            box-shadow: 0px 12px 24px 0px rgba(53, 87, 244, 0.2);
            background-color: #445d8c;
            border-radius: 12px;
            height: 78px;
            width: 286px;
            line-height: 78px;
            font-size: 20px;
            text-align: center;
            font-weight: bold;
            color: #fff;
            cursor: pointer;
          }
        }
      }

      .project-details-bom {
        min-height: 400px;
        padding: 24px;
        border-radius: 24px;
        background: #fafbfe;

        .cdb-title {
          display: flex;
          align-items: center;

          img {
            height: 32px;
            width: 32px;
            margin-right: 10px;
          }

          span {
            text-shadow: 0px 12px 24px rgba(53, 87, 244, 0.2);
            background-color: #445d8c;
            font-size: 20px;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .subcourse-box {
          margin-top: 24px;
          display: flex;
          flex-wrap: wrap;

          $margin-offset: 0 5%;

          @for $i from 1 through 100 {
            $index: $i % 3;

            div:nth-child(#{$i}) {
              @if $index ==1 or $index ==0 {}

              @else {
                margin: $margin-offset;
              }
            }
          }

          .subcourse-item {
            padding: 10px;
            width: 30%;
            height: 200px;
            background: #fff;
            border-radius: 12px 12px 12px 12px;
            border: 1px solid #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .subcourse-index {
              display: flex;
              justify-content: space-between;

              span:nth-child(1) {
                color: rgba(51, 51, 51, 0.4);
                font-size: 20px;
              }

              span:nth-child(2) {
                width: 63px;
                height: 77px;
                overflow-wrap: break-word;
                color: rgba(51, 51, 51, 0.1);
                font-size: 51px;
                font-family: Source Han Sans CN-Heavy;
                font-weight: 900;
                text-align: left;
                white-space: nowrap;
                line-height: 51px;
              }
            }

            .subcourse-title {
              font-size: 30px;
            }

            .subcourse-btn {
              display: flex;
              justify-content: space-between;

              div:nth-child(1) {
                width: 135px;
                height: 46px;
                line-height: 46px;
                text-align: center;
                color: #fff;
                cursor: pointer;
                background: #445d8c;
                box-shadow: 0px 12px 24px 0px rgba(53, 87, 244, 0.2);
                border-radius: 12px 12px 12px 12px;
              }
            }
          }
        }
      }
    }

  }
}
</style>
