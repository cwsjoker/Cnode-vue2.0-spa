<template>
	<div>
		<nv-header></nv-header>
		<article-list></article-list>
	</div>
</template>
<script>
	import nvHeader from './components/header.vue';
	import articleList from './vue/articleList.vue';
	export default {
		components : {
			nvHeader,
			articleList
		}
	}
</script>