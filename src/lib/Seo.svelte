<script>
	const props = $props();
</script>

<svelte:head>
	<meta content="EaglesEye24 | {props.title}" name="title">
	<title>EaglesEye24 | {props.title}</title>
	<meta
		content="{props.description}"
		name="description" />

	<meta content="en_US" property="og:locale" />
	<meta content="website" property="og:type" />
	<meta content="EaglesEye24 | {props.title}" property="og:title" />
	<meta content="{props.description}" property="og:description" />
	<meta content="https://eagles-eye24.vercel.app{props.url}" property="og:url" />
	<meta content="EaglesEye24" property="og:site_name" />
	<meta content="https://eagles-eye24.vercel.app/poster.jpeg"
				property="og:image" />
	<meta content="https://eagles-eye24.vercel.app/poster.jpeg"
				property="og:image:secure_url" />
</svelte:head>