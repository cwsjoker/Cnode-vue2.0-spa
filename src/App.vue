<template>
	<div>
		<H2>请等待</H2>
	</div>
</template>
<script>
	export default {
		mounted() {
			setTimeout(() => {
				this.$router.push({name : 'articleList'});
			}, 1000);
		}
	}
</script>