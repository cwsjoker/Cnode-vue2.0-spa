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
			'nv-header' : nvHeader,
			'article-list' : articleList
		}
	}
</script>