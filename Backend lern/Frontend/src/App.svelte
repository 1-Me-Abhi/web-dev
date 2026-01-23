<script>
  import axios from 'axios';
  let names = [];

  async function fetchName() {
    const response = await axios.get('/api/Name');
    names = response.data;
  }
</script>
<div class="title"><h1>Name Api</h1></div>

<button on:click={fetchName}>Fetch Name</button>

{#if names.length > 0}
  <ul>
    {#each names as name}
      <li>{name}</li>
    {/each}
  </ul>
{/if}

<style>
  .title {
    text-align: center;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    padding: 5px 0;
    font-size: 18px;
  }
</style>
