<script lang="ts">
	import axios from 'axios';
	import snarkdown from 'snarkdown';

	let contactContent: string = '';
	const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';

	async function fetchContactContent() {
		const url = `${GITHUB_RAW_URL}/boraacer/Portfolio-Website/main/Content/about.md`;
		try {
			const response = await axios.get(url);
			contactContent = snarkdown(response.data);
		} catch (error) {
			if (error instanceof Error) {
				console.error(`Error fetching the contact content: ${error.message}`);
			} else {
				console.error('An unknown error occurred:', error);
			}
		}
	}

	fetchContactContent(); // Invoke the function to fetch the content
</script>

<section id="contact" class="slide-in">
	<div class="markdown-content">
		{@html contactContent}
	</div>
</section>

<style>
	section {
		background-color: rgba(0, 0, 0, 0.7);
		border: 2px solid #0df2c9; /* Neon cyan border */
		padding: 2rem;
		margin-bottom: 1rem;
		border-radius: 10px;
	}
</style>
