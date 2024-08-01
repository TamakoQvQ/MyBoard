<template>
  <menu-logo></menu-logo>
  <a-menu v-model:openKeys="menuData.openKeys" v-model:selectedKeys="menuData.selectedKeys" mode="inline" theme="light"
    :inline-collapsed="menuData.collapsed">

    <a-menu-item key="/inbox">
      <template #icon>
        <InboxOutlined />
      </template>
      <router-link to="/inbox">项目</router-link>
    </a-menu-item>


    <a-menu-item key="/personalCenter">
      <template #icon>
        <UserOutlined />
      </template>
      <router-link to="/personalCenter">个人中心</router-link>
    </a-menu-item>


  </a-menu>
</template>
<script setup>
import { reactive, watchEffect } from 'vue';
import MenuLogo from './MenuLogo.vue';


const menuData = reactive({
  collapsed: false,
  selectedKeys: [localStorage.getItem('selectedKeys') || '/inbox'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});

watchEffect(() => {

  localStorage.setItem('selectedKeys', menuData.selectedKeys);
});

</script>


<style>
:where(.css-dev-only-do-not-override-19iuou).ant-menu-light .ant-menu-item-selected {
  background: #445d8c;
}
:where(.css-dev-only-do-not-override-19iuou).ant-menu-light .ant-menu-item-selected {
    color: #fff;
}
</style>