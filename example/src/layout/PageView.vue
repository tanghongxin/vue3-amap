<template>
  <a-layout id="page-view">
    <a-layout>
      <a-layout-header>
        <a-row class="h-100">
          <a-col :flex="1">
            <a-menu
              :selected-keys="[route.path]"
              class="ml-8"
              mode="horizontal"
            >
              <a-menu-item :key="RouteEnum.MANAGE">
                <router-link :to="RouteEnum.MANAGE">
                  <border-outer-outlined />
                  <span>围栏管理</span>
                </router-link>
              </a-menu-item>

              <a-menu-item :key="RouteEnum.PREVIEW">
                <router-link :to="RouteEnum.PREVIEW">
                  <eye-outlined />
                  <span>围栏预览</span>
                </router-link>
              </a-menu-item>

              <a-menu-item
                v-if="route.path === RouteEnum.FENCE_ADD"
                :key="RouteEnum.FENCE_ADD"
              >
                <router-link :to="RouteEnum.FENCE_ADD">
                  <plus-outlined />
                  <span>新建围栏</span>
                </router-link>
              </a-menu-item>

              <a-menu-item
                v-if="route.path === RouteEnum.FENCE_EDIT"
                :key="RouteEnum.FENCE_EDIT"
              >
                <router-link :to="RouteEnum.FENCE_EDIT">
                  <edit-outlined />
                  <span>编辑围栏</span>
                </router-link>
              </a-menu-item>
            </a-menu>
          </a-col>

          <a-col>
            <GithubOutlined class="trigger" @click="openRepo" />
          </a-col>
        </a-row>
      </a-layout-header>

      <a-layout-content>
        <router-view v-slot="{ Component }">
          <transition name="transition-fade" mode="out-in">
            <keep-alive :include="['Manage']">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {
  BorderOuterOutlined,
  GithubOutlined,
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { RouteEnum } from '@/router/enum';

const route = useRoute();
const openRepo = () => window.open(import.meta.env.VITE_GITHUB_REPO, '_blank');
</script>

<style lang="less">
#page-view {
  width: 100vw;
  height: 100vh;

  .ant-layout-header {
    background: #fff;
    padding: 0;
  }

  .ant-layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
    overflow: hidden;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
