<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';


    let RageList = ['(╯°□°)╯︵ ┻━┻ ┻━┻', '┬─┬ノ( º _ ºノ)', '(┛ಠ_ಠ)┛彡┻━┻', '(╯°□°）╯︵ ┬─┬'];
    
    let chosenRage = writable(RageList[Math.floor(Math.random() * RageList.length)]);
</script>

{#if $page.error}
	<h1>{$page.error.message} {$chosenRage}</h1>
{:else}
    <h1>Unknown Error
        {$chosenRage}
    </h1>
{/if}

<p></p>


<style>
	h1 {
		position: relative;
        align-items: center;
        justify-content: center;
        font-family: JetBrainsMono-Italic, monospace;
		font-weight: bold;
		font-size: 3rem;
		padding: 2.5rem;

		color: #000;
		text-decoration: none;
		background-color: red;
		border: 2px solid #000;
	}
</style>
