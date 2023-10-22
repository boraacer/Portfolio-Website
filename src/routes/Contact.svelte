<script lang="ts">
	import axios from 'axios';
	import snarkdown from 'snarkdown';

	let contactContent: string = '';
	const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';

	async function fetchContactContent() {
		const url = `${GITHUB_RAW_URL}/boraacer/Portfolio-Website/main/Content/ContactMe.md`;
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
	<h2>Contact Me</h2>
	{@html contactContent}
	<!-- Render the parsed markdown content -->
</section>

<style>
	section {
		padding: 2rem 0;
	}
</style>
