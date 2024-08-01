<template>

    <component :is="isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined" @click="clickBtn" class="icons"  />
  
  </template>
  
  <script setup>

  import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons-vue';
  import { collapseStore } from '@/store/collapse';
  import { computed } from 'vue';
  
  const store = collapseStore();
  const isCollapse = computed(() => store.isCollapse);
  
  const clickBtn = () => {
    console.log('111');
    
       store.setCollapse();
  }
  
  </script>
<style lang="scss" scoped>
.icons {
    font-size: 21px;
    color: #445d8c;
}
</style>
