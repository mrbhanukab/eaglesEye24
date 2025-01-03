# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a
development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target
> environment.

# Changelog

- Now on Browser will take care of caching

Checking Stuff

- +error.svelte | [✅|🖥️|📱]
- +page.svelte | [✅|🖥️|📱]
    - Add User Checking Before Page Load
    - Add New Loading Method
- mainLayout.svelte | [✅|🖥️|📱]
    - statically host logos.json
- /user/login | [✅|🖥️|📱]
    - Logged User can't Re-login | ✅
    - Add New Loading Method
    - Fix CSS and Now Mobile Responsive
- /user/NewUser
    - Logged User can't Recreate account | ✅
    - Add New Loading Method
    - Fix CSS and Now Mobile Responsive
    - Currently Here Still Use Client For Databse, will fix in next update

- [x] Fix /watch Problem
- [x] Fix loading
- [x] Fix postponed

```sveltehtml
<!--<body data-sveltekit-preload-data="hover" style="margin: 0; padding: 0; background-color: #f0f0f0; color: #333; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; font-family: 'Comfortaa', sans-serif;">-->
<!--<h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Site Under Construction 🚧</h1>-->
<!--<p style="font-size: 1.2rem; margin-bottom: 0.5rem;">We are currently working on some improvements. Please check back-->
<!--	later.</p>-->
<!--<p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Thank you for your patience!</p>-->
```