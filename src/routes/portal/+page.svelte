<script>
  import './potral.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/AppWrite/user.js';
  import Loading from '$lib/UI/loading.svelte';
  import { webAppDB } from '$lib/AppWrite/database.js';
  import { WebApp } from '$lib/AppWrite/storage.js';

  let logos = null;
  let currentUser = null;
  let isCacheComplete = false;
  let cachedUrls = {};
  let archived = [];
  let upcoming = [];
  let notFixed = [];
  let now;
  let imgSrc;
  let isLoading = true;

  async function fetchData() {
    currentUser = await user.getUser();
    if (currentUser == null) await goto('/');
    if (!currentUser.status) await goto('/');
  }

  function formatDateTime(dateTime, endDate, youtube) {
    now = new Date();
    if (!dateTime) {
      return 'Not Fixed';
    }
    const start = new Date(dateTime);
    const end = endDate ? new Date(endDate) : null;
    if (start <= now && (!end || end >= now)) {
      return `<a href="/watch/${youtube}" style="color: #ff6363">Watch Live 📺</a>`;
    }
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = start.toLocaleDateString('en-US', options);
    const formattedTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${formattedDate} | ${formattedTime}`;
  }

  function toUTC(dateString) {
    return new Date(dateString).toISOString();
  }

  async function fetchDataAndSort() {
    try {
      const currentTime = new Date().toISOString();
      const response = await webAppDB.aetosPath();
      const items = response.documents;

      archived = items.filter(item => {
        const endDate = item.end ? toUTC(item.end) : null;
        return endDate && endDate < currentTime;
      });

      upcoming = items.filter(item => {
        const endDate = item.end ? toUTC(item.end) : null;
        return endDate && (endDate >= currentTime);
      });

      notFixed = items.filter(item => item.start == null);

      archived.sort((a, b) => {
        const dateA = toUTC(a.start);
        const dateB = toUTC(b.start);
        return new Date(dateA) - new Date(dateB);
      });

      upcoming.sort((a, b) => {
        const dateA = toUTC(a.start || a.$createdAt);
        const dateB = toUTC(b.start || b.$createdAt);
        return new Date(dateA) - new Date(dateB);
      });

      notFixed.sort((a, b) => {
        const dateA = toUTC(a.$createdAt);
        const dateB = toUTC(b.$createdAt);
        return new Date(dateA) - new Date(dateB);
      });

      const fileId = upcoming[0]?.Image || notFixed[0]?.Image;
      if (fileId) {
        imgSrc = await WebApp.getFile(fileId);
        console.log(imgSrc);
      }
      isLoading = false;
    } catch (error) {
      console.error('Error fetching or sorting data:', error);
    }
  }

  onMount(() => {
    fetchData();
    fetchDataAndSort();
  });

  const logout = async () => {
    await user.logout();
    console.log('Logged out');
    await goto('/');
  };

  function handleCacheComplete(event) {
    isCacheComplete = true;
    cachedUrls = event.detail.cachedUrls;
    fetch(cachedUrls['logos.json'])
      .then(response => response.json())
      .then(data => {
        logos = data;
      });
  }
</script>

{#snippet subComponent(className, styles, title)}
  <div class="subComponent {className}" style="{styles}">
    <h1>{title}</h1>
    <div class="content">
      <div class="teamInfo">
        <h2>Isipathana College Team A</h2>
        <ol>
          <li>Member Member Member1 Member1ed</li>
          <li>Member Member 2</li>
          <li>Member Member 3</li>
          <li>Member Member 4</li>
          <li>Member Member 1</li>
          <li>Member 1</li>
        </ol>
      </div>
      <div class="eventInfo"></div>
    </div>
  </div>
{/snippet}

<svelte:head>
  <title>EaglesEye24 | Portal</title>
</svelte:head>

{#if !isCacheComplete}
  <Loading on:cacheComplete={handleCacheComplete} />
{:else}
  <div class="container">
    <section class="component aetos" style="margin-left: 0.8vw">
      <h1 id="head">Aetos Path</h1>
      <div class="latestLecture" style="background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0.30) 80.5%),url({imgSrc}) lightgray 50% / cover no-repeat;">
        <div class="lectureInfo">
          <div class="info">
            <h1>{upcoming[0]?.Title ?? notFixed[0]?.Title ?? "No Title"}</h1>
            <h6>{upcoming[0]?.lecture ?? notFixed[0]?.lecture ?? "Unknown Lecturer"}</h6>
          </div>
          <div class="dateOrLink">
            {#if upcoming[0] && new Date(upcoming[0].start) <= now && (!new Date(upcoming[0].end) || new Date(upcoming[0].end) >= now)}
              <a href="/watch/{upcoming[0].youtube}">
                <h1>▶</h1>
                <h6>Watch Live</h6>
              </a>
{:else if upcoming[0]}
  <h1>{new Date(upcoming[0].start).getDate() ?? "--"}</h1>
  <h6>{new Date(upcoming[0].start).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }) ?? "Not Fixed"}</h6>
{:else}
  <h1>--</h1>
  <h6>Not Fixed</h6>
{/if}
</div>
        </div>
      </div>
      <div class="lectureTable">
        <h2>Upcoming Lectures</h2>
        <table>
          <tbody>
            {#each archived as lecture}
              <tr>
                <td class="lectureTitle">{lecture.Title}</td>
                <td class="lectureLecturer">by <span>{lecture.lecture}</span></td>
                <td class="lectureDate"><a href="/watch/{lecture.youtube}">Watched Recording</a></td>              </tr>
            {/each}
            {#each upcoming as lecture}
              <tr>
                <td class="lectureTitle">{lecture.Title}</td>
                <td class="lectureLecturer">by <span>{lecture.lecture}</span></td>
                <td class="lectureDate">{@html formatDateTime(lecture.start, lecture.end, lecture.youtube)}</td>
              </tr>
            {/each}
            {#each notFixed as lecture}
              <tr>
                <td class="lectureTitle">{lecture.Title}</td>
                <td class="lectureLecturer">by <span>{lecture.lecture}</span></td>
                <td class="lectureDate">Not Fixed</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
    <section class="right" style="margin-right: 0.8vw">
      <div class="component aetosMindAndXploratus">
        {@render subComponent("aetosMind", "margin-top: 1.2vh", "Aetos Mind")}
        {@render subComponent("Xploratus", "margin-bottom: 1.2vh", "Xploratus")}
      </div>
      <header class="header">
        <div class="component eventLogo">
          <h1>Eagles Eye '24 |</h1>
          <span class="collaboration">
            <h2>collaboration with<br /> <span>Sri Lanka Air Force</span></h2>
            <img src={`data:image/png;base64, ${logos?.airForce}`} alt="air force logo" draggable="false" />
            <img class="icacLogo" src={`data:image/png;base64, ${logos?.icac}`} alt="ICAC logo" draggable="false" />
          </span>
        </div>
        <footer class="component user">
          <img style="width: 3.5vw; height: fit-content;" src="data:image/png;base64,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" alt="user-male-circle">
          <div class="userInfo">
            <h3>{currentUser?.name ?? "Your Name"}</h3>
            <p>{currentUser?.email ?? "you@email.com"}</p>
          </div>
          <img onclick={logout} style="width: 1.5vw; height: fit-content;" class="logout" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO3aO05DMRBGYUNBiwQtG0FZGG0aXjvJCmgQC6AIUNDR5rKNE01kikjJlSfRDf+MfHpL88nJfckFuACegV90GoBHm620Bjyh24MHYnrrtogEzOpMg2fRpiIW3rk6ZOLoOyIWfUfEAu5SXLUsYF4yQFx1yIQBC+AFuAz90wKWdaz3Zowo5Ab4qaMZ6iok5CCMKmQH5mMUowxxYdQhezDXJSKkCRMFsgPzuYWJBBnFRIPsxRwDAc6AL/6/5bGQ8/rHiw1J89OSugwTCMLYvSQKhAw3RFqet9QhtD7OK0PwvJOoQsjwYkWWV13gO8vHhzfgNfznoIPqkBNEho/YwNw1lzBk03QLThTeuTpk4ug7kmBHhrpmVvQO1aw8i+xclGr3HogdPDPM384otDKE5+DZGhon/IxufD43AAAAAElFTkSuQmCC" alt="exit--v1">
        </footer>
      </header>
    </section>
  </div>
{/if}