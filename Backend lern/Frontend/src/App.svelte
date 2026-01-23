<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import { onMount } from 'svelte';
  import axios from 'axios';
  let joke = null;

  onMount(async () => {
    const response = await axios.get('/api/jokes');
    joke = response.data[1].joke;
  });
</script>
<div>say hello to abhi</div>
{#if joke}
  <p>Joke: {joke}</p>
{:else}
  <p>Loading joke...</p>
{/if}

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
