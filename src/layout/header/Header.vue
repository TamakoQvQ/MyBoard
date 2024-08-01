<template>
  <div class="header-bg">
    
    <Collapse></Collapse>

    <div>
      <img @click="quit" src="@/assets/quit.png" alt="">
    </div>

  </div>

</template>

<script setup>
import Collapse from './Collapse.vue'
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue'; 
import { Api } from '@/assets/api';

import { ref, nextTick } from 'vue';

const router = useRouter()

const quit = async () => {

  router.push('/'); // 使用router进行页面跳转

}


</script>
<style lang="scss" scoped>
.ant-modal-title {
  box-shadow: 0px 12px 24px 0px rgba(53, 87, 244, 0.2);
  background-color: #445d8c;
  border-radius: 6px;
  height: 32px;
  width: 87px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  margin-right: 2px;
  font-size: 18px;
  font-weight: bold;
}

.header-bg {
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  height: 30px;
  width: 30px;
  cursor: pointer;
  float: right;
  margin-left: 30px;
}
</style>
