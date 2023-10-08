<script lang="ts">
	import { onMount } from 'svelte';

	import Navbar from './Navbar.svelte';
	import Home from './Home.svelte';
	import About from './About.svelte';
	import Projects from './Projects.svelte';
	import Contact from './Contact.svelte';

	let x = 0;
	let y = 0;

	function handleMouseMove(event: MouseEvent) {
		x = event.clientX;
		y = event.clientY;
		document.body.style.setProperty('--x', `${x}px`);
		document.body.style.setProperty('--y', `${y}px`);
	}

	const sections: string[] = ['Home', 'Projects', 'About Me', 'Contact'];
	let activeTab: string = sections[0]; // Initialize the active tab

	// Function to handle tab switching
	function switchTab(tab: string): void {
		activeTab = tab;
	}
</script>

<link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet" />
<link
	href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
	rel="stylesheet"
/>

<body
	on:mousemove={handleMouseMove}
	role="presentation"
	aria-label="Background visual effect responds to mouse movement"
>
	<div class="hue" />
	<div class="title fade-in">Bora Acer's Portfolio</div>
	<!-- Apply fade-in -->
	<Navbar {sections} {switchTab} />
	<div class="container">
		{#if activeTab === 'About Me'}
			<About />
		{/if}
		{#if activeTab === 'Projects'}
			<Projects />
		{/if}
		{#if activeTab === 'Contact'}
			<Contact />
		{/if}
		{#if activeTab === 'Home'}
			<Home />
		{/if}
		<!-- Cond
		<!-- Conditional rendering of content based on the activeTab -->
	</div>
</body>

<style>
	body {
		height: 100vh;
		font-family: 'Arial', sans-serif;
		background-color: #000000;
		color: #f5f5f5;
		background-size: cover;
		margin: 0;
		padding: 0;
	}

	.hue {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 20; /* z-index higher than the navbar */

		/* Radial gradient */
		background-image: radial-gradient(
			circle 200px at var(--x) var(--y),
			rgba(128, 0, 128, 0.375),
			transparent
		);
		pointer-events: none; /* Ensures the div doesn't block interactions */
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
	.title {
		text-align: center;
		font-family: 'Press Start 2P', cursive;
		font-size: 2.5rem; /* Adjusted size for better appearance with this font */
		color: #0df2c9; /* Neon cyan color for the title */
		padding-top: 4rem;
		margin-bottom: 2rem;
		text-shadow: 0 0 3px #ff2079, 0 0 6px #ff2079, 0 0 9px #ff2079;
		user-select: none;
	}
</style>
