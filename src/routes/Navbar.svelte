<script lang="ts">
  export let sections: string[]; // Explicitly specify the type of the sections variable
  export let switchTab: (tab: string) => void; // Function to switch tabs
  
  // Function to handle tab clicks
  function handleTabClick(tab: string): void {
    switchTab(tab);
  }
</script>



<nav class="navbar">
	{#each sections as section (section)}
	  <!-- svelte-ignore a11y-invalid-attribute -->
	  <a href="#" on:click={() => handleTabClick(section)}>{section}</a>
	{/each}
  </nav>

<style>
	/* Your navbar styles... */

	.navbar {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
		padding: 1rem;
		max-width: 1000px; /* Set the width limit here */
		margin: 0 auto 2rem auto; /* Added space below the navbar */
		border-radius: 15px; /* Rounded edges */
		font-family: 'Orbitron', sans-serif; /* Using Orbitron font for the navbar */
		z-index: 10; /* Ensures the navbar is above other elements */
		position: relative;
	}

	a {
		color: #0df2c9; /* Neon cyan color */
		margin: 0 1rem;
		text-decoration: none;
		font-size: 1.2rem; /* Optionally, adjust font size for better readability */
		position: relative; /* Required for positioning ::after pseudo-element */
		cursor: pointer; /* Change cursor to pointer for better UX */
	}

	a::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px; /* Line height when not hovering */
		background-color: #0df2c9; /* Neon cyan color for the line */
		transform: scaleX(0); /* Initially hidden */
		transform-origin: 0 50%;
		transition: transform 0.3s ease-in-out; /* Add a transition effect */
	}

	a:hover::after {
		transform: scaleX(1); /* Fully visible line on hover */
	}
</style>
