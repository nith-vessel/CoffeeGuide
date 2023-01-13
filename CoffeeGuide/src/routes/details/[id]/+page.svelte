<script lang="ts">
  import type { PageServerData } from "./$types";
  export let data: PageServerData;
</script>

<!-- TODO: typesafety issue -->
<article>
  <header>
    <ul />
    <h2>{data.coffee.name}</h2>
  </header>

  <blockquote>
    {data.coffee.description}
  </blockquote>
</article>
