<template>

    <div class="logo">
        <AreaChartOutlined style="font-size: 30px;margin-right: 10px;" />
        <span v-show="!collapsed" class="title">MyBoard</span>
    </div>


</template>

<script setup>

import { collapseStore } from '@/store/collapse';

import { computed } from 'vue';

const store = collapseStore();

const collapsed = computed(() => {
    return store.getCollapse
});
</script>

<style lang="scss" scoped>
.logo {
    background: rgba(255, 255, 255, 0.7);    
    height: 50px;
    border: none;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 18px;
    color: #445d8c;

    .title {
        height: 50px;
        background: rgba(255, 255, 255, 0.7);
                text-align: center;
        box-sizing: border-box;
        font-weight: 600;
        line-height: 50px;
        font-size: 20px;
        vertical-align: middle;
        color:  #445d8c;
    }
}
</style>
