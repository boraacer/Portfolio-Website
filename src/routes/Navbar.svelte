<script lang="ts">
	export let sections: string[]; // Explicitly specify the type of the sections variable
	export let activeTab: string = 'Home';
	export let switchTab: (tab: string) => void; // Function to switch tabs
	let isNavOpen = false; // Default to closed (for mobile)

	// Run this once on component initialization
	if (typeof window !== 'undefined') {
		isNavOpen = window.innerWidth >= 768; // Set to true if width is 768px or more (typically tablet and above)
		// Add an event listener to the window object that listens for the resize event
        window.addEventListener('resize', () => {
            isNavOpen = window.innerWidth >= 768;
        });
	}

	// Function to handle tab clicks
	function handleTabClick(tab: string): void {
		switchTab(tab);
		isNavOpen = window.innerWidth >= 768;
		console.log(`Switched to ${tab}`);
	}

	// Function to toggle the nav state
	function toggleNav(): void {
		isNavOpen = !isNavOpen;
		console.log(`Nav is ${isNavOpen ? 'open' : 'closed'}`);
	}
</script>

<nav class="navbar">
	<div class="navbar-header">
		<button class="navbar-toggle" on:click={toggleNav}>
			<span class="navbar-toggle-icon" />
		</button>
	</div>
	<div class="navbar-collapse" style="display: {isNavOpen ? 'flex' : 'none'}">
		{#each sections as section (section)}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" class:active={activeTab === section} on:click={() => handleTabClick(section)}
				>{section}</a
			>
		{/each}
	</div>
</nav>

<style>
	/* Your navbar styles... */

	.navbar {
		justify-content: space-between;
		align-items: center;

		background-color: rgba(0, 0, 0, 1); /* Semi-transparent black */
		padding: 1rem;
		max-width: 1000px; /* Set the width limit here */
		margin: 0 auto 2rem auto; /* Added space below the navbar */
		border-radius: 15px; /* Rounded edges */
		font-family: 'Orbitron', sans-serif; /* Using Orbitron font for the navbar */
		z-index: 10; /* Ensures the navbar is above other elements */
		position: relative;
	}

	.navbar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.navbar-toggle {
		display: none; /* Hide the toggle button by default */
		background-color: transparent;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.navbar-toggle-icon {
		display: block;
		width: 1.5rem;
		height: 1.5rem;
		background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"%3E%3Cpath stroke="%230df2c9" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"/%3E%3C/svg%3E');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
	}

	.navbar-collapse {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.navbar-collapse a {
		color: #0df2c9; /* Neon cyan color */
		text-decoration: none; /* Remove underline */
		margin: 0 1rem; /* Add space between links */
		font-size: 1.2rem; /* Increase font size */
		font-weight: bold; /* Make font bold */
		cursor: pointer; /* Change cursor to pointer on hover */
		transition: color 0.2s ease-in-out; /* Add color transition on hover */
	}

	.navbar-collapse a:hover {
		color: #fff; /* Change color on hover */
	}

	/* Media query for small screens */
	@media (max-width: 768px) {
		.navbar-collapse {
			display: none; /* Hide the nav links by default */
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			background-color: rgba(0, 0, 0, 1); /* Semi-transparent black */
			padding: 1rem;
			border-radius: 15px; /* Rounded edges */
			font-family: 'Orbitron', sans-serif; /* Using Orbitron font for the navbar */
			z-index: 10; /* Ensures the navbar is above other elements */
		}

		.navbar-toggle {
			display: block; /* Show the toggle button */
		}

		.navbar-collapse {
			display: flex;
			flex-direction: column;
			position: relative; /* Add relative positioning */
		}

		.navbar-collapse a {
			margin: 1rem 0; /* Add space between links */
			position: relative; /* Add relative positioning */
		}
	}
	a::after {
		content: '';
		display: block;
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
