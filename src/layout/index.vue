<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" class="asside"><menu-bar></menu-bar></a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <Header></Header>
      </a-layout-header>
      <a-layout-content class="main">

        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>


</template>


<script setup>

import MenuBar from './menu/MenuBar.vue';
import Header from './header/Header.vue'

import { collapseStore } from '@/store/collapse';
import { computed } from 'vue';

const store = collapseStore();

const collapsed = computed(() => {
  return store.getCollapse
});


</script>

<style scoped lang="scss">
.layout {
  height: 100%;

  .asside {
    background: #fff;
    border-right: 1px solid #f0f0f0 !important;
  }

  .header {
    height: 50px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.7);
    border: 0.5px solid rgba(51, 51, 51, 0.1);
  }

  .main {
    padding: 20px !important;
    height: calc(100vh - 50px - 40px);
    overflow: auto;
    background: url(@/assets/bg.png) 100% no-repeat;
    background-size: 100% 100%;
  }
}
</style>