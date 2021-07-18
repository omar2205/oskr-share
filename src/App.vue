<template>
  <van-nav-bar
    title="oskr share"
    v-if="route.path === '/'"
    @click-right="state.toggleShowAddItem"
    fixed
  >
    <template #right><van-icon name="plus" /></template>
  </van-nav-bar>
  <van-nav-bar
		title="oskr share" 
		v-if="route.path !== '/'"
    left-arrow
    left-text="Back"
    @click-left="goBack"
	/>
  <div class="padding"></div>
  <router-view v-bind="stateRef"></router-view>
  <div class="padding"></div>
</template>

<script setup>
	import { reactive, toRefs } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
  import { NavBar } from 'vant'

	const state = reactive({
		showAddItem: false,
		toggleShowAddItem: () => state.showAddItem = !state.showAddItem
	})

	const stateRef = toRefs(state)

	const route = useRoute()
	const router = useRouter()

	const goBack = () => { 
		if (router.currentRoute.value.name === 'NotFound') {
			router.push('/')
		} else {
			router.back()
		}
	}
</script>

<style>
body {
  background-color: #f7f8fa;
  height: 100vh;
}
.padding {
padding: 2rem 0;
}
</style>
