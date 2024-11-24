<script>
    import { onMount, createEventDispatcher } from 'svelte';

    const filesToCache = [
        { name: 'aetos-mind.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e1400024238213f/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
        { name: 'aetos-path.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e26002163de97f3/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
        { name: 'newUser.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e33003dbffe0e4c/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
        { name: 'verify.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e4100376276f370/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
        { name: 'xploratus.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e58000c5d70ccc5/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
        { name: 'logos.json', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433d90001d87767130/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' }
    ];

    const CACHE_MAX_AGE = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
    const dispatch = createEventDispatcher();

    async function cacheFiles() {
        const cache = await caches.open('file-cache');
        const cachedUrls = {};

        for (const file of filesToCache) {
            const cachedResponse = await cache.match(file.url);
            if (cachedResponse) {
                const dateHeader = cachedResponse.headers.get('date');
                if (dateHeader) {
                    const cachedTime = new Date(dateHeader).getTime();
                    const currentTime = Date.now();
                    if (currentTime - cachedTime < CACHE_MAX_AGE) {
                        cachedUrls[file.name] = file.url;
                        continue; // Cache is still valid
                    }
                }
            }

            // Fetch and cache the file
            const response = await fetch(file.url);
            if (response.ok) {
                await cache.put(file.url, response);
                cachedUrls[file.name] = file.url;
            } else {
                console.error(`Failed to fetch ${file.url}`);
            }
        }

        return cachedUrls;
    }

    onMount(async () => {
        const cachedUrls = await cacheFiles();
        dispatch('cacheComplete', { cachedUrls });
    });
</script>
<style>
    .container {
        z-index: 9999;
        margin: 0;
        padding: 0;
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: rgb(35, 50, 64);
    }

    .page {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .folder {
        background-color: rgb(105, 155, 172);
        position: relative;
        width: 92px;
        height: 64px;
        display: block;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    .folder-tab {
        position: absolute;
        height: 10px;
        left: 0;
        bottom: 100%;
        display: block;
        width: 40%;
        border-top-left-radius: 8px;
        background-color: inherit;
    }
    .folder-tab:after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: calc(100% - 10px);
        border-bottom: 10px solid rgb(105, 155, 172);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
    }

    .folder-icn {
        padding-top: 12px;
        width: 100%;
        height: 100%;
        display: block;
    }

    .downloading {
        width: 30px;
        height: 32px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }

    .custom-arrow {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -7px;
        background-color: #fff;
        animation: downloading 1.5s infinite;
    }
    .custom-arrow:after {
        content: '';
        position: absolute;
        display: block;
        top: 100%;
        left: -9px;
        border-top: 15px solid #fff;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
    }

    .bar {
        width: 30px;
        height: 4px;
        background-color: #fff;
        margin: 0 auto;
    }

    @keyframes downloading {
        0% {
            top: 0;
            opacity: 1;
        }
        50% {
            top: 110%;
            opacity: 0;
        }
        52% {
            top: -110%;
            opacity: 0;
        }
        100% {
            top: 0;
            opacity: 1;
        }
    }

    @media (max-width: 600px) {
        .folder {
            width: 70px;
            height: 50px;
        }

        .custom-arrow {
            width: 10px;
            height: 10px;
        }

        .bar {
            width: 20px;
            height: 3px;
        }
    }
</style>

<div class="container">
    <div class="page">
        <div class="folder">
            <span class="folder-tab"></span>
            <div class="folder-icn">
                <div class="downloading">
                    <span class="custom-arrow"></span>
                </div>
                <div class="bar"></div>
            </div>
        </div>
    </div>
</div>