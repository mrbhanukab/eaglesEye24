<script>
  import { onMount } from 'svelte';
  import ColorThief from 'colorthief';
  import { mostUsedColor, leastUsedColor } from '../../stores/colors.svelte.js';

  let logos = $state(null);

  async function fetchLogos() {
    const cache = await caches.open('file-cache');
    const cachedResponse = await cache.match('https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433d90001d87767130/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85');
    if (cachedResponse) {
      logos = await cachedResponse.json();
    } else {
      console.error('logos.json not found in cache');
    }
  }

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
        mostUsedColor.set(palette[0]);
        leastUsedColor.set(palette[palette.length - 1]);
        backgroundColor = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}) radial-gradient(327.27% 131.21% at 0% 100%, rgba(${palette[palette.length - 1][0]}, ${palette[palette.length - 1][1]}, ${palette[palette.length - 1][2]},0.4) 0%, rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}) 53.36%);
        `;
      };
      img.onerror = (e) => {
        console.log(e);
      };
    }
  }

  onMount(() => {
    fetchLogos();
  });

  $effect(() => updateBackgroundColor());
</script>

<div class="container" style="background: {backgroundColor}">
  <section class="split left">
    <div class="onImage" style="background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0.30) 80.5%),url({props.imgSrc}) lightgray 50% / cover no-repeat;">
      <header>
        <div class="eventLogo">
          <h1>Eagles Eye '24 |</h1>
          <span class="collaboration">
            <h2>collaboration with<br /> <span>Sri Lanka Air Force</span></h2>
            <img src={`data:image/png;base64, ${logos?.airForce}`} alt="air force logo" draggable="false" />
          </span>
        </div>
        <img class="icacLogo" src={`data:image/png;base64, ${logos?.icac}`} alt="ICAC logo" draggable="false" />
      </header>
      <div class="content">
        {@render props.aboveImage()}
      </div>
    </div>
  </section>
  <section class="split right">
    {@render props.right()}
  </section>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
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
    flex: 5;
    position: relative;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
  }

  .onImage {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 97%;
    height: 97%;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 1rem;
    padding: 1rem;
    margin: 5rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .eventLogo {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
  }

  .eventLogo h1 {
    text-shadow: 0 0 50px #000;
    font-family: Lexend, sans-serif;
    font-size: 1.6vw;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .collaboration {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
  }

  .collaboration h2 {
    color: white;
    font-family: Comfortaa, sans-serif;
    font-size: 0.45vw;
    font-style: normal;
    font-weight: 300;
    line-height: 200%;
    text-transform: capitalize;
  }

  .collaboration h2 span {
    font-size: 0.65vw;
    font-style: normal;
    font-weight: 700;
    line-height: 10px;
  }

  .collaboration img {
    width: auto;
    height: 2.3vw;
    margin-left: 0.3rem;
    flex-shrink: 0;
  }

  .icacLogo {
    max-width: 5.8vw !important;
    height: auto !important;
    object-fit: contain;
  }

  .content {
    margin-top: 5rem;
  }

  .right {
    flex: 6;
    height: 100%;
  }

  @media (max-width: 450px), (max-height: 350px) {
    .eventLogo h1 {
      font-size: 4vw;
    }

    .collaboration h2 {
      font-size: 1vw;
    }

    .collaboration h2 span {
      font-size: 1.8vw;
    }

    .collaboration img {
      width: 5vw;
      height: auto !important;
    }

    .icacLogo {
      max-width: 12vw !important;
    }

    .container {
      flex-direction: column;
      min-height: 100vh !important;
    }

    .left {
      flex: 3 !important;
    }

    .right {
      flex: 2 !important;
    }
  }
</style>