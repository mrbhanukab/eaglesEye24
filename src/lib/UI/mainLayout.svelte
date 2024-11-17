<script>
	import ColorThief from 'colorthief';

	const props = $props();
	let backgroundColor = $state('#ffffff');

	function updateBackgroundColor() {
		if (typeof window !== 'undefined') {
			const img = new Image();
			img.crossOrigin = 'Anonymous';
			img.src = props.imgSrc;
			img.onload = () => {
				const colorThief = new ColorThief();
				const palette = colorThief.getPalette(img, 5);
				const mostUsedColor = palette[0];
				const leastUsedColor = palette[palette.length - 1];
				backgroundColor = `rgb(${mostUsedColor[0]}, ${mostUsedColor[1]}, ${mostUsedColor[2]}) radial-gradient(circle at bottom left, rgba(${leastUsedColor[0]}, ${leastUsedColor[1]}, ${leastUsedColor[2]},0.4), rgb(${mostUsedColor[0]}, ${mostUsedColor[1]}, ${mostUsedColor[2]}) 40%)`;
			};
			img.onerror = (e) => {
				console.log(e);
			};
		}
	}

	$effect(() => updateBackgroundColor());
</script>

<style>
    .container {
        display: flex;
        flex-direction: row;
        height: 100vh;
        width: 100vw;
        background: var(--background-color);
    }

    .split {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        position: relative;
    }

    .left {
        padding: 1rem;
        flex: 5;
        position: relative;
    }

    .left img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
    }

    .onImage {
        position: absolute;
        width: 90%;
        top: 0;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 1rem 0;
    }

    .logo {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .onImage .content {
        margin-top: 5rem;
    }

    .right {
        flex: 6;
    }
</style>

<div class="container" style="background: {backgroundColor}">
	<section class="split left">
		<div class="onImage">
			<header>
				<h1>Eagles Eye '24</h1>
				<div class="logo">
					<img src="https://img.icons8.com/color/50/apple-settings.png">
					<img src="https://img.icons8.com/color/50/apple-settings.png">
				</div>
			</header>
			<div class="content">
				{@render props.aboveImage()}
			</div>
		</div>
		<img src={props.imgSrc} alt={props.alt} draggable="false" />
	</section>

	<section class="split right">
		{@render props.right()}
	</section>
</div>