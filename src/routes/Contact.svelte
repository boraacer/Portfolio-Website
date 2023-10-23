<script lang="ts">
	import axios from 'axios';
	import markdownIt from 'markdown-it';
	import { onMount } from 'svelte';
  
	let contactContent: string = '';
	const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';
	const md = markdownIt({
	  html: true // Enable rendering HTML tags
	});
  
	async function fetchContactContent() {
	  const url = `${GITHUB_RAW_URL}/boraacer/Portfolio-Website/main/Content/ContactMe.md`;
	  try {
		const response = await axios.get(url);
		contactContent = md.render(response.data);
	  } catch (error) {
		if (error instanceof Error) {
		  console.error(`Error fetching the contact content: ${error.message}`);
		} else {
		  console.error('An unknown error occurred:', error);
		}
	  }
	}
  
	onMount(async () => {
	  await fetchContactContent();
	});
  </script>
  
  <section class="slide-in">
	<div class="markdown-content">
	  {#if contactContent}
		{@html contactContent}
	  {:else}
		<p>Loading...</p>
	  {/if}
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
  
	.markdown-content p {
	  color: #fff; /* Text color for the content */
	  font-size: 16px; /* Adjust the font size as needed */
	  line-height: 1.4; /* Adjust the line height as needed */
	}
  </style>
  