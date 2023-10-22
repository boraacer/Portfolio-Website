<script lang="ts">
	import { fade } from 'svelte/transition';
	export let project: { content: string } | null = null;
	export let closeModal = () => {};

	import MarkdownIt from 'markdown-it';

	const md = new MarkdownIt();
	$: htmlContent = project ? md.render(project.content) : '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

<div
	class="modal"
	on:click={closeModal}
	transition:fade={{ duration: 100 }}
	role="button"
	tabindex="0"
	aria-label="Close modal"
>
	<div
		class="modal-content"
		on:click={(e) => e.stopPropagation()}
		on:keydown={(event) => {
			if (event.key === 'Escape') {
				closeModal();
			}
		}}
		role="dialog"
		aria-modal="true"
	>
		<button on:click={closeModal} class="close-btn">X</button>
		{#if project}
			<div class="markdown-content">
				{@html htmlContent}
			</div>
		{/if}
	</div>
</div>

<style>
	.markdown-content {
		padding: 5rem;
		padding-top: 2rem;
	}
	@media (max-width: 768px) {
		.markdown-content {
			/* Adjust padding for mobile screens */
			padding: 1rem;
		}
	}
	/* Modal Overlay */
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black for the modal background */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	/* Modal Content Box */
	.modal-content {
		background-color: #1a1a1a; /* Dark shade for the modal content */
		padding: 20px;
		border-radius: 10px;
		max-width: 80%;
		position: relative;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
		width: 75rem; /* Set specific width for the modal */
		max-width: 95%; /* Ensure the modal doesn't overflow on small screens */
		max-height: 90vh; /* Set max height relative to the viewport */
		min-height: 90vh; /* Set min height to be the same as max height */
		overflow-y: auto;
	}
	.modal-content::-webkit-scrollbar {
		width: 10px; /* Width of the scrollbar */
	}

	.modal-content::-webkit-scrollbar-track {
		background: #2a2a2a; /* Color of the scrollbar track */
		border-radius: 20px; /* Increase the border-radius for the track */
	}

	.modal-content::-webkit-scrollbar-thumb {
		background: #4a4a4a; /* Color of the scrollbar thumb (the draggable part) */
		border-radius: 20px; /* Increase the border-radius for the thumb */
	}

	.modal-content::-webkit-scrollbar-thumb:hover {
		background: #646464; /* Slightly brighter color on hover */
	}
	/* Close Button */
	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		color: #e0e0e0; /* Light gray for the close button */
		transition: color 0.2s ease; /* Smooth color transition on hover */
	}

	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: #333; /* Dark background */
		color: #e0e0e0; /* Light gray for the "X" */
		border: none;
		font-size: 20px;
		width: 30px; /* Fixed width and height */
		height: 30px;
		line-height: 28px; /* Center the "X" vertically */
		text-align: center; /* Center the "X" horizontally */
		border-radius: 50%; /* Makes it a circle */
		cursor: pointer;
		transition: background-color 0.3s, transform 0.3s; /* Smooth transitions */
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
	}

	.close-btn:hover {
		background-color: #444; /* Slightly brighter on hover */
		transform: scale(1.1); /* Slight zoom effect on hover */
	}

	.close-btn:focus {
		outline: none; /* Remove browser default focus outline */
		box-shadow: 0 0 0 2px rgba(224, 224, 224, 0.6); /* Custom focus ring */
	}


</style>
