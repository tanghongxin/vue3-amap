<template>
  <a-layout id="page-view">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="/manage">
          <router-link to="/manage">
            <border-outer-outlined />
            <span>电子围栏</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header>
        <a-flex justify="space-between" :vertical="false">
          <component
            :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'" class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <GithubOutlined
            class="trigger"
            @click="openRepo"
          />
        </a-flex>
      </a-layout-header>

      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  BorderOuterOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GithubOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageView',
  components: {
    BorderOuterOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    GithubOutlined,
  },

  setup() {
    return {
      selectedKeys: ref(['/manage']),
      collapsed: ref(false),
      openRepo() {
        window.open(import.meta.env.VITE_GITHUB_REPO, '_blank');
      },
    };
  },
});
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

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
}
</style>
